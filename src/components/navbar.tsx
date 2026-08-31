"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Helper to check if the current path matches
  const isActive = (path: string) => pathname === path && "underline";

  return (
    <header className="bg-[#1a1a1a] border-b-2 border-white p-4 flex text-white justify-between">
      <div className="flex gap-4 items-center w-full justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/diso_logo.png" className="h-10" alt="Logo" />
          </Link>
        </div>

        {/* Desktop Menu */}
        {!isMobile && (
          <ul className="flex gap-8 text-white text-xl mr-6">
            <Link href={"/"} className={`font-[plus_jakarta_sans] text-2xl ${isActive("/")}`}>
              Home
            </Link>
            <Link href={"/about"} className={`font-[plus_jakarta_sans] text-2xl ${isActive("/about")}`}>
              About
            </Link>
          </ul>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Menu className="h-6 w-6 text-gray-300" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1a1a1a] text-white">
              <nav className="m-6 flex flex-col gap-6">
                <Link href="/" className={`text-2xl font-[plus_jakarta_sans] ${isActive("/")}`}>
                  Home
                </Link>
                <Link href="/about" className={`text-2xl font-[plus_jakarta_sans] ${isActive("/about")}`}>
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
}
