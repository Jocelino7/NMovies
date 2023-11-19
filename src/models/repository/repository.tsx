import { Casting, Genre, MovieDetail, MovieResult, Video } from "../model";

interface Repository {
    getAllComingUpMovies(page?:number):Promise<MovieResult>
    getPopularMovies(page?:number):Promise<MovieResult>
    getGenres():Promise<Genre[]>
    getActorInTrending():Promise<MovieResult>
    getMoviesThatArePlayNow(page?:number):Promise<MovieResult>
    getMovieByGenre(genre:string):Promise<MovieResult>
    searchMovie(movie:string,page?:number):Promise<MovieResult>
    getVideo(id:number):Promise<Video[]>
    getMovieCasting(id:number):Promise<Casting[]>
    getMovie(id:number):Promise<MovieDetail>
    getRelated(id:number,page?:number):Promise<MovieResult>
}
export default Repository