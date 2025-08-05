import { useQuery } from "@tanstack/react-query";
import type { NewsArticle } from "@shared/schema";

export function useNews() {
  return useQuery<NewsArticle[]>({
    queryKey: ["/api/news"],
  });
}
