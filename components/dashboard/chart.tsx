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
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import useFetch from "@/hooks/useFetch"
import { ChartData } from "./chart-data"


export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")
	const [filter, setFilter] = React.useState({isMobile :isMobile, timeRange: timeRange})

  return (
    <Card className="">
      <CardHeader className="relative">
        <CardTitle>Total Pendapatan</CardTitle>
        <CardDescription>
          <span className="md:block hidden">
            Retribusi Sampah
          </span>
          <span className="md:hidden">Retribusi Sampah</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
							setTimeRange(value)
							setFilter({...filter,timeRange : value})
							}}
            variant="outline"
            className="md:flex hidden"
          >
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={(value) => {
						setTimeRange(value)
						setFilter({...filter,timeRange : value})
						}}>
            <SelectTrigger
              className="md:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 1 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartData filter={filter} />
      </CardContent>
    </Card>
  )
}
