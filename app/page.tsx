"use client"
import BannerImageComp from "@/components/BannerImageComp";
import EditBannerTemplateBs from "@/components/EditBannerTemplateBs";
import useFetchData from "@/components/hooks/useFetchData";
import { item } from "@/context/BannerContext";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Home() {
   const {data} = useFetchData();
   const [show,setShow] = useState<number>(-1);
   const [imgUrl,setImgUrl] = useState<string>("");
  return (
    <div className="flex flex-wrap h-screen p-6 gap-2">
      {
        data ? (
          <>
             {
                 data?.map(( ad : item )=><BannerImageComp key={ad.id} ad={ad} setShow={setShow} />)
             }
          </>
        ) : (
          <p>loading...</p>
        )
      }

      {show !== -1 && <EditBannerTemplateBs show ={show} setShow= {setShow} setImgUrl={setImgUrl} imgUrl={imgUrl}/>}
    </div>
  );
}
