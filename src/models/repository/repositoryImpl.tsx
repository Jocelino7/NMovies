import { apiKey, baseUrl } from "../../constants/contants";
import { InMemoryCache } from "../../inMemoryCache/inMemoryCache";
import { StringProvider } from "../../utils/language";
import {  Genre, Casting, Video, MovieDetail, MovieResult } from "../model";
import Repository from "./repository";
enum  DataEnum{
    data,cast,genres,results,Video
}
class RepositoryImpl implements Repository {
    private appString: StringProvider;
    private cache = InMemoryCache.getInstance()

    constructor() {
        this.appString = new StringProvider();
    }
    private async fetchMovies<T>(endpoint: string, property:DataEnum=DataEnum.results): Promise<T> {
        const url = `${baseUrl}${endpoint}`
        if(this.cache.get(url)){
            return this.cache.get(url)
        }
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            const errorMessage = `Failed to fetch data from ${endpoint}. Status: ${response.status}, message:${response.statusText}`;
            console.log(errorMessage)
            return [] as T
        }
        const data = await response.json();
        let result
        switch(property){
            case DataEnum.data: {
                result = data
                break
            }
            case DataEnum.cast: {
                result = data.cast
                break
            }
            case DataEnum.genres: {
                result = data.genres
                break
            }
            case DataEnum.Video: {
                result = data.results
             
                break
            }
            default : {
               
                result = data
            }
        }
        if (!data || !result) {
            const errorMessage = (`Invalid data structure for endpoint ${endpoint}`);
            console.log(errorMessage)
            console.log(`statusCode:${response.status}`)
        } else {
            this.cache.set(url,result)
        }
        return result;
    }

    getRelated(id: number,page:number=1): Promise<MovieResult> {
       return this.fetchMovies( `movie/${id}/recommendations?api_key=${apiKey}&language=${this.appString.getAppLanguage()}&page=${page}`)
    }
    async getMovie(id: number): Promise<MovieDetail> {
        const endPoint = `movie/${id}?api_key=${apiKey}&language=${this.appString.getAppLanguage()}`
        return this.fetchMovies(endPoint,DataEnum.data)
    }
    async getMovieByGenre(genre: string): Promise<MovieResult> {
        return this.fetchMovies(`discover/movie?api_key=${apiKey}&with_genres=${genre}&language=${this.appString.getAppLanguage()}`);
    }
    async searchMovie(movie: string,page:number=1): Promise<MovieResult> {
        return this.fetchMovies(`search/movie?api_key=${apiKey}&query=${movie}&language=${this.appString.getAppLanguage()}&page=${page}`);
    
    }
    async getVideo(id:number):Promise<Video[]> {
        return this.fetchMovies(`movie/${id}/videos?api_key=${apiKey}&language=${this.appString.getAppLanguage()}}`,DataEnum.Video);
    }
    async getMovieCasting(id: number): Promise<Casting[]> {
        const endpoint = `movie/${id}/credits?api_key=${apiKey}&language=${this.appString.getAppLanguage()}`
        return this.fetchMovies(endpoint,DataEnum.cast)
        
    }

    async getMoviesThatArePlayNow(page:number=1): Promise<MovieResult> {
        return  this.fetchMovies(`movie/upcoming?api_key=${apiKey}&language=${this.appString.getAppLanguage()}&page${page}`);
    }

    async getAllComingUpMovies(page:number=1): Promise<MovieResult> {
        return this.fetchMovies(`movie/upcoming?api_key=${apiKey}&language=${this.appString.getAppLanguage()}&page=${page}`);
    }

    async getPopularMovies(page:number=1): Promise<MovieResult> {
        return this.fetchMovies(`movie/popular?api_key=${apiKey}&language=${this.appString.getAppLanguage()}&page=${page}`);
    }

    async getGenres(): Promise<Genre[]> {
        const endPoint = `genre/movie/list?api_key=${apiKey}&language=${this.appString.getAppLanguage()}`
        return this.fetchMovies(endPoint,DataEnum.genres)
    }

    async getActorInTrending(): Promise<MovieResult> {
        return this.fetchMovies(`trending/person/week?api_key=${apiKey}&language=${this.appString.getAppLanguage()}`);
    }
}

export {RepositoryImpl}