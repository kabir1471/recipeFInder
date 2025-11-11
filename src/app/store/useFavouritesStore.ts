import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavouriteRecipe } from '@features/favourites/entities/favourite.model';

type FavouritesState = {
  favourites: FavouriteRecipe[];
  addFavourite: (recipe: FavouriteRecipe) => void;
  removeFavourite: (id: number) => void;
  isFavourite: (id: number) => boolean;
  clearFavourites: () => void;
};

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: (recipe) => {
        const existing = get().favourites.find((r) => r.id === recipe.id);
        if (!existing) {
          set({ favourites: [...get().favourites, recipe] });
        }
      },

      removeFavourite: (id) => {
        set({ favourites: get().favourites.filter((r) => r.id !== id) });
      },

      isFavourite: (id) => {
        return get().favourites.some((r) => r.id === id);
      },

      clearFavourites: () => set({ favourites: [] }),
    }),
    {
      name: 'favourites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
