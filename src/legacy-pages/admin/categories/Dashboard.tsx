"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoryStore } from "@/store/useCategoryStore";
import type { Category } from "@/types/category";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CategoriesDashboard() {
  const { categories, total, fetchCategories, removeCategory } = useCategoryStore();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    const toastId = toast.loading("Deleting category...");
    const deleted = await removeCategory(id);

    if (deleted) {
      toast.success("Category deleted successfully.", { id: toastId });
      return;
    }

    toast.error("Could not delete the category.", { id: toastId });
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`categories/${row.original.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => void handleDelete(row.original.id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/50">Ecommerce</p>
        <h1 className="mb-2 text-5xl font-[plus_jakarta_sans]">Categories</h1>
        <p className="max-w-2xl text-sm text-white/60 sm:text-base">
          Browse the categories already available in your catalog.
        </p>
        <Link href="/admin/categories/new">
          <Button variant="outline" className="my-4">
            Add
          </Button>
        </Link>
        <div className="text-sm text-white/60">{total} total categories</div>
      </div>

      <DataTable columns={columns} data={categories} total={total} onPaginationChange={fetchCategories} />
    </section>
  );
}
