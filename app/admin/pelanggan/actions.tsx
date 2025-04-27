"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTransition, useState, useCallback } from "react"
import { AlertCircle, Check, CheckCheck, CircleAlert, Pencil, Settings, Trash2 } from "lucide-react"
// import { encrypt } from "@/lib/crypto"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { editData, verifikasiData } from "@/lib/actions/capelret"
import { useToast } from "@/hooks/use-toast"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSWR from "swr"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const fetcher  = (url : any) => axios.get(url).then(res => res.data)

export default function Actions({ id,no_pelanggan,nama,tarif_id }: { id: string,no_pelanggan : string,nama : string ,tarif_id : string }) {
  const { data, error , isLoading } = useSWR('/api/tarif', fetcher)
  const [showVerifikasiDialog, setShowVerifikasiDialog] = useState(false);
  const [valueVerifikasi, setValueVerifikasi] = useState("4");
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()


	if (error) return (
		<main className="flex flex-col gap-5 justify-center content-center p-5">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Tarif</CardTitle>
					<CardDescription>Tarif Retribusi</CardDescription>
				</CardHeader>
				<CardContent>
					<Alert variant="destructive" className="mb-5">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error Fetching Data</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</main>
	);
	if (isLoading) return (

		<main className="flex flex-col gap-5 justify-center content-center p-5">
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
		</main>
	)
  console.log(tarif_id,"from acc");
  const deleteAction = (id: string) => {
    startTransition(() => {
      verifikasiData(id, valueVerifikasi).then((data) => {
        if (data.success) {
          toast({
            variant: "default",
            description: (
              <div className="flex gap-2 items-start">
                <div className="flex flex-col justify-start ">
                  <Check className="w-10 h-10" />
                </div>
                <div>
                  <p className="font-bold text-lg">Success</p>
                  <p>{data.message}</p>
                </div>
              </div>
            ),
          });
          router.refresh();
          // location.reload()
        } else {
          toast({
            variant: "destructive",
            description: (
              <div className="flex gap-2 items-center">
                <div className="flex flex-col justify-start ">
                  <CircleAlert className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-lg">{data.message}</p>
                </div>
              </div>
            ),
          });
        }
      });
    });
  }
  console.log(isLoading);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
  

          <DropdownMenuItem
            className="focus:bg-destructive focus:text-white"
            onClick={() => setShowVerifikasiDialog((prev) => !prev)}
          >

            <CheckCheck className="h-4 w-4 mr-2" /> Verifikasi Ulang
          </DropdownMenuItem>
 
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={showVerifikasiDialog }
        onOpenChange={(open) => {
          if (!open) {
            setShowVerifikasiDialog(false);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Verifikasi Pelanggan Retribusi
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4 w-full">
              <Label htmlFor="pelanggan">Pelanggan</Label>
              <Input
                id="pelanggan"
                value={`${no_pelanggan} - ${nama}`}
                disabled={false}
                readOnly={true}
                className="col-span-2"
              />

        
              <Label htmlFor="name" >Kode Retribusi</Label>
              <Select onValueChange={setValueVerifikasi}  defaultValue={tarif_id.toString()}>
                <SelectTrigger className="col-span-2 w-full">
                  <SelectValue  />
                </SelectTrigger>
                <SelectContent>
                  {data.data.map((val : any) => (
                    <SelectItem key={val.id} value={val.id.toString()}>{`${val.kode} - ${val.nama}`}</SelectItem>
                  ))}

                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            
            <Button
              variant="secondary"
              onClick={() => {
                setShowVerifikasiDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteAction(id)
                setShowVerifikasiDialog(false); 
              }
          
              }
              disabled={isPending}
            >
              Verifikasi Ulang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </>
  )
}