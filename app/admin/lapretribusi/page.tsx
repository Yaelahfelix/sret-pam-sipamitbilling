'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { format } from "date-fns"
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
import useFetch from '@/hooks/useFetch';
import LapAduanReport from './component-report';
import { DateRangePicker } from '@/components/date/date-range-picker';



export default function Page() {
  const [date, setDate] = useState<Date>();
  const [dates, setDates] = useState<{ start: Date; end: Date }>({ start: new Date(), end: new Date() });
  const [selesaiDates, setSelesaiDates] = useState<{ start: Date; end: Date }>({ start: new Date(), end: new Date() });
  const [filterLap,setFilterLap] = useState({ start: new Date(), end: new Date(),seStart: new Date(), seEnd: new Date(), istampilkan: false });
  const router = useRouter();

  const handlebuttonTampilkan = () => {
    setFilterLap({ ...filterLap, istampilkan: true, start : dates.start , end : dates.end, seStart : selesaiDates.start, seEnd : selesaiDates.end })
  }
  return (
    <>
      <div className="flex flex-col gap-5 justify-center content-center p-5">
        <div className="w-full flex flex-row gap-4 justify-start items-center">
          <Label>Periode Aduan</Label>
          {/* <Popover >
              <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dates ? `${format(dates.start, "MMM yyyy")} - ${format(dates.end, "MMM yyyy")}` : <span>Pick a month range</span>}
                  </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
       

              </PopoverContent>
          </Popover> */}
                  <DateRangePicker
                  onUpdate={(values) => console.log(values)}
                  initialDateFrom="2023-01-01"
                  initialDateTo="2023-12-31"
                  align="start"
                  locale="id-ID"
                  showCompare={false}
                />
          <Button onClick={handlebuttonTampilkan}>Tampilan</Button>
 
        </div>  {
          filterLap.istampilkan ? <LapAduanReport isTampilkan={filterLap.istampilkan} periode={`${format(dates.start, "MMM yyyy")} - ${format(dates.end, "MMM yyyy")}`} filter={filterLap}/>  : null
        }
                
      </div>
    </>
  );
}
