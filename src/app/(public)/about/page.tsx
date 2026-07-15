"use client";

import { motion } from "motion/react";
import { Sparkles, Users, Target, Rocket } from "lucide-react";
import Container from "@/components/shared/container/Container";
import TopBar from "@/components/shared/topBar/TopBar";
import Navbar from "@/components/shared/navbar/Navbar";
import FooterSection from "@/components/shared/footer/FooterSection";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";

const features = [
  {
    icon: Sparkles,
    title: "Modern UI",
    desc: "Clean, minimal & scalable UI built with ReUI + Tailwind",
  },
  {
    icon: Users,
    title: "User Focused",
    desc: "UX-first design that feels smooth on every device",
  },
  {
    icon: Target,
    title: "Goal Driven",
    desc: "Every component is crafted with purpose & performance",
  },
  {
    icon: Rocket,
    title: "Fast & Animated",
    desc: "Motion powered micro‑animations for premium feel",
  },
];

export default function AboutPage() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <Container>
        <section className="relative overflow-hidden bg-background py-24">
          {/* Background Glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="container mx-auto px-4">
            {/* Header */}
            <AnimationContainer
              variant="fade-up"
              className="mx-auto max-w-3xl text-center"
            >
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                About Us
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Building Experiences,
                <span className="text-teal-600"> Not Just Websites</span>
              </h1>
              <p className="mt-6 text-muted-foreground">
                We design and develop modern web experiences using Next.js, ReUI
                and motion‑driven interactions that users love.
              </p>
            </AnimationContainer>

            {/* Feature Grid */}
            <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((item, i) => (
                <AnimationContainer
                  key={i}
                  variant="fade-up"
                  className="group relative rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </AnimationContainer>
              ))}
            </div>

            {/* CTA Section */}
            <AnimationContainer
              variant="fade-up"
              className="mt-28 rounded-3xl bg-teal-600 p-10 text-center text-primary-foreground md:p-16"
            >
              <h2 className="text-3xl font-bold md:text-4xl">
                Let’s Build Something Amazing
              </h2>
              <p className="mx-auto mt-4 max-w-xl opacity-90">
                Ready to level up your product with a modern, animated and
                conversion‑focused design?
              </p>
              <button className="mt-8 rounded-xl bg-background px-8 py-3 font-medium text-primary transition hover:scale-105">
                Contact Us
              </button>
            </AnimationContainer>
          </div>
        </section>
      </Container>
      <FooterSection />
    </div>
  );
}
