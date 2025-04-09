"use client"

import { useRouter } from "next/navigation"
import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Check, ChevronsUpDown, CircleAlert, Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
// import { getUserRoles } from "@/actions/userRolesAction"
// import { getUserStatuses } from "@/actions/userStatusesAction"
import { createData, editData } from "@/lib/actions/actTarif"
import { serialize } from "object-to-formdata"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

type userRoles = {
  id: string
  userRoleName: string
}

type userStatuses = {
  id: string
  userStatusName: string
}

export default function TarifForm({ tarif }: { tarif?: any }) {
  const router = useRouter()
  const { toast } = useToast()


  const formSchema = z
    .object({
			kode: z.string().min(1, "Kode is required"),
			nama: z.string().min(1, "Name is required"),
      tarif: z.coerce.number().min(1, "Tarif is required"),
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: tarif
      ? {
				  kode: tarif.kode ?? "",
					nama: tarif.nama ?? "",
          tarif: tarif.tarif ?? "",

        }
      : {
				  kode: "",
          nama: "",
          tarif: 0
        },
  })

  const [isPending, startTransition] = useTransition()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = serialize(values)
      const data = tarif
        ? await editData(tarif.id, formData)
        : await createData(formData)

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
        })

        router.push("/admin/tarif")
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          description: (
            <div className="flex gap-2 items-start">
              <div className="flex flex-col justify-start ">
                <CircleAlert className="w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-lg">{data.message}</p>
                {/* <ul className="list-disc pl-5">
                  {data.data.map((val: any, key: number) => (
                    <li key={key}>{val.message}</li>
                  ))}
                </ul> */}
              </div>
            </div>
          ),
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<FormField
          control={form.control}
          name="kode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode</FormLabel>
              <FormControl>
                <Input type="text" placeholder="kode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nama" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tarif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tarif</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Tarif" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
		
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}