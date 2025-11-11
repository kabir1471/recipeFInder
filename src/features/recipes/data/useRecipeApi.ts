import { useRestClient } from '@app/hooks/useRestClient';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { RecipesResponse } from '../entities/recipe.model';
import { Endpoints } from '@app/assets/Endpoint';

const DEFAULT_PAGE_SIZE = 10;

export function useRecipesInfiniteQuery(pageSize = DEFAULT_PAGE_SIZE) {
  const { restClient } = useRestClient();

  return useInfiniteQuery({
    queryKey: ['recipes', pageSize],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const { data } = await restClient.get<RecipesResponse>(
        `${Endpoints.LIST_RECIPES}?limit=${pageSize}&skip=${pageParam}&select=name,image,tags`
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

export function useRecipesSearch(query: string, enabled = true) {
  const { restClient } = useRestClient();

  return useQuery({
    queryKey: ['recipes-search', query],
    queryFn: async () => {
      const { data } = await restClient.get<RecipesResponse>(
        `${Endpoints.SEARCH_RECIPES}?q=${encodeURIComponent(query)}`
      );
      return data.recipes;
    },
    enabled: enabled && query.length > 0,
    staleTime: 1000 * 60 * 5,
  });
}