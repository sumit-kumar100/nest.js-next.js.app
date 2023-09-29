"use client";

import React, { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/data-table/table";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "./pagination";
import { PAGINATION_LIMIT } from "@/config/constant";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  customFilters?: React.ReactElement[];
  searchable?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  customFilters,
  searchable,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data: data || [],
    columns,
    manualPagination: false,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: PAGINATION_LIMIT
      }
    },
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Fragment>
      {((customFilters && customFilters.length > 0) || searchable) && (
        <div className="my-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customFilters?.map((filter: React.ReactElement, index: number) => (
            <div className="custom-filter" key={index}>
              {filter}
            </div>
          ))}
          {searchable && (
            <div className="search-filter">
              <div className="relative">
                <Icons.Search className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-500" />
                <Input
                  placeholder="Search"
                  className="pl-12 pr-4"
                  value={globalFilter ?? ""}
                  onChange={(event) => {
                    setGlobalFilter(String(event.target.value));
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows && table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-lg text-gray-500"
              >
                No Records Found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mr-4 flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </Fragment>
  );
}
