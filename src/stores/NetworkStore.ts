import { create } from "zustand"

type NetWork = {
    connected:boolean,
    retry:boolean,
    setConnection:(state:boolean)=>void,
    setRetry:(state:boolean)=>void
}
export const netWorkStore = create<NetWork>((set)=>({
    connected:true,
    retry:false,
    setConnection:(state:boolean)=>{
        set({connected:state})

    },
    setRetry:(state:boolean)=>{
        set({retry:state})
    }
}))