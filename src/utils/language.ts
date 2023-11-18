import { getLocales } from "react-native-localize";

type AppStrings = {
    comingUpMovies: string;
    presentigNow: string;
    searchHere: string,
    actors: string,
    weeklyActors: string,
    popular: string,
    overview: string,
    castsAndProduction: string,
    related: string,
    playingNow: string,
    noResult: string,
    emptyValue:string,
    no_video_available:string,
    noInternetConnection:string,
    retry:string
}

const en:AppStrings ={
    comingUpMovies: "Coming Soon",
    presentigNow: "Playing Now",
    searchHere: "Search Here",
    actors: "Actors",
    weeklyActors: "Weekly Actors",
    popular: "Populars",
    overview: "Overview",
    castsAndProduction: "Casts And Production",
    related: "Related Movies",
    playingNow: "Playing Now",
    noResult: "No Result",
    emptyValue:"Please Type Something",
    no_video_available:"No video Available",
    noInternetConnection:"Slow connection or no internet Connection",
    retry:"Retry"

}
const pt: AppStrings = {
    comingUpMovies: "Brevemente",
    presentigNow: "Apresentando Agora",
    searchHere: "Pesquise Aqui",
    actors: "Atores",
    weeklyActors: "Atores da semana",
    popular: "Populares",
    overview: "Sinopse",
    castsAndProduction: "Elencos e Produção",
    related: "Filmes Relacionados",
    playingNow: "Apresentando agora",
    noResult: "Sem Resultado",
    emptyValue:"Por-favor digite algo para pesquisar",
    no_video_available:"Vídeo indisponível",
    noInternetConnection:"Fraca connexão ou sem connexão a internet",
    retry:"Tentar Novamente"
}

class StringProvider {
     locale = getLocales()[0].languageCode  
    
    getAppStrings(): AppStrings {
        const language = this.locale=="pt"?pt:en
        return language
    }
    getAppLanguage(): string {
        return this.locale
    }
}
export { StringProvider }