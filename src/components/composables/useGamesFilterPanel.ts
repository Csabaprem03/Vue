
import { computed, ref } from "vue";
import type { FilteredGames, Game } from "../../types";

/**
 * @param gamesData
 * @returns
 */


export function useGamesFilterPanel(gamesData:Game[]) {
    const filteredActive=ref<FilteredGames>({
        nameGenre:"__osszes__",
        title:"",
        order:"a-z"
    })

    const allGenre=computed(()=>{
        const set=new Set(gamesData.map((a)=>a.genre));
        return Array.from(set).sort()
    })

    const FilteredGames=computed<Array<Game>>(()=>{
        return gamesData.filter(data=>{
            const genreAppropriate=filteredActive.value.nameGenre=="__osszes__" || data.genre===filteredActive.value.nameGenre
            const titelApproprate=filteredActive.value.title=="" || data.name.toLowerCase().includes(filteredActive.value.title)

            return genreAppropriate && titelApproprate
        })
    })

    const FilteredGamesOrder=computed<Game[]>(()=>{
        return [...FilteredGames.value].sort((a,b)=>{
            switch (filteredActive.value.order) {
                case "a-z":return a.name.localeCompare(b.name);
                case "z-a":return b.name.localeCompare(b.name);
                default: return 0
            }
        })
    })

    function resetGame():void {
        filteredActive.value={
            nameGenre:"__osszes__",
            title:"",
            order:"a-z"
        }
    }

    return{
        filteredActive,
        allGenre,
        FilteredGames,
        FilteredGamesOrder,
        resetGame,
    }
}