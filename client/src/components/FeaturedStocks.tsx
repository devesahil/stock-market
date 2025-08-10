import { useStocks } from "@/hooks/useStocks";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageContent } from "@/hooks/usePageContent";
import { getContentValue } from "@/utils/contentHelpers";

export default function FeaturedStocks() {
  const { data: stocks, isLoading } = useStocks();
  const { data: content } = usePageContent();

  const getStockInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getGradientColor = (symbol: string) => {
    const colors = [
      "from-blue-500 to-purple-600",
      "from-green-500 to-emerald-600", 
      "from-red-500 to-pink-600",
      "from-yellow-500 to-orange-600",
      "from-purple-500 to-indigo-600",
      "from-pink-500 to-rose-600"
    ];
    return colors[symbol.length % colors.length];
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Featured Stocks</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Track top performing stocks with real-time data and advanced analytics</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div className="ml-3">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                
                <div className="mb-4">
                  <Skeleton className="h-8 w-24 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
                
                <Skeleton className="h-24 w-full rounded-lg mb-4" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!stocks?.length) {
    return (
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Featured Stocks</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Track top performing stocks with real-time data and advanced analytics</p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-neutral-600">No stock data available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Featured Stocks</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Track top performing stocks with real-time data and advanced analytics</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stocks.slice(0, 6).map((stock, index) => (
            <motion.div 
              key={stock.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              data-testid={`stock-card-${stock.symbol}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColor(stock.symbol)} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                    {getStockInitial(stock.name)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-neutral-900" data-testid={`stock-name-${stock.symbol}`}>{stock.name}</h3>
                    <p className="text-sm text-neutral-500" data-testid={`stock-symbol-${stock.symbol}`}>{stock.symbol}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  parseFloat(stock.change) >= 0 
                    ? 'bg-secondary text-white' 
                    : 'bg-accent text-white'
                }`} data-testid={`stock-change-${stock.symbol}`}>
                  {parseFloat(stock.change) >= 0 ? '+' : ''}{stock.changePercent}%
                </span>
              </div>
              
              <div className="mb-4">
                <div className="text-3xl font-bold text-neutral-900 mb-1" data-testid={`stock-price-${stock.symbol}`}>${stock.price}</div>
                <div className={`text-sm font-medium ${
                  parseFloat(stock.change) >= 0 ? 'text-secondary' : 'text-accent'
                }`} data-testid={`stock-change-amount-${stock.symbol}`}>
                  {parseFloat(stock.change) >= 0 ? '+' : ''}${stock.change} today
                </div>
              </div>
              
              <div className={`h-24 bg-gradient-to-r ${
                parseFloat(stock.change) >= 0 
                  ? 'from-secondary/10 to-secondary/20 group-hover:from-secondary/20 group-hover:to-secondary/30' 
                  : 'from-accent/10 to-accent/20 group-hover:from-accent/20 group-hover:to-accent/30'
              } rounded-lg mb-4 flex items-end p-2 transition-colors duration-300`}>
                <div className="flex items-end space-x-1 w-full">
                  {[8, 12, 6, 16, 10, 20, 14, 18].map((height, i) => (
                    <motion.div 
                      key={i}
                      className={`${parseFloat(stock.change) >= 0 ? 'bg-secondary' : 'bg-accent'} w-2 rounded-t`}
                      style={{ height: `${height * 4}px` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height * 4}px` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full bg-primary hover:bg-blue-700 text-white transition-colors duration-300"
                data-testid={`button-trade-${stock.symbol}`}
              >
                Trade Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
