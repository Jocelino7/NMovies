import { create } from "zustand"

type NetWork = {
    retry: boolean,
    showModal:boolean,
    setShowModal:(state:boolean)=>void,
    setRetry: (state: boolean) => void
}
export const netWorkStore = create<NetWork>((set) => ({
    showModal:false,
    retry: false,
    setShowModal:(state:boolean) =>{
        set({showModal:state})
        
    },
    setRetry: (state: boolean) => {
        set({ retry: state })
    }
}))