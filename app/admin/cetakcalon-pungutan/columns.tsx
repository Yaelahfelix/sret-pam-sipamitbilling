"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable-header-column";

import * as React from "react";
import { formatNumber } from "@/lib/utils";
// define data

interface Data {
  id: number;
  nosamb: string;
  tarif_id: null;
  nama: string;
  alamat: string;
  nohp: string;
  kelurahan: string;
  created_at: string;
  updated_at: string;
  kodegol: string;
  koderet: null;
}
export const columns: ColumnDef<Data>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "nosamb",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No Pel" className="w-6" />
    ),
  },
  {
    accessorKey: "nama",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" className="w-6" />
    ),
  },
  {
    accessorKey: "alamat",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat" className="w-6" />
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
    accessorKey: "kodegol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Gol" />
    ),
  },
];
