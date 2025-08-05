import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";

export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
}
