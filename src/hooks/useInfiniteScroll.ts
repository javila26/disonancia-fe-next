import { useRef, useCallback } from "react";

type UseInfiniteScrollProps = {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
};

export function useInfiniteScroll({ hasMore, loading, onLoadMore }: UseInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return observe;
}
