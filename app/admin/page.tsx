import AppHeaderAdmin from "@/components/header-admin";
import { Fragment } from "react";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon } from "lucide-react";
import { SectionCards } from "@/components/dashboard/section-card";
import { ChartAreaInteractive } from "@/components/dashboard/chart";

export default function Page() {
  
  return (
    <Fragment>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
    
            <SectionCards />
          
          </div>
          <div className=" min-h-[250px] flex-1 rounded-xl bg-muted/50 md:min-h-min" >
  
            <ChartAreaInteractive></ChartAreaInteractive>
  
           
          </div>
        </div>

    </Fragment>  
  )
}
