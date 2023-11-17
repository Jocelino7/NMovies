import { create } from "zustand"
import Repository from "../models/repository/repository"
import { MovieResultFallback } from "../utils/fallback"
import { MovieResult } from "../models/model"

type SearchStore = {
    results: MovieResult,
    isResultLoading: boolean,
    genres:MovieResult,
    search: (value: string, repository: Repository) => void,
    getMovieByGenre:(genre:string,repository:Repository)=>void
}
async function search(value: string, repository: Repository): Promise<MovieResult> {
    return repository.searchMovie(value)
}
async function  getMovieByGenre(genre:string,repository:Repository): Promise<MovieResult> {
    return repository.getMovieByGenre(genre)
}
const searchStore = create<SearchStore>((set) =>
({
    results: MovieResultFallback,
    isResultLoading: true,
    genres:MovieResultFallback,
    search: async (value: string, repository: Repository) => {
        set({ isResultLoading: true })
        const results = await search(value, repository)
        set({
            results: results,
            isResultLoading: false
        })
    },
    getMovieByGenre:async(genre:string,repository:Repository)=>{
        set({isResultLoading:true})
        const results = await getMovieByGenre(genre,repository)
        set({results:results,isResultLoading:false})
    }
}),

)
export {searchStore}

