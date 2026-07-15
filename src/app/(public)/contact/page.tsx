"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import TopBar from "@/components/shared/topBar/TopBar";
import Navbar from "@/components/shared/navbar/Navbar";
import FooterSection from "@/components/shared/footer/FooterSection";
import Container from "@/components/shared/container/Container";
import AnimationContainer from "@/components/shared/animationContainer/AnimationContainer";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@yourdomain.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1XXX-XXXXXX",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
  },
];

export default function ContactPage() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <Container>
        <section className="relative overflow-hidden bg-background py-24">
          {/* Background Glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute right-1/2 top-20 h-96 w-96 translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="container mx-auto px-4">
            {/* Header */}
            <AnimationContainer
              variant="fade-up"
              className="mx-auto max-w-3xl text-center"
            >
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm text-primary">
                Contact
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Let’s Talk &
                <span className="text-teal-600"> Build Together</span>
              </h1>
              <p className="mt-6 text-muted-foreground">
                Have a project in mind or just want to say hello? We’d love to
                hear from you.
              </p>
            </AnimationContainer>

            {/* Content */}
            <div className="mt-20 grid gap-12 lg:grid-cols-2">
              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <AnimationContainer
                    key={item.title}
                    variant="fade-left"
                    className="flex items-center gap-4 rounded-2xl border bg-card p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.title}
                      </p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </AnimationContainer>
                ))}
              </div>

              {/* Contact Form */}
              <AnimationContainer
                variant="fade-right"
                className="rounded-3xl border bg-card p-8 shadow-sm"
              >
                <div className="grid gap-6">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project"
                      className="mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-medium text-primary-foreground transition hover:scale-105"
                  >
                    Send Message <Send className="h-4 w-4" />
                  </button>
                </div>
              </AnimationContainer>
            </div>
          </div>
        </section>
      </Container>
      <FooterSection />
    </div>
  );
}
