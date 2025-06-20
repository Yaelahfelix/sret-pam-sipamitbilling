"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/datatable-header-column";
import Actions from "./actions";
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
import { formatNumber } from "@/lib/utils";
// define data
export type Tarif = {
  id: string;
  kode: string;
  nama: string;
  tarif: number;
};

export const columns: ColumnDef<Tarif>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "kode_golongan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Gol" />
    ),
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "retribusi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tarif" />
    ),
    cell: function Cell({ row }) {
      return formatNumber(row.getValue("retribusi"));
    },
  },
];
