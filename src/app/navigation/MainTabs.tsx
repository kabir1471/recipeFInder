import React from 'react';
import { createBottomTabNavigator, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Ionicons from '@react-native-vector-icons/ionicons';
import { TouchableOpacity } from 'react-native';
import FavouritesScreen from '@features/favourites/screens/FavouritesScreen';
import RecipeScreen from '@features/recipes/screens/RecipeScreen';

export type MainTabParamList = {
  Recipes: undefined;
  Favourites: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabButton =
  (testID: string) =>
	({ children, ...rest }: BottomTabBarButtonProps) => {
		const filteredRest = Object.fromEntries(
		Object.entries(rest).filter(([_, value]) => value !== null)
		);
		return (
		<TouchableOpacity {...filteredRest} testID={testID}>
			{children}
		</TouchableOpacity>
		);
	};
const RecipesTabIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialDesignIcons name="home" color={color} size={size} />
);

const FavouritesTabIcon = ({ color, size }: { color: string; size: number }) => (
  <Ionicons name="heart" color={color} size={size} />
);

export const MainTabs = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#64B313',
        tabBarStyle: { backgroundColor: '#efefef', borderTopWidth: 0, borderTopColor: '#efefef', elevation: 4 },
      }}
    >
      <Tab.Screen
        name="Recipes"
        component={RecipeScreen}
        options={{
          tabBarLabel: 'Recipes',
          tabBarIcon: RecipesTabIcon,
          tabBarButton: renderTabButton('tab-recipes'),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: FavouritesTabIcon,
          tabBarButton: renderTabButton('tab-favourites'),
        }}
      />
    </Tab.Navigator>
  );
};