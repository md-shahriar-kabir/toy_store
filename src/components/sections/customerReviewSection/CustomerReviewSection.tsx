"use client";

import { Star, Quote } from "lucide-react";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";

const reviews = [
  {
    name: "Shahriar Kabir",
    role: "Verified Customer",
    rating: 5,
    review:
      "Amazing product quality and super fast delivery. The UI of this store feels very premium and smooth!",
  },
  {
    name: "Farial Robama",
    role: "Regular Buyer",
    rating: 4,
    review:
      "Customer support was very helpful. The checkout process was simple and clean.",
  },
  {
    name: "Karim Uddin",
    role: "First Time Customer",
    rating: 5,
    review:
      "Loved the overall experience. Everything feels modern and easy to use.",
  },
];

export default function CustomerReviewSection() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <AnimationContainer variant="fade-up" className="text-center">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="mt-3 text-muted-foreground">
            Real feedback from customers who trust our platform
          </p>
        </AnimationContainer>

        {/* Reviews Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item, i) => (
            <AnimationContainer key={i} variant="fade-up">
              <div className="relative h-full rounded-2xl border bg-card p-6 shadow-sm">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/10" />

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.review}
                </p>

                {/* User Info */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {item.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </div>
            </AnimationContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
