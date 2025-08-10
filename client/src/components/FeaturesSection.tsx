import { usePageContent } from "@/hooks/usePageContent";
import { getContentValue } from "@/utils/contentHelpers";

export default function FeaturesSection() {
  const { data: content } = usePageContent();

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            {getContentValue(content, 'features', 'title', 'Why Choose TradePro?')}
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {getContentValue(content, 'features', 'subtitle', 'Professional trading tools designed for serious investors')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              {getContentValue(content, 'features', 'feature_1_title', 'Lightning Fast Execution')}
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              {getContentValue(content, 'features', 'feature_1_description', 'Execute trades in milliseconds with our advanced technology infrastructure and direct market access.')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              {getContentValue(content, 'features', 'feature_2_title', 'Advanced Analytics')}
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              {getContentValue(content, 'features', 'feature_2_description', 'Make informed decisions with comprehensive charts, technical indicators, and market analysis tools.')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">
              {getContentValue(content, 'features', 'feature_3_title', 'Bank-Level Security')}
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              {getContentValue(content, 'features', 'feature_3_description', 'Your investments are protected with 256-bit encryption and two-factor authentication.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 