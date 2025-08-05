import { useQuery } from "@tanstack/react-query";
import type { PageContent } from "@shared/schema";

export function usePageContent() {
  return useQuery<PageContent[]>({
    queryKey: ["/api/content"],
  });
}

export function usePageContentBySection(section: string) {
  return useQuery<PageContent[]>({
    queryKey: ["/api/content", section],
  });
}