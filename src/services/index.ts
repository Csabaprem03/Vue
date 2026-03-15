import gameController from './games'
import collectibleController from './collectibles'
import authController from './Authentications'

export const API = {
    games: gameController,
    collectibles: collectibleController,
    auth:authController,
}