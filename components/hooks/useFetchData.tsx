
import { dataInterface, useBannerContext } from '@/context/BannerContext';
import React, { use, useContext, useEffect } from 'react'

function useFetchData() {
    const context = useBannerContext();

    if(!context) {
        throw new Error("MyCompoment must be used with in a MyContextProvider");
    }

    const {data,setData} = context;
    useEffect(()=>{
        async function fetchDataFromJson(){
          try {
            if(localStorage.getItem('data') !== null ){
                const obj : dataInterface = JSON.parse( localStorage.getItem('data') || "" );
               return setData(obj)
            }
            console.log("fetch");
            const response = await fetch('data.json');
            const result = await response.json();
            localStorage.setItem("data",JSON.stringify(result.data));
            setData(result.data);
          } catch (error) {
            console.log(error)
          }
        }
  
        fetchDataFromJson();
    },[])

  return {data}
}

export default useFetchData
