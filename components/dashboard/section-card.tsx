"use client";
import {
  DollarSign,
  TrendingDownIcon,
  TrendingUpIcon,
  User2Icon,
  UserCheck2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function SectionCards() {
  const {
    data: UserData,
    isLoading: UserLoading,
    isError: UserError,
    mutate: UserMutate,
  } = useFetch("/api/dashboard/sectioncard");
  const router = useRouter();
  if (UserError)
    return (
      <div className="flex flex-col gap-5 justify-center content-center p-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Dashboard Section 1</CardDescription>
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
  if (UserLoading)
    return (
      <>
        <div className="flex flex-1 w-full gap-5 justify-center content-center">
          <Card className="w-full flex-1">
            <CardHeader></CardHeader>
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
            <CardHeader></CardHeader>
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
            <CardHeader></CardHeader>
            <CardContent>
              <Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
              <Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
              <Skeleton className="flex  w-full m-1 h-[20px] rounded-full" />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>
      </>
    );
  if (!UserData.success)
    return (
      <div className="flex flex-col gap-5 justify-center content-center p-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dashboard Section 1</CardTitle>
            <CardDescription>Dashboard Section 2</CardDescription>
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
      <Card
        className="rounded-xl bg-muted/50"
        onClick={() => router.push("/admin/capel-ret")}
      >
        <CardHeader className="relative">
          <CardDescription className="">Jumlah Wajib Retribusi</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            {formatNumber(UserData.data.jml1)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total Pelanggan <User2Icon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total Pelanggan Kode Gol C dan C2
          </div>
        </CardFooter>
      </Card>
      <Card
        className="rounded-xl bg-muted/50"
        onClick={() => router.push("/admin/pelanggan")}
      >
        <CardHeader className="relative">
          <CardDescription className="">Total Pelanggan</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            {formatNumber(UserData.data.jml2)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tertagih Retribusi pada bulan ini{" "}
            <UserCheck2Icon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            akan terupdate otomatis setiap harinya
          </div>
        </CardFooter>
      </Card>

      <Card
        className="rounded-xl bg-muted/50"
        onClick={() => router.push("/admin/capel-ret")}
      >
        <CardHeader className="relative">
          <CardDescription className="">Total Pendapatan</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            {`Rp. ${formatNumber(UserData.data.jml3)}`}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Retribusi Sampah <DollarSign className="size-4" />
          </div>
          <div className="text-muted-foreground">
            akan terupdate otomatis setiap harinya
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
