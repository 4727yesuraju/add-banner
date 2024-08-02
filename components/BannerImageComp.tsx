import { item } from '@/context/BannerContext'
import React from 'react'
import Image from "next/image";
import { FiEdit } from "react-icons/fi";

function BannerImageComp({ad,setShow} : {ad : item,setShow : (newshow : number)=>void}) {

  return (
    <div className={`basis-[98%] xl:basis-[48%] h-1/2  flex relative ${ad.color ? ad.color : "text-black"}`} style={{background : `url('${ad.img}')`}}>

      <span className="absolute right-5 top-2 cursor-pointer z-30" onClick={()=>setShow(ad.id)}><FiEdit className="cursor-pointer"/></span>
      <div className="basis-1/2 pl-16">
        <div className="flex flex-col h-full items-start justify-around">
            <div className="flex flex-col justify-evenly h-1/2  items-start">
                <h1 className="text-6xl font-bold">{ad.title}</h1>
                <p className="text-xl">{ad.desc}</p>
            </div>
            <button className="bg-black mb-4 px-6 py-3 rounded text-white">{ad.btn}</button>
        </div>
      </div>

        <div className="basis-1/2  relative overflow-hidden">
            <img 
                src={ad.imgUrl} 
                alt="" 
                style={{ clipPath:ad.clip}} 
                className= "w-[380px] h-[380px] bg-contain absolute top-[50%] -left-0 -translate-y-[45%]"
            />

        </div>
    </div>
  )
}

export default BannerImageComp
