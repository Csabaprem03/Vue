import http from "../api";
import type { Collectible } from "../../types";
import type { APIResponse } from "../types";

// az útvonalak és a crud-ok

async function getColectibles() {
  return await http.get<APIResponse<Collectible[]>>("collectibles");
}

async function getCollectibleById(id: number) {
  return await http.get<APIResponse<Collectible[]>>(`collectibles/${id}`);
}

async function postCollectible(collectible: Omit<Collectible, "id">) {
  return await http.post<APIResponse<Collectible[]>>(
    "collectibles",
    collectible,
  );
}
async function patchCollectible(id: number, collectible: Partial<Collectible>) {
  return await http.patch<APIResponse<Collectible[]>>(
    `collectibles/${id}`,
    collectible,
  );
}
async function deleteCollectible(id: number) {
  return await http.delete<APIResponse<Collectible[]>>(`collectibles/${id}`);
}

export default {
  getColectibles,
  getCollectibleById,
  postCollectible,
  patchCollectible,
  deleteCollectible,
};
