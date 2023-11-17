import { Movie } from "../models/model"

export type ScreenProps = {
    Home: undefined,
    Detail: Movie,
    Search: {value?:string,genre?:string}
}
