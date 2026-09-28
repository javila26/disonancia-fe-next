"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useState, type ComponentProps } from "react";
import { VinylCatalogLoader } from "@/components/vinyl-catalog-loader";

type CatalogNavigationContextValue = {
  isPending: boolean;
  startNavigation: (query: string) => void;
};

const CatalogNavigationContext = createContext<CatalogNavigationContextValue | null>(null);

export function CatalogNavigationProvider({ children }: { children: React.ReactNode }) {
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);
  const query = useSearchParams().toString();

  return (
    <CatalogNavigationContext.Provider
      value={{ isPending: pendingQuery !== null && pendingQuery !== query, startNavigation: setPendingQuery }}
    >
      {children}
    </CatalogNavigationContext.Provider>
  );
}

export function useCatalogNavigation() {
  const context = useContext(CatalogNavigationContext);

  if (!context) {
    throw new Error("useCatalogNavigation must be used within CatalogNavigationProvider");
  }

  return context;
}

type CatalogLinkProps = ComponentProps<typeof Link>;

export function CatalogLink({ onClick, ...props }: CatalogLinkProps) {
  const { startNavigation } = useCatalogNavigation();

  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
          const href = typeof props.href === "string" ? props.href : props.href.pathname ?? "";
          startNavigation(href.split("?")[1] ?? "");
        }
      }}
    />
  );
}

export function CatalogPendingBoundary({ children }: { children: React.ReactNode }) {
  const { isPending } = useCatalogNavigation();

  return isPending ? <VinylCatalogLoader /> : children;
}
