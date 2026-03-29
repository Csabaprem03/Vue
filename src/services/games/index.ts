import http from '../api'
import type {  Game } from '../../types';
import type { APIResponse } from '../types';


async function getGames() {
    return await http.get<APIResponse<Game[]>>("games");
}

async function getGameById(id:number) {
    return await http.get<APIResponse<Game[]>>(`games/${id}`);
}

async function postGame(game:Omit<Game,'id'>) {
    return await http.post<APIResponse<Game[]>>('games',game);
}

export default{
    getGames,
    getGameById,
    postGame,
}