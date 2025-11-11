import { useRestClient } from '@app/hooks/useRestClient';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RecipesResponse } from '../entities/recipe.model';

const DEFAULT_PAGE_SIZE = 10;

export function useRecipesInfiniteQuery(pageSize = DEFAULT_PAGE_SIZE) {
  const { restClient } = useRestClient();

  return useInfiniteQuery({
    queryKey: ['recipes', pageSize],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const { data } = await restClient.get<RecipesResponse>(
        `https://dummyjson.com/recipes?limit=${pageSize}&skip=${pageParam}&select=name,image`
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.recipes.length;
      if (nextSkip >= lastPage.total || lastPage.recipes.length === 0) {
        return undefined;
      }
      return nextSkip;
    },
    staleTime: 1000 * 60 * 5,
  });
}