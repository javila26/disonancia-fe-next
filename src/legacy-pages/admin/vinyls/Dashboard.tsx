"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductStore } from "@/store/useProductsStore";
import type { Product } from "@/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function VinylsDashboard() {
  const { products, total, fetchProducts, removeProduct } = useProductStore();

  const handleDelete = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this vinyl?");

    if (!shouldDelete) {
      return;
    }

    const toastId = toast.loading("Deleting vinyl...");
    const deleted = await removeProduct(id);

    if (deleted) {
      toast.success("Vinyl deleted successfully.", { id: toastId });
      return;
    }

    toast.error("Could not delete the vinyl.", { id: toastId });
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "price",
      header: "Purchase",
    },
    {
      accessorKey: "artist",
      header: "Artist",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "Category",
      cell: ({ row }) => {
        return row.original.category.name;
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href={`vinyls/${row.original.id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => void handleDelete(row.original.id)}>Delete</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <h1 className="text-5xl mb-4">Vinyls</h1>
      <Link href={"/admin/vinyls/new"}>
        <Button variant={"outline"} className="my-4">
          Add
        </Button>
      </Link>
      <div className="w-12/12">
        <DataTable columns={columns} data={products} total={total} onPaginationChange={fetchProducts} />
      </div>
    </>
  );
}
