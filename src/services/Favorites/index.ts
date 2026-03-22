import http from '../api'
import type { Favorite } from '../../types';
import type { APIResponse } from '../types';

async function getFavorites() {
    return await http.get<APIResponse<Favorite[]>>('favorites');
}
async function getFavoritesById(id:number) {
    return await http.get<APIResponse<Favorite[]>>(`favorites/${id}`);
}
async function postFavorite(gameId:number) {
    return await http.post<APIResponse<Favorite[]>>(`favorites/${gameId}`, {});
}
async function deleteFavorite(gameId:number) {
    return await http.delete<APIResponse<Favorite[]>>(`favorites/${gameId}`);
}

export default{
    getFavorites,
    getFavoritesById,
    postFavorite,
    deleteFavorite,
}