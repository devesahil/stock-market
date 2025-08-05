import { useStocks } from "@/hooks/useStocks";
import { motion } from "framer-motion";

export default function StockTicker() {
  const { data: stocks, isLoading } = useStocks();

  if (isLoading || !stocks?.length) {
    return (
      <div className="bg-neutral-900 text-white py-2 overflow-hidden">
        <div className="text-center text-neutral-400 text-sm">Loading market data...</div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 text-white py-2 overflow-hidden">
      <motion.div
        className="whitespace-nowrap flex"
        animate={{ x: [1200, -1200] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {stocks.map((stock) => (
          <span key={stock.id} className="inline-flex items-center mx-8 text-sm" data-testid={`ticker-${stock.symbol}`}>
            <span className="font-semibold mr-2">{stock.symbol}</span>
            <span className={`mr-2 ${parseFloat(stock.change) >= 0 ? 'text-secondary' : 'text-accent'}`}>
              ${stock.price}
            </span>
            <span className={`text-xs ${parseFloat(stock.change) >= 0 ? 'text-secondary' : 'text-accent'}`}>
              {parseFloat(stock.change) >= 0 ? '+' : ''}{stock.changePercent}%
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
