"use client";
import Marquee from "react-fast-marquee";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Sparkles, Zap } from "lucide-react";

export default function About() {
  const targets = [10, 50000, 100];
  const [numbers, setNumbers] = useState([0, 0, 0]);
  const sectionRef = useRef(null);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  useEffect(() => {
    if (!startCounting) return;
    const intervals = targets.map((target, idx) => {
      return setInterval(() => {
        setNumbers((prev) => {
          const nextNumbers = [...prev];
          if (nextNumbers[idx] < target) {
            const increment = Math.ceil(target / 40);
            nextNumbers[idx] = Math.min(nextNumbers[idx] + increment, target);
          }
          return nextNumbers;
        });
      }, 40);
    });
    return () => intervals.forEach(clearInterval);
  }, [startCounting]);

  return (
    <div className="bg-[#030305] text-zinc-300 min-h-screen selection:bg-amber-500 selection:text-black font-sans">
      
      {/* Hero Image Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img src="/2.webp" className="w-full h-full object-cover opacity-60 scale-105" alt="Elixir Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/40 to-transparent" />
        <div className="absolute bottom-10 left-0 w-full text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-white uppercase"
            >
              Our <span className="text-zinc-500 italic">Legacy</span>
            </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-amber-500/30" />
        
        <div className="text-center space-y-8 mb-20">
          <span className="text-[10px] tracking-[0.5em] text-amber-500 font-bold uppercase">About Elixir Studio</span>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-200">
            ELIXIR Fragrances is an esteemed Egyptian maison, weaving heritage and identity into every bottle. 
            We exist to elevate your daily ritual with scents that are a personal signature.
          </p>
          <p className="text-zinc-500 leading-relaxed font-light">
            Our pledge is to redefine luxury, making it authentically Egyptian and accessible. 
            By fusing masterful craftsmanship with exceptional value, we prove local quality rivals the world's best.
          </p>
        </div>

        {/* Feature List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-zinc-900">
           {[
             { icon: <Sparkles className="w-4 h-4 text-amber-500" />, text: "Exquisite Ingredients" },
             { icon: <Zap className="w-4 h-4 text-amber-500" />, text: "Inclusive Pricing" },
             { icon: <Award className="w-4 h-4 text-amber-500" />, text: "Personalized Service" }
           ].map((item, i) => (
             <div key={i} className="flex items-center justify-center gap-3 bg-zinc-900/20 p-4 rounded-2xl border border-zinc-800/50">
               {item.icon}
               <span className="text-[10px] font-bold uppercase tracking-widest">{item.text}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Marquee Section */}
      <div className="w-full bg-[#08080a] border-y border-zinc-900 py-10 overflow-hidden">
        <Marquee direction="right" speed={80} gradient={false}>
          <h2 className="text-zinc-800 text-4xl md:text-7xl font-black uppercase tracking-tighter mx-10 opacity-40">
            Discover Luxury Fragrances • Exclusive Scents • Premium Perfumes For You • 
          </h2>
        </Marquee>
      </div>

      {/* Philosophy Grid */}
      <div className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { img: "/9.1.jpg", title: "Authentic Craftsmanship", desc: "Hand-crafted techniques inspired by heritage." },
            { img: "/9.2.jpg", title: "Premium Ingredients", desc: "World-class scents for long-lasting aroma." },
            { img: "/9.3.jpg", title: "Modern Aesthetic", desc: "Designed to look beautiful in every setting." }
          ].map((card, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group bg-zinc-900/10 border border-zinc-900 rounded-[2.5rem] p-4 transition-all hover:border-amber-500/20"
            >
              <div className="h-72 w-full rounded-[2rem] overflow-hidden mb-6">
                <img src={card.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
              </div>
              <div className="px-4 pb-4">
                <h3 className="font-light text-zinc-100 uppercase tracking-widest text-sm mb-2">{card.title}</h3>
                <p className="text-zinc-600 text-xs font-light leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Journey Section */}
      <div className="max-w-6xl mx-auto py-24 px-6 border-t border-zinc-900/50">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-amber-500/5 rounded-3xl blur-2xl group-hover:bg-amber-500/10 transition-all" />
            <img src="/About_Us.webp" className="relative rounded-2xl w-full h-[450px] object-cover border border-zinc-800 shadow-2xl" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-extralight tracking-[0.2em] uppercase text-zinc-100">A Journey Through <span className="text-amber-500 italic font-normal">Scent</span></h2>
            <p className="text-zinc-400 font-light leading-loose">
              Every fragrance tells a story—crafted with passion and inspired by the heart of Egyptian roots. 
              Our perfumes blend modern luxury with cultural authenticity, ensuring each spray is a moment of pure art.
            </p>
            <div className="h-[1px] w-20 bg-amber-500/50" />
          </div>
        </div>
      </div>

      {/* Statistics Section (The Counter) */}
      <div ref={sectionRef} className="bg-zinc-950 py-32 px-6 border-t border-zinc-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-extralight uppercase tracking-[0.4em] text-zinc-100 mb-4">Why Choose Us?</h2>
            <p className="max-w-xl mx-auto text-zinc-500 text-xs font-light uppercase tracking-widest leading-relaxed">
              Excellence is not an act, but a habit we cultivate in every bottle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="space-y-2">
              <h3 className="text-6xl font-light tracking-tighter text-amber-500">{numbers[0]}+</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">Years of Experience</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-6xl font-light tracking-tighter text-amber-500">{numbers[1].toLocaleString()}+</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">Happy Customers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-6xl font-light tracking-tighter text-amber-500">{numbers[2]}%</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-600">Premium Quality</p>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-zinc-900/50 flex flex-col items-center">
            <ShieldCheck className="w-8 h-8 text-zinc-800 mb-4" />
            <span className="text-[9px] uppercase tracking-[0.5em] text-zinc-700 font-bold">Encrypted & Certified Authentic</span>
        </div>
      </div>
    </div>
  );
}