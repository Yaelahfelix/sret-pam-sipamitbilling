"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AlertCircle, CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/useFetch";
import LapAduanReport from "./component-report";
import { DateRangePicker } from "@/components/date/date-range-picker";
import useSWR from "swr";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PDFReport from "./component-report";

const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export interface Rekapitulasi {
  kasir: Kasir[];
  loketBayar: LoketBayar[];
}

interface LoketBayar {
  totalrp: string;
  lbr: number;
  loketbayar: string;
}

interface Kasir {
  totalrp: string;
  lbr: number;
  kasir: string;
}
export default function Page() {
  const [date, setDate] = useState<Date>();
  const [dates, setDates] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date(),
  });
  const [filterLap, setFilterLap] = useState<any>({
    start: new Date(),
    end: new Date(),
    kasir: null,
    loketbayar: null,
    istampilkan: false,
  });
  const router = useRouter();
  const [selectedKasir, setSelectedKasir] = useState("");
  const [selectedLoket, setSelectedLoket] = useState("");

  const {
    data: dataKasir,
    error: errorKasir,
    isLoading: isLoadingKasir,
  } = useSWR<{ data: { nama: string }[] }>("/api/info-filter/kasir", fetcher);
  const {
    data: dataLoket,
    error: errorLoket,
    isLoading: isLoadingLoket,
  } = useSWR<{ data: { kodeloket: string }[] }>(
    "/api/info-filter/loket",
    fetcher
  );

  console.log(dataKasir);
  console.log(dataLoket);
  const handlebuttonTampilkan = () => {
    setFilterLap({
      ...filterLap,
      istampilkan: true,
      start: format(dates.start, "yyyy-MM-dd"),
      end: format(dates.end, "yyyy-MM-dd"),
      kasir: selectedKasir ? selectedKasir : null,
      loketbayar: selectedLoket ? selectedLoket : null,
    });

    UserMutate();
  };

  const {
    data: UserData,
    isLoading: UserLoading,
    isError: UserError,
    mutate: UserMutate,
  } = useFetch(filterLap.istampilkan && "/api/lapretribusi", filterLap);

  console.log(UserData);
  return (
    <>
      <div className="flex flex-col gap-5 justify-center content-center p-5">
        <div className="flex justify-between">
          <div className="w-full flex flex-row gap-4 items-end">
            <div className="flex flex-col gap-4">
              <Label>Periode Aduan</Label>
              <DateRangePicker
                onUpdate={(values) => {
                  setDates({
                    start: values.range.from,
                    end: values.range.to || new Date(),
                  });
                }}
                initialDateFrom={dates.start}
                initialDateTo={dates.end}
                align="start"
                locale="id-ID"
                showCompare={false}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Filter</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 flex flex-col gap-4">
                <div>
                  <Label>Kasir</Label>
                  <Select onValueChange={setSelectedKasir}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kasir" />
                    </SelectTrigger>

                    <SelectContent>
                      {dataKasir?.data.map((kasir) => (
                        <SelectItem value={kasir.nama}>{kasir.nama}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Loket Bayar</Label>
                  <Select onValueChange={setSelectedLoket}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih loekt" />
                    </SelectTrigger>

                    <SelectContent>
                      {dataLoket?.data.map((loket) => (
                        <SelectItem value={loket.kodeloket}>
                          {loket.kodeloket}
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
            <PDFReport isLoading={UserLoading} data={UserData.data} rekapitulasi={UserData.rekapitulasi}/>
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
