export type Recipe = {
  id: number;
  name: string;
  image: string;
};

export type RecipesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};