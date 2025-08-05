import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { usePageContent } from "@/hooks/usePageContent";
import { getContentValue } from "@/utils/contentHelpers";

export default function HeroSection() {
  const { data: content } = usePageContent();
  return (
    <section className="relative bg-gradient-to-br from-primary to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.1\"><path d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/></g></g></svg>')", backgroundSize: "60px 60px"}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {getContentValue(content, 'hero', 'title', 'Trade Smarter with Real-Time Data')}
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {getContentValue(content, 'hero', 'subtitle', 'Access professional-grade trading tools, real-time market analytics, and expert insights. Start your journey to financial success with our advanced platform.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl font-semibold text-lg px-8 py-4"
                data-testid="button-start-trading"
              >
                {getContentValue(content, 'hero', 'button_primary', 'Start Trading Free')}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 font-semibold text-lg px-8 py-4"
                data-testid="button-watch-demo"
              >
                {getContentValue(content, 'hero', 'button_secondary', 'Watch Demo')}
              </Button>
            </div>
            <div className="mt-8 flex items-center space-x-8 text-blue-100">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                No Commission Fees
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                Real-Time Data
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern trading dashboard with financial charts" 
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300" 
            />
            
            <motion.div 
              className="absolute -top-4 -left-4 bg-white rounded-lg p-4 shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center">
                <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
                <span className="text-neutral-800 font-semibold text-sm">+$12,487</span>
              </div>
              <span className="text-neutral-600 text-xs">Today's Profit</span>
            </motion.div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                <span className="text-neutral-800 font-semibold text-sm">98.7%</span>
              </div>
              <span className="text-neutral-600 text-xs">Success Rate</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
