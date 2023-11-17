import { ReactNode, useState } from "react"
import { AppContext } from "./context"
import { Movie } from "../models/model"

type AppStateProp = {
    children:ReactNode
}
export const AppState = ({children}:AppStateProp)=>{
    return(
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}