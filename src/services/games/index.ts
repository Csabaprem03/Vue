import http from '../api'
import type {  Game } from '../../types';
import type { APIResponse } from '../types';


async function getGames() {
    return await http.get<APIResponse<Game[]>>("games");
}

async function getGameById(id:number) {
    return await http.get<APIResponse<Game[]>>(`games/${id}`);
}

export default{
    getGames,
    getGameById,
}