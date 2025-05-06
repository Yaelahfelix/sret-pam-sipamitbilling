"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/datatable-header-column"
import Actions from "./actions"

import * as React from "react";
import { formatNumber } from "@/lib/utils";
// define data
export type CapelRet = {
  id: string,
  nosamb : string,
  koderet : string,
  tarif : number,
	nama: string,
  alamat: string,
  nohp : string,
  kelurahan: String,
  tarif_id: string
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
    enableSorting : false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Ret." className="w-6" />
    ),
  },
  {
    accessorKey: "tarif",
    enableSorting : false,
    header: ({ column }) => (
      
      <DataTableColumnHeader column={column} title="Tarif" className="w-6" />
    ),
    cell: function Cell({ row }) {
          return (
            formatNumber(row.getValue("tarif"))
          );
        },
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
    accessorKey: "nohp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No HP" />
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
        <Actions id={row.original.id} no_pelanggan={row.original.nosamb} nama={row.original.nama} tarif_id={row.original.tarif_id}/>
      );
    },
    size: 40,
  },
]