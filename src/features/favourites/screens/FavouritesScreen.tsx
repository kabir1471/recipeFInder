import { useFavouritesStore } from '@app/store/useFavouritesStore';
import PageLayout from '@features/common/components/PageLayout';
import { SearchRecipeCard } from '@features/common/components/SearchRecipeCard';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const FavouritesScreen = () => {
	const { favourites } = useFavouritesStore();

	if (favourites.length === 0) {
		return (
			<View
				style={styles.emptyFavouritesContainer}
				testID="favourites-empty-state"
			>
				<Text>No favourites yet!</Text>
			</View>
		);
	}

	return (
		<PageLayout>
			<Text style={styles.sectionTitle}>My Favourites</Text>
			<FlatList
				testID="favourites-list"
				data={favourites}
				keyExtractor={(item) => item.id.toString()}
				numColumns={2}
				columnWrapperStyle={styles.columnWrapper}
				contentContainerStyle={styles.paddingContainer}
				renderItem={({ item }) => (
					<SearchRecipeCard
						title={item.name}
						image={item.image}
						tag="Favourite"
						testID={`favourite-card-${item.id}`}
					/>
				)}
			/>
		</PageLayout>
	);
};

const styles = StyleSheet.create({
	emptyFavouritesContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	sectionTitle: {
		fontSize: 24,
		fontWeight: '800',
		marginVertical: 12,
	},

	columnWrapper: {
		justifyContent: 'space-between',
		marginBottom: 16,
	},

	paddingContainer: { padding: 16 }
});

export default FavouritesScreen;
