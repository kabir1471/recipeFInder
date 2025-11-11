import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import RecipeScreen from '../RecipeScreen';
import { useRecipesInfiniteQuery, useRecipesSearch } from '@features/recipes/data/useRecipeApi';

jest.mock('@features/recipes/data/useRecipeApi');

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@app/store/useFavouritesStore', () => ({
  useFavouritesStore: () => ({
    isFavourite: jest.fn().mockReturnValue(false),
    addFavourite: jest.fn(),
    removeFavourite: jest.fn(),
  }),
}));

const mockUseRecipesInfiniteQuery = useRecipesInfiniteQuery as jest.Mock;
const mockUseRecipesSearch = useRecipesSearch as jest.Mock;

const baseQueryResult = {
  refetch: jest.fn(),
  isRefetching: false,
  fetchNextPage: jest.fn(),
  isFetchingNextPage: false,
  hasNextPage: true,
};

describe('RecipeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRecipesSearch.mockReturnValue({
      data: [],
      isFetching: false,
    });
  });

  it('shows a loading indicator while fetching recipes', () => {
    mockUseRecipesInfiniteQuery.mockReturnValue({
      ...baseQueryResult,
      data: undefined,
      isLoading: true,
    });

    const { getByTestId } = render(<RecipeScreen />);

    expect(getByTestId('recipe-loading-indicator')).toBeTruthy();
  });

  it('renders recipes and navigates to details on press', () => {
    mockUseRecipesInfiniteQuery.mockReturnValue({
      ...baseQueryResult,
      data: {
        pages: [
          {
            recipes: [
              { id: 1, name: 'Pasta', image: 'https://example.com/pasta.jpg' },
              { id: 2, name: 'Soup', image: 'https://example.com/soup.jpg' },
            ],
          },
        ],
      },
      isLoading: false,
    });

    const { getByTestId } = render(<RecipeScreen />);

    const firstCard = getByTestId('recipe-card-1');
    expect(firstCard).toBeTruthy();

    fireEvent.press(firstCard);

    expect(mockNavigate).toHaveBeenCalledWith('RecipeDetail', { id: 1 });
  });
});
