import { createContext } from "react"
import { Movie } from "../models/model"
export interface TAppState {
    currentMovie?: Movie
}

export const AppContext = createContext<TAppState>({})
