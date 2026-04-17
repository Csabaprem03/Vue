import { computed, ref } from "vue";
import type { Collectible, FilteredCollectibles } from "../../types";

/**
 * @param CollectiblesData
 * @returns
 */

export function useColectiblesFilterPanel(CollectiblesData: Collectible[]) {
  const filteredActive = ref<FilteredCollectibles>({
    nameType: "__osszes__",
    nameDescription: "",
    order: "a-z",
  });

  const allType = computed(() => {
    const set = new Set(CollectiblesData.map((a) => a.type));
    return Array.from(set).sort();
  });

  const FilteredCollectibles = computed<Array<Collectible>>(() => {
    return CollectiblesData.filter((item) => {
      const typeAppropriate =
        filteredActive.value.nameType == "__osszes__" ||
        item.type === filteredActive.value.nameType;
      const searchTitle = filteredActive.value.nameDescription.toLowerCase();
      const descriptionApproprate =
        filteredActive.value.nameDescription == "" ||
        item.description.toLowerCase().includes(searchTitle);

      return typeAppropriate && descriptionApproprate;
    });
  });

  const FilteredCollectiblesOrder = computed<Collectible[]>(() => {
    return [...FilteredCollectibles.value].sort((a, b) => {
      switch (filteredActive.value.order) {
        case "a-z":
          return a.type.localeCompare(b.type);
        case "z-a":
          return b.type.localeCompare(a.type);
        default:
          return 0;
      }
    });
  });

  function applyFiltered(appropriate: FilteredCollectibles): void {
    filteredActive.value = { ...appropriate };
  }

  function resetGame(): void {
    filteredActive.value = {
      nameType: "__osszes__",
      nameDescription: "",
      order: "a-z",
    };
  }

  return {
    filteredActive,
    allType,
    FilteredCollectibles,
    FilteredCollectiblesOrder,
    applyFiltered,
    resetGame,
  };
}
