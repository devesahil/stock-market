import { useTestimonials } from "@/hooks/useTestimonials";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials();

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">What Our Traders Say</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Join thousands of successful traders who trust TradePro</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-50 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Skeleton key={star} className="w-5 h-5 mr-1" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-6" />
                <div className="flex items-center">
                  <Skeleton className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials?.length) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">What Our Traders Say</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Join thousands of successful traders who trust TradePro</p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-neutral-600">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">What Our Traders Say</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">Join thousands of successful traders who trust TradePro</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-neutral-50 rounded-2xl p-8 hover:bg-neutral-100 transition-colors duration-300"
              data-testid={`testimonial-${testimonial.id}`}
            >
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= testimonial.rating ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
              </div>
              <blockquote className="text-neutral-700 mb-6 leading-relaxed" data-testid={`testimonial-content-${testimonial.id}`}>
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                {testimonial.avatarUrl ? (
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4" 
                    data-testid={`testimonial-avatar-${testimonial.id}`}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-semibold text-neutral-900" data-testid={`testimonial-name-${testimonial.id}`}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-neutral-600" data-testid={`testimonial-role-${testimonial.id}`}>
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
