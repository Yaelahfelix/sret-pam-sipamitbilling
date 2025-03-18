"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/datatable-header-column"
import Actions from "./actions"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
// define data
export type CapelRet = {
  id: string,
  nosamb : string,
  koderet : string,
	nama: string,
  alamat: string,
  kelurahan: String
}

export const columns: ColumnDef<CapelRet>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "koderet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Ret." />
    ),
  },
  {
    accessorKey: "nosamb",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No Pelanggan" />
    ),
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat" />
    ),
  },
  {
    accessorKey: "kelurahan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kelurahan" />
    ),
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      return (
        <Actions id={row.original.id} />
      );
    },
    size: 40,
  },
]