import { usePageContent } from "@/hooks/usePageContent";
import { getContentValue } from "@/utils/contentHelpers";

export default function AboutSection() {
  const { data: content } = usePageContent();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
              {getContentValue(content, 'about', 'title', 'About Our Platform')}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              {getContentValue(content, 'about', 'content', 'We provide cutting-edge financial technology that empowers investors to make data-driven decisions. Our platform combines real-time market data with advanced analytics to give you the edge you need in today\'s fast-paced markets.')}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500K+</div>
                <div className="text-neutral-600">Active Traders</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">$2.5B+</div>
                <div className="text-neutral-600">Monthly Volume</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src={getContentValue(content, 'about', 'image', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')} 
              alt={getContentValue(content, 'about', 'image_alt', 'About section image showing financial charts')} 
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 