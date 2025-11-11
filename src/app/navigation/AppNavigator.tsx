import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import RecipeDetailScreen from '@features/recipes/screens/RecipeDetailScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  RecipeDetail: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
	  <Stack.Screen name="MainTabs" component={MainTabs} />
	   <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
	</Stack.Navigator>
  );
};