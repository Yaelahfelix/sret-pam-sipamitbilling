"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable-header-column";

import * as React from "react";
import { formatNumber } from "@/lib/utils";
import { formatRupiah } from "@/lib/formatRp";
// define data
export type DRD = {
  id: string;
  no_pelanggan: string;
  periode: string;
  nama: number;
  alamat: string;
  kodegol: string;
  retribusi: number;
  nama_user: string;
  nama_loket: string;
};

export const columns: ColumnDef<DRD>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "periode",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Periode" className="w-6" />
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
    accessorKey: "no_pelanggan",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No Pel" className="w-6" />
    ),
  },
  {
    accessorKey: "kodegol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Gol" />
    ),
  },
  {
    accessorKey: "retribusi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Retribusi" />
    ),
    cell: ({ row }) => formatRupiah(row.original.retribusi),
  },
  {
    accessorKey: "nama_user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kasir" />
    ),
  },
  {
    accessorKey: "nama_loket",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loket Bayar" />
    ),
  },
];
