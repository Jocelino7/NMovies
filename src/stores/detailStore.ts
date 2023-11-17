import { create } from "zustand";
import { Casting, Movie, MovieDetail, MovieResult, Video } from "../models/model";
import Repository from "../models/repository/repository";
import { RepositoryImpl } from "../models/repository/repositoryImpl";
import { MovieResultFallback } from "../utils/fallback";
const repository = new RepositoryImpl()

type DetailStore = {
    getMovie: (id: number) => void,
    getRelated: (movieId: number) => void,
    getCastings: (movieId: number) => void
    getMovieVideo: (movieId: number) => void,
    relatedMovie: MovieResult,
    movieDetail: MovieDetail | null,
    casting: Casting[] | null,
    isCastingLoading:boolean,
    isRelateLoading:boolean,
    isMovieLoading:boolean,
    video: Video[],
    isVideoLoading:boolean
}
async function getMovie(movieId: number, repository: Repository): Promise<MovieDetail> {
    return await repository.getMovie(movieId)
}
async function getRelated(movieId: number, repository: Repository): Promise<MovieResult> {
    return await repository.getRelated(movieId)
}
async function getMovieVideo(movieId: number, repository: Repository): Promise<Video[]> {
    return await repository.getVideo(movieId)
}
async function getCastings(movieId: number, repository: Repository): Promise<Casting[]> {
    return await repository.getMovieCasting(movieId)
}

export const detailStore = create<DetailStore>((set, get) => ({
    getMovie: async (movieId: number) => {
        set({ isMovieLoading:true })
        const movie = await getMovie(movieId, repository)
        set({ movieDetail: movie,isMovieLoading:false })
    },
    getRelated: async (movieId: number) => {
        set({ isRelateLoading:true })
        const movie = await getRelated(movieId, repository)
        set({ relatedMovie: movie, isRelateLoading:false })
    },
    getCastings: async (movieId: number) => {
        set({ isCastingLoading:true })
        const casting = await getCastings(movieId, repository)
        set({ casting: casting,isCastingLoading:false })
    },

    getMovieVideo: async (movieId: number) => {
        set({ isVideoLoading:true })
        const video = await getMovieVideo(movieId, repository)
        set({ video,isVideoLoading:false })
    },
    relatedMovie: MovieResultFallback,
    movieDetail: null,
    casting: [],
    video: [],
    isCastingLoading:true,
    isRelateLoading:true,
    isMovieLoading:true,
    isVideoLoading:true
}))