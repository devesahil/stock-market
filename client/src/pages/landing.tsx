import Header from "@/components/Header";
import StockTicker from "@/components/StockTicker";
import HeroSection from "@/components/HeroSection";
import FeaturedStocks from "@/components/FeaturedStocks";
import MarketNews from "@/components/MarketNews";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <StockTicker />
      <HeroSection />
      <FeaturedStocks />
      <MarketNews />
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">Why Choose TradePro?</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Professional trading tools designed for serious investors</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Lightning Fast Execution</h3>
              <p className="text-neutral-600 leading-relaxed">Execute trades in milliseconds with our advanced technology infrastructure and direct market access.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Advanced Analytics</h3>
              <p className="text-neutral-600 leading-relaxed">Make informed decisions with comprehensive charts, technical indicators, and market analysis tools.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Bank-Level Security</h3>
              <p className="text-neutral-600 leading-relaxed">Your investments are protected with 256-bit encryption and two-factor authentication.</p>
            </div>
          </div>
        </div>
      </section>
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
