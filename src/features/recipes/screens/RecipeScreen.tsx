import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRecipesInfiniteQuery, useRecipesSearch } from '../data/useRecipeApi';
import PageLayout from '@features/common/components/PageLayout';
import { RecipeCard } from '@features/common/components/RecipeCard';
import { RecipeScreenNavigationProp } from '@appTypes/RecipeScreenNavProps';
import { useNavigation } from '@react-navigation/native';
import ItemSeparatorComponent from '@features/common/components/ItemSeparatorComponent';
import { logo } from '@app/assets/images';
import { SearchRecipeCard } from '../components/SearchRecipeCard';
import Ionicons from '@react-native-vector-icons/ionicons';

const RecipeScreen = () => {
	const navigation = useNavigation<RecipeScreenNavigationProp>();
	
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedQuery, setDebouncedQuery] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 400);
		return () => clearTimeout(timeout);
	}, [searchQuery]);

	const {
		data,
		isLoading,
		refetch,
		isRefetching,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useRecipesInfiniteQuery();

	const {
		data: searchData,
		isFetching: isSearching,
	} = useRecipesSearch(debouncedQuery, debouncedQuery.length > 0);

	const isSearchActive = debouncedQuery.length > 0;

	const handleRefresh = () => {
		if (!isSearchActive) {
			refetch();
		}
	};

	const recipes = useMemo(
		() => data?.pages.flatMap((page) => page.recipes) ?? [],
		[data],
	);

	const searchResults = searchData ?? [];
	const showSearchLoading = isSearchActive && isSearching && searchResults.length === 0;
	const displayedRecipes = isSearchActive ? searchResults : recipes;

	const handleEndReached = () => {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	};

	const handlePress = (id: number) => {
		navigation.navigate('RecipeDetail', { id });
	};

	const renderRecipeItem = ({ item }: { item: typeof displayedRecipes[number] }) => {
		const tag = item.tags?.[0] ?? 'Recipe';
		if (isSearchActive) {
			return (
				<SearchRecipeCard
					testID={`search-recipe-card-${item.id}`}
					title={item.name}
					image={item.image}
					tag={tag}
					onPress={() => handlePress(item.id)}
				/>
			);
		}

		return (
			<RecipeCard
				testID={`recipe-card-${item.id}`}
				title={item.name}
				image={item.image}
				tag={tag}
				onPress={() => handlePress(item.id)}
			/>
		);
	};


	if (isLoading && !isSearchActive) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" testID="recipe-loading-indicator" />
			</View>
		);
	}

	return (
		<PageLayout>
			<Image source={logo} style={styles.logo} />
			<View style={styles.searchInput}>
				<Ionicons name="search" size={18} color="#A3A3A3" />
				<TextInput
					placeholder="Search recipes"
					value={searchQuery}
					onChangeText={setSearchQuery}
					style={styles.searchTextField}
					autoCorrect={false}
					autoCapitalize="none"
					testID="recipe-search-input"
				/>
			</View>

			{isSearchActive && (
				<View style={styles.searchTabs}>
					{['Recipes', 'Cuisine', 'Meal type', 'Tags'].map((tab, index) => (
						<Text
							key={tab}
							style={[styles.searchTabLabel, index === 0 && styles.searchTabLabelActive]}
						>
							{tab}
						</Text>
					))}
				</View>
			)}

			{showSearchLoading && (
				<View style={styles.searchLoader}>
					<ActivityIndicator size="small" />
				</View>
			)}
			{!isSearchActive && (<Text style={styles.sectionTitle}>Popular</Text>)}
			<FlatList
				testID="recipe-list"
				key={isSearchActive ? 'search-list' : 'default-list'}
				data={displayedRecipes}
				keyExtractor={(item) => item.id.toString()}
				showsHorizontalScrollIndicator={false}
				numColumns={isSearchActive ? 1 : 2}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={ItemSeparatorComponent}
				refreshControl={
					!isSearchActive ? (
						<RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
					) : undefined
				}
				onEndReached={isSearchActive ? undefined : handleEndReached}
        		onEndReachedThreshold={isSearchActive ? undefined : 0.5}
				ListFooterComponent={
					!isSearchActive && isFetchingNextPage ? (
						<View style={styles.containerPadding}>
						<ActivityIndicator size="small" />
						</View>
					) : null
					}
				renderItem={renderRecipeItem}
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
	searchInput: {
		flexDirection: 'row',   
		alignItems: 'center',     
		borderRadius: 24,
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		height: 44,   
	},

	searchTextField: {
		flex: 1,
		marginLeft: 8,
		fontSize: 16,
	},

	containerPadding: {
		paddingHorizontal: 16,
	},

	logo: {
		width: '50%',
		resizeMode: 'contain',
		alignSelf: 'center',
	},

	searchTabs: {
		flexDirection: 'row',
		gap: 16,
		paddingHorizontal: 16,
		marginVertical: 12,
	},
	searchTabLabel: {
		color: '#A3A3A3',
		fontWeight: '600',
		fontSize: 13,
	},
	searchTabLabelActive: {
		color: '#141414',
	},

	sectionTitle: {
		fontSize: 24,
		fontWeight: '800',
		marginVertical: 12,
	},

	searchLoader: {
    	paddingVertical: 12,
  	},
});

export default RecipeScreen;
