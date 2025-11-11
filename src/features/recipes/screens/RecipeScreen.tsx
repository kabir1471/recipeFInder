import React from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useRecipesInfiniteQuery } from '../data/useRecipeApi';
import PageLayout from '@features/common/components/PageLayout';
import { RecipeCard } from '@features/common/components/RecipeCard';
import { RecipeScreenNavigationProp } from '@appTypes/RecipeScreenNavProps';
import { useNavigation } from '@react-navigation/native';
import ItemSeparatorComponent from '@features/common/components/ItemSeparatorComponent';
import { logo } from '@app/assets/images';

const RecipeScreen = () => {
	const navigation = useNavigation<RecipeScreenNavigationProp>();
	const {
		data,
		isLoading,
		refetch,
		isRefetching,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useRecipesInfiniteQuery();

	const handleRefresh = () => refetch();

	const recipes = data?.pages.flatMap((page) => page.recipes) ?? [];

	const handleEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	const handlePress = (id: number) => {
		navigation.navigate('RecipeDetail', { id });
	};

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" testID="recipe-loading-indicator" />
			</View>
		);
	}

	return (
		<PageLayout>
			<Image source={logo} style={styles.logo} />
			<Text style={styles.sectionTitle}>Popular</Text>
			<FlatList
				testID="recipe-list"
				data={recipes}
				keyExtractor={(item) => item.id.toString()}
				showsHorizontalScrollIndicator={false}
				numColumns={2}
				ItemSeparatorComponent={ItemSeparatorComponent}
				refreshControl={
					<RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
				}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
				isFetchingNextPage ? (
					<View style={styles.containerPadding}>
						<ActivityIndicator size="small" />
					</View>
				) : null
				}
				renderItem={({ item }) => (
					<RecipeCard
						testID={`recipe-card-${item.id}`}
						title={item.name}
						image={item.image}
						tag="Recipe"
						isFavourite={false}
						onPress={() => handlePress(item.id)}
					/>
				)}
			/>
		</PageLayout>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	containerPadding: {
		paddingHorizontal: 16,
	},
	logo: {
		width: '50%',
		resizeMode: 'contain',
		alignSelf: 'center',
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '800',
		marginBottom: 12,
	}
});

export default RecipeScreen;
