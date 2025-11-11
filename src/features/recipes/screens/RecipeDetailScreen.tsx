import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavouritesStore } from '@app/store/useFavouritesStore';
import { useRecipeDetail } from '@features/recipes/data/useRecipeApi';
import Icon, { Ionicons } from '@react-native-vector-icons/ionicons';

type RootStackParamList = {
  RecipeDetail: { id: number };
};

type RecipeDetailRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;

const RecipeDetailScreen = () => {
  const navigation = useNavigation();
	const route = useRoute<RecipeDetailRouteProp>();

	const { data, isLoading } = useRecipeDetail(route.params.id);

	const { addFavourite, removeFavourite, isFavourite } = useFavouritesStore();

	const handleFavouriteToggle = () => {
		if (isFavourite(route.params.id)) removeFavourite(route.params.id);
		else
			addFavourite({
				id: data.id,
				name: data.name,
				image: data.image,
				tags: data.tags || [],
			});
	};

	if (isLoading) {
		return (
		<View style={styles.loaderContainer}>
			<ActivityIndicator size="large" />
		</View>
		);
	};

  	if (!data) return null;

	const {
		name,
		image,
		mealType,
		tags,
		servings,
		cookTimeMinutes,
		rating,
		ingredients,
		instructions,
	} = data;

	return (
		<View style={styles.container}>
			<View>
				<Image source={{ uri: image }} style={styles.image} />
				<TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
				<Ionicons name="arrow-back" size={20} color="#4B5563" />
				</TouchableOpacity>
			</View>
			<ScrollView
				style={styles.scrollContainer}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="recipe-detail-scroll"
			>
				<Text style={styles.category}>
					{mealType?.[0]?.toUpperCase()}
				</Text>
				<Text style={styles.title}>{name}</Text>
				<View style={styles.tagsContainer}>
					<View style={styles.tag}>
						<Text style={styles.tagText}>{"[MEALTYPE]"}</Text>
					</View>
					{(mealType ?? []).map((tag: string, index: number) => (
						<View key={index} style={styles.tag}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
					<View style={styles.tagLight}>
						<Text style={styles.tagText}>{"[TAGS]"}</Text>
					</View>
					{(tags ?? []).map((tag: string, index: number) => (
						<View key={index} style={styles.tagLight}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
				</View>
				<View style={styles.infoRow}>
					<InfoCard label="Servings" value={`${servings} people`} />
					<InfoCard label="Cook time" value={`${cookTimeMinutes} min`} />
					<View style={styles.ratingCard}>
						<Text style={styles.infoLabel}>Rating</Text>
						<StarRating rating={rating} />
					</View>
				</View>
				<Text style={styles.sectionTitle}>Ingredients</Text>
				<View style={styles.listContainer}>
				{ingredients.map((item: string, i: number) => (
					<View key={i} style={styles.listItem}>
						<View style={styles.bullet} />
						<Text style={styles.listText}>{item}</Text>
					</View>
				))}
				</View>
				<Text style={styles.sectionTitle}>Instructions</Text>
				<View style={styles.listContainer}>
					{instructions.map((step: string, i: number) => (
						<View key={i} style={styles.instructionItem}>
							<Text style={styles.stepNumber}>{i + 1}.</Text>
							<Text style={styles.instructionText}>{step}</Text>
						</View>
					))}
				</View>
			</ScrollView>
			<TouchableOpacity
				style={styles.favButton}
				onPress={handleFavouriteToggle}
				testID="favourite-toggle"
				accessibilityRole="button"
				accessibilityLabel={
					isFavourite(route.params.id) ? 'Remove recipe from favourites' : 'Add recipe to favourites'
				}
			>
				<Icon name="heart-outline" size={22} color="#000" />
				<Text style={styles.favButtonText}>{isFavourite(route.params.id) ? 'Remove from Favourites' : 'Add to Favourites'}</Text>
			</TouchableOpacity>
		</View>
	);
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
	<View style={styles.infoCard}>
		<Text style={styles.infoLabel}>{label}</Text>
		<Text style={styles.infoValue}>{value}</Text>
	</View>
);

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.starRow}>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Ionicons key={`full-${index}`} name="star" size={16} color="#7ED957" />
      ))}
      {hasHalfStar && <Ionicons name="star-half" size={16} color="#7ED957" />}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Ionicons key={`empty-${index}`} name="star-outline" size={16} color="#C5CCD3" />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fff' },

	image: {
		width: '100%',
		height: 240,
	},

	backButton: {
		position: 'absolute',
		top: 20,
		left: 20,
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#DDFCCF',
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.6,
	},

	loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

	scrollContainer: { flex: 1 },

	scrollContent: { padding: 20, paddingBottom: 100 },

	category: {
		color: '#47B34F',
		fontWeight: '700',
		textTransform: 'uppercase',
		fontSize: 12,
		marginBottom: 4,
	},

	title: {
		fontSize: 24,
		fontWeight: '800',
		color: '#0e0f0d',
		marginBottom: 8,
	},

	tagsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		marginVertical: 8,
	},
	
	tag: {
		backgroundColor: '#80E619',
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},

	tagLight: {
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderWidth:1,
		borderColor: '#80E619'
	},

	tagText: {
		color: '#0e0f0d',
		fontWeight: '600',
		fontSize: 12,
	},

	infoRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 20,
	},

	infoCard: {
		flex: 1,
		backgroundColor: '#F8F8F8',
		paddingVertical: 10,
		marginHorizontal: 4,
		borderRadius: 12,
		alignItems: 'center',
	},
	ratingCard: {
		flex: 1,
		backgroundColor: '#F8F8F8',
		paddingVertical: 10,
		marginHorizontal: 4,
		borderRadius: 12,
		alignItems: 'center',
	},

	infoLabel: { fontSize: 12, color: '#666', marginBottom: 4 },

	infoValue: { fontSize: 14, fontWeight: '700', color: '#000' },

	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: '#0e0f0d',
		marginBottom: 8,
		marginTop: 16,
	},

	listContainer: { gap: 6 },

	listItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },

	bullet: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: '#47B34F',
	},

	listText: { color: '#0e0f0d', flex: 1, fontSize: 14 },

	instructionItem: { flexDirection: 'row', marginBottom: 8, gap: 6 },

	stepNumber: {
		color: '#47B34F',
		fontWeight: '700',
		fontSize: 14,
	},

	instructionText: {
		color: '#0e0f0d',
		flex: 1,
		fontSize: 14,
		lineHeight: 20,
	},

	favButton: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		flexDirection: 'row',
		backgroundColor: '#80E619',
		borderRadius: 12,
		paddingVertical: 14,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},

	favButtonText: {
		color: '#0A0B0A',
		fontWeight: '700',
		fontSize: 16,
	},

	starRow: {
		flexDirection: 'row',
		gap: 2,
		marginTop: 4,
	},
});

export default RecipeDetailScreen;
