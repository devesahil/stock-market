import { useQuery } from "@tanstack/react-query";
import type { Stock } from "@shared/schema";

export function useStocks() {
  return useQuery<Stock[]>({
    queryKey: ["/api/stocks"],
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });
}
