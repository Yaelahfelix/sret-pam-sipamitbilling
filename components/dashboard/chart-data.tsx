"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
	CardFooter,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from "@/lib/utils";
import useFetch from "@/hooks/useFetch"


const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ChartData(filter : 	any) {
	const { data: UserData, isLoading: UserLoading, isError: UserError, mutate: UserMutate } = useFetch('/api/dashboard/chart',filter.filter);
	if (UserError) return (
		<div className="flex flex-col gap-5 justify-center content-center p-5">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Dashboard</CardTitle>
					<CardDescription>Dashboard Chart 1</CardDescription>
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
		<>
		<div className="flex flex-1 w-full gap-5 justify-center content-center">
			<Card className="w-full flex-1">
				<CardHeader>

				</CardHeader>
				<CardContent>

					<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
					<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
					<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</div>
				<div className="flex flex-1 w-full gap-5 justify-center content-center">
				<Card className="w-full flex-1">
					<CardHeader>

					</CardHeader>
					<CardContent>

						<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
						<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
						<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</div>
				<div className="flex flex-1 w-full gap-5 justify-center content-center">
				<Card className="w-full flex-1">
					<CardHeader>

					</CardHeader>
					<CardContent>

						<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
						<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
						<Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</div>
			</>
	)
	if (!UserData.success) return (
		<div className="flex flex-col gap-5 justify-center content-center p-5">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Dashboard Chart 1</CardTitle>
					<CardDescription>Dashboard Chart 2</CardDescription>
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
  
      <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] md:h-[490px] w-full"
        >
          <AreaChart data={UserData.data}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="tgl"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("id-ID", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
									formatter={(value) => `${value.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}`}
                />
              }
            />
            <Area
              dataKey="jumlah"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer> 

  )
}
