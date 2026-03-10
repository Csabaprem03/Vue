import http from '../api'
import type { Collectible } from '../../types';
import type { APIResponse } from '../types';


async function getColectibles() {
    return await http.get<APIResponse<Collectible[]>>("collectibles");
}

async function getCollectibleById(id:number) {
    return await http.get<APIResponse<Collectible[]>>(`collectibles/${id}`);
}

export default{
    getColectibles,
    getCollectibleById,
}