"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
// import { onGetLap } from '@/services/api';
import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// const fetcher = onGetNeraca('/neraca',);
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import HeaderLap from "@/components/header-lap";
import { useReactToPrint } from "react-to-print";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
// import FooterLap from '@/components/footer-lap';
// import defaultDataTtd from '@/lib/default-value-type';
// import { DownloadTableExcel,useDownloadExcel } from 'react-export-table-to-excel';
// import ExcelExport from '@/lib/ExcelExport';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import PDFReport from "./component-report";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [filterLap, setFilterLap] = useState<any>({
    kelurahan: null,
    kodegol: null,
    istampilkan: false,
  });
  const [selectedKelurahan, setSelectedKelurahan] = useState("");
  const [selectedKodegol, setSelectedKodegol] = useState("");

  const {
    data: UserData,
    isLoading: UserLoading,
    isError: UserError,
    mutate: UserMutate,
  } = useFetch(filterLap.istampilkan && "/api/lapcapel", filterLap);
  const {
    data: dataKelurahan,
    isLoading: isLoadingKelurahan,
    isError: isErrorKelurahan,
  } = useFetch("/api/info-filter/kelurahan");

  const {
    data: dataKodegol,
    isLoading: isLoadingKodegol,
    isError: isErrorKodegol,
  } = useFetch("/api/info-filter/kodegol");
  const componentRef = useRef<HTMLDivElement>(null);

  const handlebuttonTampilkan = () => {
    setFilterLap({
      ...filterLap,
      istampilkan: true,
      kodegol: selectedKodegol ? selectedKodegol : null,
      kelurahan: selectedKelurahan ? selectedKelurahan : null,
    });

    UserMutate();
  };

  console.log(dataKodegol);
  console.log(dataKelurahan);
  console.log(UserData);

  return (
    <>
      <div className="flex flex-col gap-5 justify-center content-center p-5">
        <div className="flex justify-between">
          <div className="w-full flex flex-row gap-4 items-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Filter</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 flex flex-col gap-4">
                <div>
                  <Label>Kelurahan</Label>
                  <Select
                    onValueChange={setSelectedKelurahan}
                    value={selectedKelurahan}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kelurahan" />
                    </SelectTrigger>

                    <SelectContent>
                      {dataKelurahan?.data.map((data: any) => (
                        <SelectItem value={data.kelurahan} key={data.kelurahan}>
                          {data.kelurahan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Kode Gol</Label>
                  <Select
                    onValueChange={setSelectedKodegol}
                    value={selectedKodegol}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kode Gol" />
                    </SelectTrigger>

                    <SelectContent>
                      {dataKodegol?.data.map((data: any) => (
                        <SelectItem value={data.kodegol} key={data.kodegol}>
                          {data.kodegol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>

            <Button onClick={handlebuttonTampilkan}>Tampilkan</Button>
          </div>

          {UserData && (
            <PDFReport isLoading={UserLoading} data={UserData.data} />
          )}
        </div>

        {UserLoading && (
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
            </Card>
          </div>
        )}
        {UserData && <DataTable columns={columns} data={UserData.data} />}
      </div>
    </>
  );
}
