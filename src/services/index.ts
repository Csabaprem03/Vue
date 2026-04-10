import gameController from "./games";
import collectibleController from "./collectibles";
import authController from "./Authentications";
import favoriteController from "./Favorites";
import publisherCoontroller from "./Publishers";

// kontroller a backendhez
export const API = {
  games: gameController,
  collectibles: collectibleController,
  auth: authController,
  favorite: favoriteController,
  publishers: publisherCoontroller,
};
