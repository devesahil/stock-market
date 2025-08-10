import Header from "@/components/Header";
import StockTicker from "@/components/StockTicker";
import HeroSection from "@/components/HeroSection";
import FeaturedStocks from "@/components/FeaturedStocks";
import MarketNews from "@/components/MarketNews";
import Testimonials from "@/components/Testimonials";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <StockTicker />
      <HeroSection />
      <FeaturedStocks />
      <MarketNews />
      <FeaturesSection />
      <AboutSection />
      <Testimonials />
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"%23ffffff\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"><path d=\"M20 20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8zm0-20c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z\"/></g></svg>')", backgroundSize: "40px 40px"}}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join over 500,000 traders who trust TradePro for their investment journey. Start with a free account and access professional trading tools today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl" data-testid="button-create-account">
              Create Free Account
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-primary" data-testid="button-schedule-demo">
              Schedule Demo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="text-blue-200">Active Traders</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$2.5B+</div>
              <div className="text-blue-200">Monthly Volume</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200">Uptime</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
