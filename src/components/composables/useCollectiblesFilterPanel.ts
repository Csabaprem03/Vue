import { computed, ref, unref, type Ref } from "vue";
import type { Collectible, FilteredCollectibles } from "../../types";

/**
 * @param CollectiblesData
 * @returns
 */

export function useColectiblesFilterPanel(
  CollectiblesData: Collectible[] | Ref<Collectible[]>,
) {
  const filteredActive = ref<FilteredCollectibles>({
    nameType: "__osszes__",
    nameDescription: "",
    order: "a-z",
  });

  const allType = computed(() => {
    const data = unref(CollectiblesData);
    const set = new Set(data.map((a) => a.type));
    return Array.from(set).sort();
  });

  const FilteredCollectibles = computed<Array<Collectible>>(() => {
    const data = unref(CollectiblesData);
    return data.filter((item) => {
      const typeAppropriate =
        filteredActive.value.nameType == "__osszes__" ||
        item.type === filteredActive.value.nameType;
      const descriptionApproprate =
        filteredActive.value.nameType == "" ||
        item.description
          .toLowerCase()
          .includes(filteredActive.value.nameDescription);

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
