import React from 'react'
import Image from 'next/image'
import logo from "@/public/nlogo.svg";

type Props = {
  judul : string,
  periode : string
}

const HeaderLap = (props: Props) => {
  
  const myLogo = logo.src;
  return (
    <div className='inline-block my-2 w-full'>
      <div className="flex ml-1 items-start justify-start my-auto gap-4">
        <div className="flex items-start">

            <img src={myLogo} width={75} alt='logo'></img> 

                  {/* <Image
            src={myLogo}
            alt="logo"
            width={75}
            height={logos[0].height}
            className='bg-none'
          /> */}

        </div>
        <div className="flex flex-1 items-center justify-center my-auto gap-4">
          <div className="flex flex-col items-center justify-center w-auto h-auto">
            <h6 className='font-bold text-2xl'>PEMERINTAH KOTA KEDIRI</h6>
            <p className='font-semibold text-xl'>DINAS LINGKUNGAN HIDUP, KEBERSIHAN DAN PERTAMANAN</p>
            <p >Jalan Mayor Bismo No. 04 Telp (0354) 682336 Kediri</p>
            <p className='mt-3'>        {props.judul}</p>
            <p className='mb-2'>     {props.periode}</p>
          </div>

        </div>
      </div>
      {/* <div className="flex ml-1 mt-2 items-start justify-center my-auto gap-4">
        {props.judul}
      </div>
      <div className="flex ml-1 mb-2 items-start justify-center my-auto gap-4">
        {props.periode}
      </div> */}

    </div>
  )
}
export default HeaderLap