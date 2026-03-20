// Az interfészek tipusa az adatbázishoz
export interface User {
    id: number,
    name: string,
    registered_at: Date,
    password: string,
}

export interface Publish {
    id: number,
    name: string,
    headquarters: string | null,  
    is_active: boolean,
}

export interface Game {
    id: number,
    name: string,
    release_year: number,
    genre: string,
    publisher_id: number, 
    platforms: Array<string>, // a string[] tömbök ugyanaz
    cover: string | null,
    freetogame_url: string | null,
    created_at: Date, // lehet a string,ha Date a dátum és az idő (időzóna)
    updated_at: Date,
}

export interface Favorite {
    user_id: number,
    game_id: number,
}

export interface Collectible {
    id: number,
    game_id: number,
    type: string,
    description: number,
    images: Array<string>,
    map_location: Array<string>,
}

export interface FilteredGames{
    nameGenre:string,
    title:string,
    order:string
}

export interface LoginCredentials{
    email:string,
    password:string,
}

export interface RegisterData{
    name:string,
    email:string,
    password:string,
}
