import { RootStackParamList } from "@app/navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RecipeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RecipeDetail'
>;