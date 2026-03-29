import http from '../api'
import type { Collectible } from '../../types';
import type { APIResponse } from '../types';


async function getColectibles() {
    return await http.get<APIResponse<Collectible[]>>("collectibles");
}

async function getCollectibleById(id:number) {
    return await http.get<APIResponse<Collectible[]>>(`collectibles/${id}`);
}
async function postCollectible(collectible:Omit<Collectible,'id'>) {
    return await http.post<APIResponse<Collectible[]>>('collectibles',collectible);
}

export default{
    getColectibles,
    getCollectibleById,
    postCollectible,
}