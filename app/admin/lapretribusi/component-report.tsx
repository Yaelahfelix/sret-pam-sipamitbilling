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
interface Props {
	isTampilkan : boolean,
  periode : string,
	filter : any
}

export default function LapAduanReport(props : Props) {
  const { data: UserData, isLoading: UserLoading, isError: UserError, mutate: UserMutate } = useFetch('/api/lap-aduan', props.filter)
  const searchParams = useSearchParams()
  const componentRef = useRef<HTMLDivElement>(null)

	const reactToPrintFn = useReactToPrint({ contentRef : componentRef });
	if(!props.isTampilkan){
		return null;
	}
	if (UserError) return (
		<div className="flex flex-col gap-5 justify-center content-center p-5">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Pengaduan</CardTitle>
					<CardDescription>Pengaduan</CardDescription>
				</CardHeader>
				<CardContent>
						<Alert variant="destructive" className="mb-5">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error Fetching Data</AlertTitle>
							<AlertDescription>{UserError}</AlertDescription>
						</Alert>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</div>
	);
	if (UserLoading) return (
		<div className="flex flex-col gap-5 justify-center content-center p-5">
		<Card className="w-full">
			<CardHeader>
				{/* <CardTitle>Users</CardTitle>
				<CardDescription>Users Management</CardDescription> */}
			</CardHeader>
			<CardContent>
				{/* {!data.success && (
					<Alert variant="destructive" className="mb-5">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error Fetching Data</AlertTitle>
						<AlertDescription>{data.message}</AlertDescription>
					</Alert>
				)} */}
				{/* <Link href="/users/create" className="flex justify-end">
					<Button variant="default">
						<Plus className="w-4 h-4 mr-1" /> Create
					</Button>
				</Link> */}
				<Skeleton className="flex w-full m-1 h-[20px] rounded-full" />
				<Skeleton className="flex w-full m-1 h-[20px] rounded-full" />
				<Skeleton className="flex w-full m-1 h-[20px] rounded-full" />
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
		</div>
	)
	if (!UserData.success) return (
		<div className="flex flex-col gap-5 justify-center content-center p-5">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Laporan Pengaduan</CardTitle>
					<CardDescription>Laporan Pengaduan</CardDescription>
				</CardHeader>
				<CardContent>
						<Alert variant="destructive" className="mb-5">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error Fetching Data</AlertTitle>
							<AlertDescription>{UserData.message}</AlertDescription>
						</Alert>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</div>
	);



  return (
    <>
		
    <div className='w-[297mm] mx-auto border-2 shadow-lg'>
      <div className='flex justify-end'>
				<div className='my-2 w-[297mm] flex justify-end'>
						<Button className='mx-[20px] ' onClick={() => reactToPrintFn()}>Print Laporan</Button>
				</div>
        {/* <ReactToPrint
				          trigger={()=>{ return (
          
							
										) 
									}}
									content={()=> componentRef.current }
				/> */}

      </div>




      <div ref={componentRef} className={`${styles.basereport} overflow-auto border-t`}>

        {/* <Image
              src={logos[0].src}
              alt="logo"
              width={75}
              height={logos[0].height}
            /> */}
        <HeaderLap periode={props.periode} judul='LAPORAN ADUAN'/>

        <Table className='table'>
          <TableHeader>
            <TableRow  className="">
              <TableHead className="w-[10px] border border-black p-1 h-6 font-bold text-xs " rowSpan={3}>No</TableHead>
              <TableHead className="w-[80px] p-1  border border-black h-6 font-bold text-xs" rowSpan={3}>NIK</TableHead>
              <TableHead className="w-[180px] p-1 border border-black h-6 font-bold text-xs" rowSpan={3}>Nama</TableHead>
              <TableHead className="w-[20px] p-1 border border-black h-6 font-bold text-center  text-xs" rowSpan={3}>Hari Kerja</TableHead>
              <TableHead className='border border-black  p-1 h-6 font-bold text-center  text-xs' colSpan={5} rowSpan={2}>Absensi</TableHead>
              <TableHead className="w-[20px] p-1 border border-black h-6 font-bold text-center  text-xs" rowSpan={3}>Total Masuk</TableHead>
              <TableHead className="w-[60px] p-1 border border-black h-6 font-bold text-center  text-xs" rowSpan={3}>Jumlah</TableHead>
              <TableHead className='border border-black w-[100px]  p-1 h-8 font-bold text-center  text-xs' colSpan={4}>Terlambat</TableHead>
              <TableHead className='border border-black w-[100px]  p-1 h-8 font-bold text-center  text-xs' colSpan={4}>Pulang Awal</TableHead>
              <TableHead className="w-[60px] p-1 border border-black h-6 font-bold text-center  text-xs" rowSpan={3}>Total Pot</TableHead>
              <TableHead className="w-[80px] p-1 border border-black h-6 font-bold text-center  text-xs" rowSpan={3}>Jumlah Yg Diberikan</TableHead>
              <TableHead className="p-1 border border-black h-6 font-bold text-center  text-xs" rowSpan={3}>Tanda Tangan</TableHead>
            </TableRow>
            <TableRow>

              <TableHead className='w-[20px] border border-black h-5 font-bold p-1  text-xs  text-center'>A</TableHead>
              <TableHead className='w-[60px] border border-black h-5 font-bold p-1 text-xs text-center'>0-15</TableHead>
              <TableHead className='w-[20px] border border-black h-5 font-bold p-1 text-xs text-center'>C</TableHead>
              <TableHead className='w-[60px] border border-black h-5 font-bold p-1 text-xs text-center'>30-60</TableHead>
              <TableHead className='w-[20px] border border-black h-5 font-bold  p-1 text-xs text-center'>A</TableHead>
              <TableHead className='w-[60px] border border-black h-5 font-bold p-1 text-xs text-center'>0-15</TableHead>
              <TableHead className='w-[20px] border border-black h-5 font-bold p-1 text-xs text-center'>C</TableHead>
              <TableHead className='w-[60px] border border-black h-5 font-bold p-1 text-xs text-center'>30-60</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className='w-[20px] border border-black h-5 font-bold p-1 text-xs text-center'>S</TableHead>
              <TableHead className='w-[20px] border border-black h-5 font-bold p-1 text-xs text-center' >I</TableHead>
              <TableHead className="w-[20px] border border-black h-5 font-bold p-1 text-xs text-center" >A</TableHead>
              <TableHead className="w-[20px] border border-black h-5 font-bold p-1 text-xs text-center" >D</TableHead>
              <TableHead className="w-[20px] border border-black h-5 font-bold p-1 text-xs text-center" >L</TableHead>  
              <TableHead className='w-[20px] border border-black h-5 font-bold  p-1 text-xs text-center'>B</TableHead>
              <TableHead className='w-[60px] border border-black h-5 font-bold  p-1 text-xs text-center'>15-30</TableHead>
              <TableHead className='w-[20px] border border-black h-5 font-bold  p-1 text-xs text-center'>D</TableHead>
              <TableHead className='w-[60px] border border-black h-5 font-bold  p-1 text-xs text-center'> 	&gt; 60</TableHead>
              <TableHead className='w-[20px] border border-black h-5 font-bold  p-1 text-xs text-center'>B</TableHead>
              <TableHead className='w-[60px] border border-black h-5 font-bold  p-1 text-xs text-center'>15-30</TableHead>
              <TableHead className='w-[20px] border border-black h-5 font-bold  p-1 text-xs text-center'>D</TableHead>
              <TableHead className='w-[60px] border border-black h-5 font-bold  p-1 text-xs text-center'> 	&gt; 60</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

{/* 
            {lapksObj.data.datalap.map((lap,ind) => {
                // let clsName : string = ""; 
                // if(neraca.uraian === "Jumlah Kas / Bank") {
                //   clsName = "font-bold"
                // } else {
                //   clsName = "font-normal"
                // }
                return (
                  <Fragment key={`${ind}-${lap.nik}`}>
                    <TableRow >
                      {lap.isheader ? (
                          <>
                            <TableCell className={cn(lap.clsname,'h-10 text-left border border-black text-xs')} colSpan={22}>{lap.nama}</TableCell>
                          </>

                      ): (
                       
                        (lap.isfooter ? (
                          <>
                            <TableCell className={cn(lap.clsname,'text-left border border-black text-xs')} colSpan={3} rowSpan={2}>{lap.nama}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumharikerja}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumsakit}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{parseInt(lap.sumijin)+parseInt(lap.sumcuti)}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumalpha}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumdispensasi}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumblmabsenkeluar}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} rowSpan={2}>{lap.sumtotalmasuk}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} rowSpan={2}>{lap.totalbeforepot}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlterlambat1[0][0]}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlterlambat1[0][1]}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlterlambat2[0][0]}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlterlambat2[0][1]}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlpulangawal1[0][0]}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlpulangawal1[0][1]}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlpulangawal2[0][0]}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlpulangawal2[0][1]}</TableCell> 
                            <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} rowSpan={2}>{lap.totalpotong}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} rowSpan={2}>{lap.totalafterpot}</TableCell>
                            <TableCell className={cn(lap.clsname,'p-[5px] text-left border border-black text-xs')} rowSpan={2}></TableCell>   
                          </>  
                        ) : (
                          <>
                          <TableCell className={`w-[10px] border border-black p-1 text-xs text-center`} rowSpan={2}>{lap.no}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-left border border-black text-xs')} rowSpan={2}>{lap.nik}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-left border border-black text-xs')} rowSpan={2}>{lap.nama}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumharikerja}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumsakit}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{parseInt(lap.sumijin)+parseInt(lap.sumcuti)}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumalpha}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumdispensasi}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} rowSpan={2}>{lap.sumblmabsenkeluar}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} rowSpan={2}>{lap.sumtotalmasuk}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} rowSpan={2}>{lap.totalbeforepot}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlterlambat1[0][0]}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlterlambat1[0][1]}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlterlambat2[0][0]}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlterlambat2[0][1]}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlpulangawal1[0][0]}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlpulangawal1[0][1]}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlpulangawal2[0][0]}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlpulangawal2[0][1]}</TableCell> 
                          <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} rowSpan={2}>{lap.totalpotong}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} rowSpan={2}>{lap.totalafterpot}</TableCell>
                          <TableCell className={cn(lap.clsname,'p-[5px] text-left border border-black text-xs')} rowSpan={2}>{lap.no+"."}</TableCell>       
                          </>                      
                        ))
                      ) }
                
                    </TableRow>
  
                    <TableRow >
                    {lap.isheader ? (
                          <>
                          </>

                      ): (
                       <>
                        <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlterlambat1[1][0]}</TableCell>
                        <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlterlambat1[1][1]}</TableCell>
                        <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlterlambat2[1][0]}</TableCell>
                        <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlterlambat2[1][1]}</TableCell>
                        <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlpulangawal1[1][0]}</TableCell>
                        <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlpulangawal1[1][1]}</TableCell>
                        <TableCell className={cn(lap.clsname,'p-[5px] text-center border border-black text-xs')} >{lap.jmlpulangawal2[1][0]}</TableCell>
                        <TableCell className={cn(lap.clsname,'p-[5px] text-right border border-black text-xs')} >{lap.jmlpulangawal2[1][1]}</TableCell>                        
                       </>
                      ) }


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
