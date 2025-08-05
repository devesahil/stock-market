import { useNews } from "@/hooks/useNews";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function MarketNews() {
  const { data: news, isLoading } = useNews();

  const formatDate = (date: string | Date) => {
    const now = new Date();
    const publishedDate = typeof date === 'string' ? new Date(date) : date;
    const diffInHours = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "1 day ago";
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Market Update": "bg-primary text-white",
      "Breaking": "bg-secondary text-white",
      "Analysis": "bg-yellow-500 text-white",
      "Trending": "bg-purple-500 text-white",
      "default": "bg-gray-500 text-white"
    };
    return colors[category] || colors.default;
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Latest Market News</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Stay informed with real-time market updates and expert analysis</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <Skeleton className="w-full h-64" />
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <Skeleton className="h-6 w-24 rounded-full mr-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-neutral-50 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Skeleton className="h-5 w-16 rounded mr-3" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!news?.length) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Latest Market News</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Stay informed with real-time market updates and expert analysis</p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-neutral-600">No news articles available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredArticle = news[0];
  const sidebarArticles = news.slice(1, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Latest Market News</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Stay informed with real-time market updates and expert analysis</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.article 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              data-testid={`featured-article-${featuredArticle.id}`}
            >
              {featuredArticle.imageUrl && (
                <img 
                  src={featuredArticle.imageUrl} 
                  alt={featuredArticle.title}
                  className="w-full h-64 object-cover" 
                />
              )}
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredArticle.category)}`}>
                    {featuredArticle.category}
                  </span>
                  <span className="text-neutral-500 text-sm ml-4" data-testid={`article-date-${featuredArticle.id}`}>
                    {formatDate(featuredArticle.publishedAt)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 hover:text-primary transition-colors duration-300 cursor-pointer" data-testid={`article-title-${featuredArticle.id}`}>
                  {featuredArticle.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed" data-testid={`article-excerpt-${featuredArticle.id}`}>
                  {featuredArticle.excerpt}
                </p>
                <button className="text-primary font-semibold hover:text-blue-700 transition-colors duration-300 flex items-center" data-testid={`button-read-article-${featuredArticle.id}`}>
                  Read Full Article
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </motion.article>
          </div>
          
          <div className="space-y-6">
            {sidebarArticles.map((article, index) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-xl p-6 hover:bg-neutral-100 transition-colors duration-300 cursor-pointer"
                data-testid={`sidebar-article-${article.id}`}
              >
                <div className="flex items-center mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                  <span className="text-neutral-500 text-sm ml-3" data-testid={`sidebar-article-date-${article.id}`}>
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2" data-testid={`sidebar-article-title-${article.id}`}>
                  {article.title}
                </h4>
                <p className="text-neutral-600 text-sm" data-testid={`sidebar-article-excerpt-${article.id}`}>
                  {article.excerpt.substring(0, 100)}...
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
