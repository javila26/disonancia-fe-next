import type { Metadata } from "next";
import About from "@/legacy-pages/ecommerce/About";

export const metadata: Metadata = { title: "About" };
export default function Page() { return <About />; }
