import { create } from "zustand";
import { Genre, Movie, MovieResult, actor } from "../models/model";
import Repository from "../models/repository/repository";
import { MovieResultFallback } from "../utils/fallback";


interface HomeState {
    textInputValue:string|null,
    isUpComingMoviesLoading: boolean,
    isPopularMovieLoading: boolean,
    isActorInTreandingLoading: boolean,
    isGenresLoading: boolean,
    isNowPlayingLoading: boolean
    upComingMovies: MovieResult,
    popularMovies: MovieResult,
    actorsInTreanding: MovieResult,
    genres: Genre[],
    nowPlaying: MovieResult,
    setGenre: (genres: Genre[]) => void,
    setPopularMovies: (movies: MovieResult,page?:number) => void,
    setUpComingMovie: (movies: MovieResult,page?:number) => void,
    setActorInTrending: (actors: MovieResult) => void,
    setNowPlaying: (movies: MovieResult,page?:number) => void
    handleFetch:  (repository: Repository) => Promise<FetchResult>,
    setFetchResult:(result:FetchResult)=>void,
    onChange:(value:string)=>void,
    cleanInput:()=>void
}
const homeStore = create<HomeState>(
    (set,get) => ({
        isUpComingMoviesLoading: true,
        isPopularMovieLoading: true,
        isActorInTreandingLoading: true,
        isGenresLoading: true,
        isNowPlayingLoading: true,
        upComingMovies: MovieResultFallback,
        popularMovies: MovieResultFallback,
        actorsInTreanding:MovieResultFallback,
        genres: [],
        nowPlaying: MovieResultFallback,
        textInputValue:"",
        setGenre: (genres: Genre[]) => {
            set({ genres: genres, isGenresLoading: false })
        },
        setPopularMovies: (movies: MovieResult) => {
            set({ popularMovies: movies, isPopularMovieLoading: false })
        },
        setUpComingMovie: (movies: MovieResult) => {
            set({ upComingMovies: movies, isUpComingMoviesLoading: false })
        },
        setActorInTrending: (actors: MovieResult) => {
            set({ actorsInTreanding: actors, isActorInTreandingLoading: false })
        },
        setNowPlaying: (movies: MovieResult) => {
            set({ nowPlaying: movies, isNowPlayingLoading: false })
        },
        handleFetch:(repository:Repository)=> handleFetch(repository),
        setFetchResult: (fetchResult:FetchResult)=>{
            get().setUpComingMovie(fetchResult.comingUpMovies)
            get().setGenre(fetchResult.genres)
            get().setActorInTrending(fetchResult.actors)
            get().setPopularMovies(fetchResult.popular)
            get().setNowPlaying(fetchResult.nowPlaying)
        },
        onChange:(value:string)=>{
            set({textInputValue:value})
        },
        cleanInput:()=>{
            set({textInputValue:null})
        }
    })
)
type FetchResult = {
    comingUpMovies: MovieResult,
    genres: Genre[],
    popular: MovieResult,
    actors: MovieResult,
    nowPlaying: MovieResult
}
async function handleFetch(repository: Repository): Promise<FetchResult> {
    const comingUpMovies = await getAllComingUpMovies(repository);
    const genres = await getGenres(repository);
    const popular = await getPopularMovies(repository);
    const actors = await getActorInTrending(repository);
    const nowPlaying = await getMoviesThatArePlayNow(repository)
    return {
        comingUpMovies,
        genres,
        popular,
        actors,
        nowPlaying
    }

};

function getAllComingUpMovies(repository: Repository,page?:number): Promise<MovieResult> {
    return repository.getAllComingUpMovies(page)
}
function getPopularMovies(repository: Repository,page?:number): Promise<MovieResult> {
    return repository.getPopularMovies(page)
}
function getGenres(repository: Repository): Promise<Genre[]> {
    return repository.getGenres()

}
function getActorInTrending(repository: Repository): Promise<MovieResult> {
    return repository.getActorInTrending()
}
function getMoviesThatArePlayNow(repository: Repository,page?:number): Promise<MovieResult> {
    return repository.getMoviesThatArePlayNow()
}

export { handleFetch, homeStore };
export type { HomeState };
