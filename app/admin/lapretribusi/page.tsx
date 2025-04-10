'use client';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import {  useSearchParams } from 'next/navigation'
// import { onGetLap } from '@/services/api';
import useSWR from 'swr'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// const fetcher = onGetNeraca('/neraca',);
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from '@/lib/utils';
import HeaderLap from '@/components/header-lap';
import { useReactToPrint } from "react-to-print";
import styles from './styles.module.css'
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/useFetch';
// import FooterLap from '@/components/footer-lap';
// import defaultDataTtd from '@/lib/default-value-type';
// import { DownloadTableExcel,useDownloadExcel } from 'react-export-table-to-excel';
// import ExcelExport from '@/lib/ExcelExport';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


export default function Page() {
  // const { data: UserData, isLoading: UserLoading, isError: UserError, mutate: UserMutate } = useFetch('/api/lapcapel')
  const componentRef = useRef<HTMLDivElement>(null)

	const reactToPrintFn = useReactToPrint({ contentRef : componentRef });

	// if (UserError) return (
	// 	<div className="flex flex-col gap-5 justify-center content-center p-5">
	// 		<Card className="w-full">
	// 			<CardHeader>
	// 				<CardTitle>Pengaduan</CardTitle>
	// 				<CardDescription>Pengaduan</CardDescription>
	// 			</CardHeader>
	// 			<CardContent>
	// 					<Alert variant="destructive" className="mb-5">
	// 						<AlertCircle className="h-4 w-4" />
	// 						<AlertTitle>Error Fetching Data</AlertTitle>
	// 						<AlertDescription>{UserError}</AlertDescription>
	// 					</Alert>
	// 			</CardContent>
	// 			<CardFooter></CardFooter>
	// 		</Card>
	// 	</div>
	// );
	// if (UserLoading) return (
	// 	<div className="flex flex-col gap-5 justify-center content-center p-5">
	// 	<Card className="w-full">
	// 		<CardHeader>

	// 		</CardHeader>
	// 		<CardContent>

	// 			<Skeleton className="flex w-full m-1 h-[20px] rounded-full" />
	// 			<Skeleton className="flex w-full m-1 h-[20px] rounded-full" />
	// 			<Skeleton className="flex w-full m-1 h-[20px] rounded-full" />
	// 		</CardContent>
	// 		<CardFooter></CardFooter>
	// 	</Card>
	// 	</div>
	// )
	// if (!UserData.success) return (
	// 	<div className="flex flex-col gap-5 justify-center content-center p-5">
	// 		<Card className="w-full">
	// 			<CardHeader>
	// 				<CardTitle>Calon Pungutan Retribusi</CardTitle>
	// 				<CardDescription>Daftar Calon Pelanggan</CardDescription>
	// 			</CardHeader>
	// 			<CardContent>
	// 					<Alert variant="destructive" className="mb-5">
	// 						<AlertCircle className="h-4 w-4" />
	// 						<AlertTitle>Error Fetching Data</AlertTitle>
	// 						<AlertDescription>{UserData.message}</AlertDescription>
	// 					</Alert>
	// 			</CardContent>
	// 			<CardFooter></CardFooter>
	// 		</Card>
	// 	</div>
	// );



  return (
    <>
		
    <div className='w-[210mm] mx-auto border-2 shadow-lg'>
      <div className='flex justify-end'>
				<div className='my-2 w-[210mm] flex justify-end'>
						<Button className='mx-[20px] ' onClick={() => reactToPrintFn()}>Print Laporan</Button>
				</div>
        {/* <ReactToPrint
				          trigger={()=>{ return (
          
							
										) 
									}}
									content={()=> componentRef.current }
				/> */}

      </div>




      <div ref={componentRef} className={`${styles.basereport} overflow-auto `}>

        {/* <Image
              src={logos[0].src}
              alt="logo"
              width={75}
              height={logos[0].height}
            /> */}
        <HeaderLap periode={""} judul='Laporan Penerimaan Retribusi'/>

        <Table className='table'>
          <TableHeader>
            <TableRow  className="">
              <TableHead className="w-[10px] border border-black p-1 h-6 font-bold text-xs  text-black dark:text-gray-100 " >No.</TableHead>
              <TableHead className="w-[80px] p-1  border border-black h-6 font-bold text-xs text-black dark:text-gray-100 " >No.Pel</TableHead>
              <TableHead className="w-[150px] p-1 border border-black h-6 font-bold text-xs text-black dark:text-gray-100 " >Nama</TableHead>
              <TableHead className="w-[180px] p-1 border border-black h-6 font-bold text-center  text-xs text-black dark:text-gray-100 " >Alamat</TableHead>
              <TableHead className='w-[80px] border border-black  p-1 h-6 font-bold text-center  text-xs text-black dark:text-gray-100 ' >Kelurahan</TableHead>
              <TableHead className="w-[100px] p-1 border border-black h-6 font-bold text-center  text-xs text-black dark:text-gray-100 " >No Hp</TableHead>
              <TableHead className="w-[40px] p-1 border border-black h-6 font-bold text-center  text-xs text-black dark:text-gray-100 " >V</TableHead>
            </TableRow>
    
          </TableHeader>
          <TableBody>
            {/* {UserData.data.map((lap : any,ind : number) => {
                return (
                  <Fragment key={`${ind}-${lap.nik}`}>
                    <TableRow >
                      <TableCell className={`w-[10px] border border-black p-1 text-xs text-center`} >{ind+1}</TableCell>
                      <TableCell className={`w-[80px] p-1 border border-black text-xs text-left`} >{lap.nosamb}</TableCell>
                      <TableCell className={`w-[150px] p-1 border border-black text-xs text-left`} >{lap.nama}</TableCell>
                      <TableCell className={`w-[180px] p-1 border border-black text-xs text-left`} >{lap.alamat}</TableCell>
                      <TableCell className={`w-[80px] p-1 border border-black text-xs text-left`} >{lap.kelurahan}</TableCell>
                      <TableCell className={`w-[100px] p-1 border border-black text-xs text-left`} >{lap.nohp}</TableCell>
                      <TableCell className={`w-[40px] p-1 border border-black text-xs text-center`} >{lap.verifikasi}</TableCell>
                    </TableRow> 
           
                  </Fragment>
                )
              })

              } */}
          </TableBody>
        </Table>
        {/* <FooterLap datattd={lapksObj.data.datattd} tanggalreport={tanggalreport} kota='Probolinggo'/> */}
      </div>
    </div>
    </>
  )
}
