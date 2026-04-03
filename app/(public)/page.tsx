"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Calendar,
  Heart,
  Award,
  Globe,
  ChevronRight,
  ImageIcon,
  MessageSquare,
  ArrowRight,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { EventsShowcase } from "@/components/home/EventsShowcase";
import { PostsShowcase } from "@/components/home/PostsShowcase";
import { GalleryShowcase } from "@/components/home/GalleryShowcase";
import { PartnersScroller } from "@/components/ui/PartnersScroller";
import { VideoSection } from "@/components/home/VideoSection";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { useCloudinaryPool } from "@/hooks/useCloudinaryPool";

export default function Home() {
  const { getRandomImage } = useCloudinaryPool('home');
  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const stats = [
    { label: "Est. Year", value: "2024", icon: Calendar },
    { label: "Ambassadors", value: "50+", icon: Users },
    { label: "Impact Areas", value: "12+", icon: Layers },
    { label: "Lives Impacted", value: "5K+", icon: Heart },
  ];

  const pillars = [
    { 
      title: "The Power of Influence", 
      desc: "Leveraging the global reach of Nollywood's biggest stars to amplify the voices of the marginalized and drive systemic change.", 
      icon: Sparkles 
    },
    { 
      title: "Impact Storytelling", 
      desc: "Transforming the art of cinema into a catalyst for social justice, where every frame serves a higher humanitarian purpose.", 
      icon: Zap 
    },
    { 
      title: "Direct Intervention", 
      desc: "Beyond the screen: our ambassadors lead on-the-ground initiatives in education, healthcare, and human rights advocacy.", 
      icon: Heart 
    },
    { 
      title: "Sustainable Growth", 
      desc: "Building a future-proof ecosystem of philanthropy that empowers local communities to become self-sufficient and resilient.", 
      icon: Globe 
    },
  ];

  const board = [
    { name: "Genevieve Nnaji", role: "Board Chairperson", initial: "G" },
    { name: "Richard Mofe-Damijo", role: "Global Ambassador", initial: "R" },
    { name: "Omotola Jalade-Ekeinde", role: "Human Rights Lead", initial: "O" },
    { name: "Kunle Afolayan", role: "Creative Strategy", initial: "K" },
  ];

  return (
    <div className="bg-white overflow-hidden text-slate-900 font-sans selection:bg-gold/30">
      {/* 1. HERO SECTION */}
      <HeroCarousel />

      {/* PARTNERS SCROLLER */}
      <PartnersScroller />

      {/* 2. STATS BAR - COMPACTED */}
      <section className="relative z-20 py-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex-1 min-w-[140px] border-l border-slate-200 pl-6 first:border-0 first:pl-0">
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-outfit font-bold text-slate-800">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO TEASER - INTEGRATED */}
      <VideoSection />

      {/* 3. INTRODUCTION - REFINED & COMPACT */}
      <section className="py-10 md:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-0.5 w-8 bg-amber-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">The ACF Mission</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-outfit font-bold text-slate-950 leading-[1.1] mb-6">
                Creative Influence. <br />
                <span className="text-amber-600 italic font-medium underline decoration-amber-500/30 underline-offset-8">Humanitarian Impact.</span>
              </h2>
              <div className="space-y-4 text-slate-600 font-medium leading-relaxed max-w-xl text-sm md:text-base">
                <p>
                  Actors Charity Foundation (ACF) is a sophisticated collective of Nollywood's most influential voices, united by a singular purpose: to harness the power of stardom for social good.
                </p>
                <p>
                  We believe that the stories we tell on screen should ignite tangible change in the real world. Through strategic philanthropy and advocacy, we tackle critical gaps in education and healthcare across Nigeria.
                </p>
              </div>
              <div className="pt-8 flex items-center gap-6">
                <Link href="/about" className="text-[11px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-amber-500 pb-1 flex items-center gap-2 group">
                  Institutional History <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                  Join Our Network
                </Link>
              </div>
            </motion.div>

            <div className="relative aspect-video lg:aspect-[5/4] rounded-2xl overflow-hidden shadow-2xl group border border-slate-100">
              <Image
                src={getRandomImage(2)}
                alt="Impact Moment"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-400">Featured Update</span>
                </div>
                <p className="text-xl font-outfit font-bold">Leading the Nollywood Evolution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PILLARS - ELEGANT DENSITY */}
      <section className="py-12 bg-slate-950 text-white relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-xl mb-12">
            <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-4">Methodology for Change</h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              We leverage fame, finance, and following to create a sustainable roadmap for community empowerment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group"
              >
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-500 group-hover:text-amber-950 transition-all">
                  <pillar.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-3 font-outfit">{pillar.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DENSE GRID SHOWCASES */}
      <section className="bg-white">
        <EventsShowcase />
        <PostsShowcase />
      </section>

      {/* 6. PARTNERSHIP CALLOUT - COMPACT */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-lg">
              <h2 className="text-2xl md:text-3xl font-outfit font-bold text-slate-900 mb-4">Our Industry Presence</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                ACF operates at the intersection of entertainment and philanthropy, mobilizing professionals from Lagos to London.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-bold border border-slate-100 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-amber-600" /> Lagos Hub
                </div>
                <div className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-bold border border-slate-100 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-amber-600" /> London Network
                </div>
                <div className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-bold border border-slate-100 flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-amber-600" /> USA Outreach
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/community" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2">
                Join Network <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP - PROFESSIONAL DENSITY */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-3 block">Governance</span>
              <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-950">Ambassadors & Leadership</h2>
            </div>
            <p className="text-slate-400 text-xs font-medium italic">
              Empowered by Nollywood's most respected figures.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {board.map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl border border-slate-100 hover:border-amber-500/50 hover:shadow-lg transition-all bg-slate-50/30 group text-center"
              >
                <div className="w-14 h-14 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center mb-4 text-white font-outfit text-xl font-bold">
                  {item.initial}
                </div>
                <h4 className="text-sm font-bold text-slate-950 mb-1">{item.name}</h4>
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest">{item.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALLERY - FINAL ACCENT */}
      <GalleryShowcase />

      {/* 9. FINAL CTA - SOPHISTICATED */}
      <section className="py-12 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <Image
            src={getRandomImage(4)}
            alt="Collective Action"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-outfit font-bold leading-tight mb-8">
              Be Part of the <span className="text-amber-500 italic">Evolution.</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-10 max-w-xl mx-auto">
              Your contribution fuels our mission to bridge gaps in education and healthcare through the undeniable influence of Nollywood.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/donate" className="w-full sm:w-auto px-10 py-4 bg-amber-500 text-slate-950 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20">
                Donate Now
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-10 py-4 border border-white/20 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
