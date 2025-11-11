import { act } from 'react-test-renderer';
import { useFavouritesStore } from '../useFavouritesStore';
import { FavouriteRecipe } from '@features/favourites/entities/favourite.model';

const buildRecipe = (overrides?: Partial<FavouriteRecipe>): FavouriteRecipe => ({
  id: 1,
  name: 'Test Recipe',
  image: 'https://example.com/image.jpg',
  tags: ['Test'],
  ...overrides,
});

describe('useFavouritesStore', () => {
  beforeEach(() => {
    act(() => {
      useFavouritesStore.setState({ favourites: [] });
    });
  });

  afterEach(async () => {
    act(() => {
      useFavouritesStore.getState().clearFavourites();
    });

    await useFavouritesStore.persist?.clearStorage?.();
  });

  it('adds a recipe to favourites only once', () => {
    const recipe = buildRecipe();
    const { addFavourite } = useFavouritesStore.getState();

    act(() => {
      addFavourite(recipe);
      addFavourite(recipe);
    });

    expect(useFavouritesStore.getState().favourites).toHaveLength(1);
    expect(useFavouritesStore.getState().favourites[0]).toMatchObject(recipe);
  });

  it('removes recipes and updates favourite flag', () => {
    const recipe = buildRecipe({ id: 42 });
    const { addFavourite, removeFavourite, isFavourite } = useFavouritesStore.getState();

    act(() => {
      addFavourite(recipe);
    });

    expect(isFavourite(recipe.id)).toBe(true);

    act(() => {
      removeFavourite(recipe.id);
    });

    expect(isFavourite(recipe.id)).toBe(false);
    expect(useFavouritesStore.getState().favourites).toHaveLength(0);
  });

  it('clears favourites in bulk', () => {
    const { addFavourite, clearFavourites } = useFavouritesStore.getState();

    act(() => {
      addFavourite(buildRecipe({ id: 1 }));
      addFavourite(buildRecipe({ id: 2 }));
    });

    expect(useFavouritesStore.getState().favourites).toHaveLength(2);

    act(() => {
      clearFavourites();
    });

    expect(useFavouritesStore.getState().favourites).toHaveLength(0);
  });
});
