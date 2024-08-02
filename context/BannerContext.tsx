"use client"
import { createContext, type ReactNode, FC, useState, useContext } from "react";


export interface item {
    id : number,
    img : string,
    title : string,
    desc : string,
    btn : string,
    imgUrl : string,
    clip:string
    color? : string
}
export interface dataInterface {
    data :   item[] ,
    map : ()=>dataInterface,
    find : ()=>void
}

interface contextInterface{
    data : dataInterface | [],
    setData : (newData : dataInterface) =>void
}

export const BannerContext = createContext<contextInterface | undefined>(undefined);

export const useBannerContext  = ()=>{
    return useContext(BannerContext)
} 

type BannerContextProps = {children : ReactNode} 

export const  BannerContextProvider :  FC<BannerContextProps>  = ({children})=>{
    const [data,setData] = useState<dataInterface | [] | any >([]);

    const contextValue : contextInterface = {data,setData};

    return  <BannerContext.Provider value={contextValue}>
         {children}
    </BannerContext.Provider>
}