export type Recipe = {
  id: number;
  name: string;
  image: string;
  tags: string[];
};

export type RecipesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};