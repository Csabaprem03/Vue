// Az interfészek típusa az adatbázishoz
export interface User {
  id: number;
  name: string;
  registered_at: Date;
  password: string;
}

export interface Publisher {
  id: number;
  name: string;
  headquarters: string | null;
  is_active: number;
}

export interface Game {
  id: number;
  name: string;
  release_year: number;
  genre: string;
  publisher_id: number;
  platforms: Array<string>; // ugyanazok a string[] tömbök
  cover: string | null;
  freetogame_url: string | null;
  created_at: Date; // lehet string, ha Date – dátumformátum: a dátum és az idő (időzóna)
  updated_at: Date;
}

export interface Favorite {
  user_id: number;
  game_id: number;
}

export interface Collectible {
  id: number;
  game_id: number;
  type: string;
  description: string;
  images: Array<string>;
  map_location: Array<number | null>;
}

export interface FilteredCollectibles {
  nameType: string;
  nameDescription: string;
  order: string;
}

export interface FilteredGames {
  nameGenre: string;
  namePlatform: string;
  title: string;
  order: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
export interface UserName {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export type LinkItem = {
  to: string;
  text: string;
};
export type LinkColumn = {
  title: string;
  links: Array<LinkItem>;
};
