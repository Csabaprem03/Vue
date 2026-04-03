import { computed, ref, unref, type Ref } from "vue";
import type { FilteredGames, Game } from "../../types";

/**
 * @param gamesData
 * @returns
 */

export function useGamesFilterPanel(gamesData: Game[] | Ref<Game[]>) {
  const filteredActive = ref<FilteredGames>({
    nameGenre: "__osszes__",
    namePlatform: "__osszes__",
    title: "",
    order: "a-z",
  });

  const allGenre = computed(() => {
    const data = unref(gamesData);
    const set = new Set(data.map((a) => a.genre));
    return Array.from(set).sort();
  });

  const allplatform = computed(() => {
    const data = unref(gamesData);
    const set = new Set(data.flatMap((a) => a.platforms));
    return Array.from(set).sort();
  });

  const FilteredGames = computed<Array<Game>>(() => {
    const data = unref(gamesData);
    return data.filter((item) => {
      const genreAppropriate =
        filteredActive.value.nameGenre == "__osszes__" ||
        item.genre === filteredActive.value.nameGenre;
      const platformAppropiate =
        filteredActive.value.namePlatform == "__osszes__" ||
        item.platforms.includes(filteredActive.value.namePlatform);
      const titleApproprate =
        filteredActive.value.title == "" ||
        item.name.toLowerCase().includes(filteredActive.value.title);

      return genreAppropriate && titleApproprate && platformAppropiate;
    });
  });

  const FilteredGamesOrder = computed<Game[]>(() => {
    return [...FilteredGames.value].sort((a, b) => {
      switch (filteredActive.value.order) {
        case "a-z":
          return a.name.localeCompare(b.name);
        case "z-a":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  });

  function applyFiltered(appropriate: FilteredGames): void {
    filteredActive.value = { ...appropriate };
  }

  function resetGame(): void {
    filteredActive.value = {
      nameGenre: "__osszes__",
      namePlatform: "__osszes__",
      title: "",
      order: "a-z",
    };
  }

  return {
    filteredActive,
    allGenre,
    allplatform,
    FilteredGames,
    FilteredGamesOrder,
    applyFiltered,
    resetGame,
  };
}
