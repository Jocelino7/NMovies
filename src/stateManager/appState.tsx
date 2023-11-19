import { ReactNode } from "react"
import { AppContext } from "./context"

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