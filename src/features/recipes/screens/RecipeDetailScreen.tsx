import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from 'react-native';

type RootStackParamList = {
  RecipeDetail: { id: number };
};

type RecipeDetailRouteProp = RouteProp<RootStackParamList, 'RecipeDetail'>;

const RecipeDetailScreen = () => {
	const route = useRoute<RecipeDetailRouteProp>();
	return (
		<div>
			<Text>Recipe detail screen {route.params.id}</Text>
		</div>
	);
};

export default RecipeDetailScreen;
