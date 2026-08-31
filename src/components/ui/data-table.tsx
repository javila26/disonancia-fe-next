"use client";

import { useEffect, useState } from "react";
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";

type DataTablePaginationState = {
  pageIndex: number;
  pageSize: number;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  initialPage?: number;
  initialPageSize?: number;
  onPaginationChange?: (page: number, limit: number) => void;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  initialPage = 0,
  initialPageSize = 10,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageIndex: Math.max(0, initialPage),
    pageSize: initialPageSize,
  });
  const pageCount = Math.max(1, Math.ceil(total / pagination.pageSize));
  const pageIndex = Math.min(Math.max(0, pagination.pageIndex), pageCount - 1);

  useEffect(() => {
    setPagination((current) => {
      if (current.pageIndex === pageIndex) {
        return current;
      }

      return {
        ...current,
        pageIndex,
      };
    });
  }, [pageIndex]);

  useEffect(() => {
    onPaginationChange?.(pageIndex, pagination.pageSize);
  }, [onPaginationChange, pageIndex, pagination.pageSize]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination: {
        pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
