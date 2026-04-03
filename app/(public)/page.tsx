"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Calendar,
  Heart,
  Globe,
  ChevronRight,
  ArrowRight,
  MapPin,
  Sparkles,
  Zap,
  Layers,
} from "lucide-react";
import { motion } from "framer-motion";
import { EventsShowcase } from "@/components/home/EventsShowcase";
import { PostsShowcase } from "@/components/home/PostsShowcase";
import { GalleryShowcase } from "@/components/home/GalleryShowcase";
import { PartnersScroller } from "@/components/ui/PartnersScroller";
import { VideoSection } from "@/components/home/VideoSection";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ImpactCounters } from "@/components/home/ImpactCounters";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FocusAreasGrid } from "@/components/home/FocusAreasGrid";
import { DonationCTA } from "@/components/home/DonationCTA";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

export default function Home() {
  const { getRandomImage } = useCloudinaryPool("home");
  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  const board = [
    { name: "Ejike Asiegbu", role: "Executive Director", initial: "EA" },
    { name: "Zik Zulu Okafor", role: "Board Member", initial: "ZZ" },
    { name: "Mrs. Ogechi Asiegbu", role: "Board Member", initial: "OA" },
  ];

  return (
    <div className="bg-white overflow-hidden text-slate-900 font-sans selection:bg-amber-500/30">

      {/* ═══════════ 1. HERO ═══════════ */}
      <HeroCarousel />

      {/* ═══════════ 2. PARTNERS MARQUEE ═══════════ */}
      <PartnersScroller />

      {/* ═══════════ 3. MISSION STATEMENT ═══════════ */}
      <section className="py-14 md:py-20 overflow-hidden" id="mission">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-5">
                <span className="h-0.5 w-10 bg-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">
                  Our Purpose
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-outfit font-bold text-slate-950 leading-[1.1] mb-6">
                Creative Influence. <br />
                <span className="text-amber-600 italic font-medium underline decoration-amber-500/30 underline-offset-8">
                  Humanitarian Impact.
                </span>
              </h2>
              <div className="space-y-4 text-slate-600 font-medium leading-relaxed max-w-xl text-sm md:text-base">
                <p>
                  Actors Charity Foundation (ACF) is a sophisticated collective
                  of Nollywood&apos;s most influential voices, united by a
                  singular purpose: to harness the power of stardom for social
                  good.
                </p>
                <p>
                  We believe that the stories we tell on screen should ignite
                  tangible change in the real world. Through strategic
                  philanthropy and advocacy, we tackle critical gaps in
                  education, healthcare, and human rights across Nigeria.
                </p>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-3 pt-6 mb-8">
                {[
                  "CAC Registered",
                  "Nollywood-Backed",
                  "Community-First",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <Link
                  href="/about"
                  className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-amber-500 pb-1 flex items-center gap-2 group"
                >
                  Our Full Story{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Join Our Network
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group border border-slate-100">
                <Image
                  src={getRandomImage(2)}
                  alt="ACF humanitarian impact in action"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-400">
                      Featured
                    </span>
                  </div>
                  <p className="text-xl font-outfit font-bold">
                    Leading the Nollywood Evolution
                  </p>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-slate-100 p-5 max-w-[200px] z-10">
                <p className="text-3xl font-outfit font-black text-amber-500">
                  5K+
                </p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-1">
                  Lives Impacted
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 4. FOCUS AREAS ═══════════ */}
      <FocusAreasGrid />

      {/* ═══════════ 5. VIDEO TEASER ═══════════ */}
      <VideoSection />

      {/* ═══════════ 6. IMPACT COUNTERS ═══════════ */}
      <ImpactCounters />

      {/* ═══════════ 7. EVENTS + NEWS SHOWCASES ═══════════ */}
      <section className="bg-white">
        <EventsShowcase />
        <PostsShowcase />
      </section>

      {/* ═══════════ 8. TESTIMONIALS ═══════════ */}
      <TestimonialsSection />

      {/* ═══════════ 9. LEADERSHIP ═══════════ */}
      <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-3 block">
                Governance
              </span>
              <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950">
                Board of Directors
              </h2>
              <p className="text-slate-500 text-sm mt-3 max-w-lg leading-relaxed">
                Meet the visionary leaders who guide the Actors Charity Foundation with decades of experience in entertainment, media, and humanitarian advocacy.
              </p>
            </div>
            <Link
              href="/about/board"
              className="text-[11px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-700 flex items-center gap-2 group transition-colors"
            >
              View All Directors{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {board.map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.08 }}
                className="p-8 rounded-2xl border border-slate-200 hover:border-amber-500/50 hover:shadow-lg transition-all bg-white group text-center"
              >
                <div className="w-20 h-20 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center mb-5 text-white font-outfit text-2xl font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500">
                  {item.initial}
                </div>
                <h4 className="text-base font-bold text-slate-950 mb-1">
                  {item.name}
                </h4>
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest">
                  {item.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 10. PARTNERSHIP CALLOUT ═══════════ */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-slate-950 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />

            <div className="max-w-lg relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 block mb-3">
                Global Network
              </span>
              <h2 className="text-2xl md:text-3xl font-outfit font-bold text-white mb-4">
                Our Industry Presence
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
                ACF operates at the intersection of entertainment and
                philanthropy, mobilizing professionals from Lagos to London.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Lagos Hub", "London Network", "USA Outreach"].map((loc) => (
                  <div
                    key={loc}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/70 flex items-center gap-2"
                  >
                    <MapPin className="w-3 h-3 text-amber-500" /> {loc}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 relative z-10">
              <Link
                href="/community"
                className="px-8 py-3.5 bg-amber-500 text-slate-950 rounded-xl font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                Join Network <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 11. GALLERY ═══════════ */}
      <GalleryShowcase />

      {/* ═══════════ 12. DONATION CTA ═══════════ */}
      <DonationCTA />
    </div>
  );
}
