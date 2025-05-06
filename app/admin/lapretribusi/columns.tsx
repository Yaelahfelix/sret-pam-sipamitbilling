"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable-header-column";

import * as React from "react";
import { formatNumber } from "@/lib/utils";
import { formatRupiah } from "@/lib/formatRp";
// define data
export type DRD = {
  id: string;
  nosamb: string;
  periode: string;
  nama: number;
  alamat: string;
  kodegol: string;
  total: number;
  kasir: string;
  loketbayar: string;
  rekair: number;
  dendatunggakan: number;
  meterai: number;
  retribusi: number;
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
    accessorKey: "nosamb",
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
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => formatRupiah(row.original.retribusi),
  },
  {
    accessorKey: "kasir",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kasir" />
    ),
  },
  {
    accessorKey: "loketbayar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loket Bayar" />
    ),
  },
];
