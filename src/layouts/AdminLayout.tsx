"use client";

"use client";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ChevronDown, Disc3, FolderTree, LayoutDashboard, LibraryBig, Package2, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Ecommerce",
    icon: ShoppingBag,
    children: [
      { label: "Vinyls", to: "/admin/vinyls", icon: Disc3 },
      { label: "Categories", to: "/admin/categories", icon: FolderTree },
    ],
  },
  {
    label: "Inventory",
    to: "/admin",
    icon: LibraryBig,
  },
];

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const ecommerceActive = useMemo(
    () => ["/admin/vinyls", "/admin/categories"].some((path) => pathname.startsWith(path)),
    [pathname],
  );
  const [isEcommerceOpen, setIsEcommerceOpen] = useState(ecommerceActive || pathname === "/admin");

  return (
    <div className="min-h-screen  text-white">
      <div className="mx-auto flex min-h-screen overflow-hidden  ">
        <aside className="w-full max-w-full  bg-[#1a1a1a] px-5 py-6 md:max-w-72 md:border-b-0 md:border-r md:px-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl border  bg-[#111111]">
              <Package2 className="size-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/50">Admin</p>
              <h1 className="text-lg font-semibold font-[plus_jakarta_sans]">Vinyls Panel</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              if (!item.children) {
                return (
                  <Link
                    key={item.label}
                    href={item.to}
                    className={cn(
                      cn(
                        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                        (pathname === item.to || (item.to !== "/admin" && pathname.startsWith(`${item.to}/`)))
                          ? "border border-white bg-white text-[#1a1a1a]"
                          : "border border-transparent text-white/70 hover:border-white hover:bg-[#111111] hover:text-white",
                      )
                    )}
                  >
                    <Icon className="size-4.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <div key={item.label} className="bg-transparent">
                  <button
                    type="button"
                    onClick={() => setIsEcommerceOpen((open) => !open)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
                      ecommerceActive || isEcommerceOpen
                        ? "border border-white bg-white text-[#1a1a1a]"
                        : "border border-transparent text-white/70 hover:border-white hover:bg-[#111111] hover:text-white",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4.5" />
                      {item.label}
                    </span>
                    <ChevronDown
                      className={cn("size-4 transition-transform duration-200", isEcommerceOpen && "rotate-180")}
                    />
                  </button>

                  <div
                    className={cn(
                      "grid overflow-hidden pl-5 transition-all duration-300",
                      isEcommerceOpen ? "grid-rows-[1fr] pt-2" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="space-y-2 border-l border-white/30 pl-4">
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;

                          return (
                            <Link
                              key={child.label}
                              href={child.to}
                              className={cn(
                                cn(
                                  "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                                  pathname === child.to || pathname.startsWith(`${child.to}/`)
                                    ? "border border-white bg-white text-[#1a1a1a]"
                                    : "border border-transparent text-white/60 hover:border-white/70 hover:bg-[#111111] hover:text-white",
                                )
                              )}
                            >
                              <span className="flex items-center gap-3">
                                <ChildIcon className="size-4" />
                                {child.label}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 bg-[#1a1a1a]">
          <Toaster position="bottom-right" />
          <section className="min-h-full p-5 sm:p-8 lg:p-10">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};
