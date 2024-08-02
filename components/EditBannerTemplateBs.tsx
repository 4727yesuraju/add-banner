import React, { ChangeEventHandler, useRef, useState } from 'react'
import { RxCross2 } from "react-icons/rx";;
import { FaCloudUploadAlt } from "react-icons/fa";
import { dataInterface, item, useBannerContext } from '@/context/BannerContext';
interface inputInterface {
    title : string,
    desc : string,
    imgUrl : string,
    btn ? :string,
}

interface EditBannerTemplateBsProps {
  show : number,
  setShow : (newShow : number)=>void,
  setImgUrl : (newImgUrl : string) =>void,
  imgUrl:string,
}


function EditBannerTemplateBs({show,setShow,setImgUrl,imgUrl} : EditBannerTemplateBsProps) {

  const context = useBannerContext();

  if(!context) {
      throw new Error("MyCompoment must be used with in a MyContextProvider");
  }

  const {data,setData} = context;

  const currItem : any  =  data.find((i : item) =>i.id==show);

  

  const [inputs,setInputs] = useState<inputInterface>({
    title :currItem.title,
    desc : currItem.desc,
    imgUrl : currItem.imgUrl,
    btn : currItem.btn
  })

  const fileRef = useRef<HTMLInputElement>(null);

 
  const handleChange  = (e : any)=>setInputs({...inputs, imgUrl : URL.createObjectURL(e?.target?.files[0])});

  const handleSubmit = (e:any)=>{
    e.preventDefault();
    let newData : any | []  = data.map((d : item)=>{
      if(d.id == show) return {...currItem,...inputs};
      return d;
    })

    setData(newData);
    localStorage.setItem("data",JSON.stringify(newData));

    setShow(-1);
    setImgUrl("");

  }
  
  return (
    <div className="z-50 fixed w-3/4 h-3/4 left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-gray-400">
      <RxCross2 className="absolute right-2 top-2 cursor-pointer size-6 z-50 " onClick={()=>setShow(-1)}/>
        <form action="" className="w-3/4 mx-auto h-full gap-3 flex flex-col  items-center text-black  p-4">
          <input type="file" name="" id="" hidden={true} ref={fileRef} onChange={handleChange}/>
          <div className="w-1/3 ">
          {inputs.imgUrl && <img src={inputs.imgUrl} className="rounded-md shadow-lg bg-cover w-full" />}
          </div>
          <div className="flex overflow-scroll scroll w-1/2 gap-2 ">
              <FaCloudUploadAlt className=" flex-shrink-0 size-24 rounded-full cursor-pointer" onClick={()=>fileRef.current!.click()}/>
              { [1,2,3,4,5,6,7,8,9,10].map(i=><img src={`/img${i}.jpeg`} className=" flex-shrink-0 size-24 rounded-full" key={i} onClick={e=>setInputs({...inputs, imgUrl : `/img${i}.jpeg`})}></img>)}
          </div>
          <input type="text" placeholder="enter title" value={inputs.title}  onChange={e=>setInputs({...inputs,title : e.target.value})} className="w-1/2 focus:outline-none outline-none  focus:border-b-2 border-gray-500"/>
          <input type="text" placeholder="enter description" value={inputs.desc}  onChange={e=>setInputs({...inputs,desc : e.target.value})} className="w-1/2 focus:outline-none outline-none  focus:border-b-2 border-gray-500"/>
          <input type="text" placeholder="enter button content" value={inputs.btn}  onChange={e=>setInputs({...inputs,btn : e.target.value})} className="w-1/2 focus:outline-none outline-none  focus:border-b-2 border-gray-500"/>
          <button onClick={handleSubmit} className="px-6 py-3 rounded-lg bg-black text-[aqua] w-1/2">submit</button>
        </form>
    </div>
  )
}

export default EditBannerTemplateBs
