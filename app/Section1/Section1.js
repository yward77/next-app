"use client";

import { useState, useEffect, useRef } from "react";
import Marquee from "react-marquee-text";

export default function Section() {
  const images = ["/1.webp", "/2.webp"];
  const [currentImage, setCurrentImage] = useState(0);
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current && !isDown.current) {
        scrollRef.current.scrollBy({ left: 1, behavior: "auto" });
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth - 5
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 20);
    return () => clearInterval(scrollInterval);
  }, []);

  const handleMouseDown = (e) => {
    isDown.current = true;
    if (scrollRef.current) {
      scrollRef.current.classList.replace("cursor-grab", "cursor-grabbing");
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeftStart.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (scrollRef.current) scrollRef.current.classList.replace("cursor-grabbing", "cursor-grab");
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (scrollRef.current) scrollRef.current.classList.replace("cursor-grabbing", "cursor-grab");
  };

  const handleMouseMove = (e) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  return (
    <div className="w-full bg-[#030305] text-zinc-100 overflow-hidden select-none font-sans antialiased relative">
      
      {/* هالات إضاءة متحركة في الخلفية لمنح طابع دخان العطر الفاخر */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-zinc-500/5 blur-[150px] pointer-events-none mix-blend-screen" />

      {/* 1. السلايدر الرئيسي بملء الشاشة مع تأثير درامي غامق */}
      <div className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-black">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Editorial Avant-Garde"
            className={`
              absolute inset-0 w-full h-full object-cover transition-all duration-[4500ms] ease-in-out
              ${index === currentImage ? "opacity-80 scale-100 saturate-[1.1]" : "opacity-0 scale-110 blur-sm"}
            `}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-[#030305] pointer-events-none" />
        
        {/* نصوص فاخرة تطفو في المنتصف */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
          <span className="text-[10px] tracking-[0.8em] text-amber-400 font-bold uppercase mb-4 opacity-90">
            Haute Parfumerie
          </span>
          <h1 className="text-zinc-100 text-3xl md:text-7xl font-extralight tracking-[0.4em] uppercase max-w-4xl leading-tight">
          ELIXIR OF LUXURY
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-6"></div>
          <p className="text-zinc-400 text-xs md:text-sm tracking-[0.3em] font-light uppercase">
            Scented Memories, Captured Forever
          </p>
        </div>
      </div>

      {/* 2. قسم العناوين المنبثق والحديث */}
      <div className="my-36 text-center space-y-6 px-4">
        <div className="flex items-center justify-center gap-12 md:gap-24">
          <div className="group cursor-pointer">
            <h2 className="text-3xl md:text-6xl font-thin tracking-[0.3em] text-zinc-500 group-hover:text-amber-400 transition-all duration-500 uppercase">
              Woman
            </h2>
            <div className="w-0 h-[1px] bg-amber-400 mx-auto mt-2 transition-all duration-500 group-hover:w-full"></div>
          </div>
          <span className="text-xl md:text-3xl font-extralight text-zinc-800">&</span>
          <div className="group cursor-pointer">
            <h2 className="text-3xl md:text-6xl font-thin tracking-[0.3em] text-zinc-500 group-hover:text-amber-400 transition-all duration-500 uppercase">
              Men
            </h2>
            <div className="w-0 h-[1px] bg-amber-400 mx-auto mt-2 transition-all duration-500 group-hover:w-full"></div>
          </div>
        </div>
      </div>

      {/* 3. شريط المنتجات الانسيابي الفاخر جداً */}
      <div className="relative my-24 max-w-7xl mx-auto group/slider px-4">
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#030305] to-transparent z-20 pointer-events-none hidden md:block" />
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#030305] to-transparent z-20 pointer-events-none hidden md:block" />

        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto cursor-grab py-8 items-center"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {[
            "/1.1.avif", "/1.2.avif", "/1.3.avif", "/1.4.avif", 
            "/1.5.avif", "/1.6.avif", "/1.7.webp", "/1.8.webp", "/1.9.webp"
          ].map((img, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 w-64 md:w-76 transition-all duration-700 bg-gradient-to-b from-zinc-900/20 to-zinc-950/60 border border-zinc-900/30 p-4 rounded-[24px] backdrop-blur-md shadow-2xl group-hover/slider:opacity-40 hover/item:!opacity-100 hover/item:scale-[1.04] hover/item:border-amber-500/20 group/item"
            >
              <div className="overflow-hidden rounded-[18px] aspect-[3/4] relative bg-zinc-950 shadow-inner">
                <img
                  src={img}
                  alt={`Exclusive Scent ${idx}`}
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-1000 group-hover/item:scale-105"
                />
              </div>
              <div className="mt-5 space-y-1 text-center">
                <span className="text-[9px] tracking-[0.5em] text-amber-500/70 uppercase block font-medium">Limited Edition</span>
                <h4 className="text-sm font-light tracking-wide text-zinc-300">Niche Blend N°0{idx + 1}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. شريط الماركي الغامر */}
      <div className="w-full bg-[#09090e] py-14 my-32 border-y border-zinc-900/40 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#030305] before:via-transparent before:to-[#030305] before:z-10 before:pointer-events-none">
        <Marquee direction="right" speed={45}>
          <h1 className="text-zinc-600 md:text-xl text-xs font-light uppercase tracking-[0.5em] mx-12">
            Discover Luxury Fragrances <span className="text-amber-500/30 mx-4">✦</span> Exclusive Scents <span className="text-amber-500/30 mx-4">✦</span> Premium Perfumes For You
          </h1>
        </Marquee>
      </div>

      {/* 5. قسم الـ Bundles المعلق ثلاثي الأبعاد (The Glass Frame) */}
      <div className="max-w-7xl mx-auto my-36 px-6 relative h-[650px] md:h-[750px] rounded-[40px] overflow-hidden shadow-2xl group/bundle">
        <img
          src="/Bundles_1 (1).webp"
          alt="Luxury Bundles"
          className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-[4000ms] group-hover/bundle:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* كارت طائر ونصف شفاف في المنتصف المائل يساراً */}
        <div className="absolute inset-y-0 left-0 md:left-12 flex items-center z-10 px-4 md:px-0">
          <div className="bg-zinc-950/40 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[32px] max-w-xl space-y-6 shadow-[0_50px_100px_rgba(0,0,0,0.8)] transition-all duration-700 hover:border-amber-500/30">
            <span className="text-[10px] tracking-[0.6em] uppercase font-bold text-amber-400 block">
              The Collection Box
            </span>
            <h3 className="text-3xl md:text-5xl font-extralight tracking-wide text-white uppercase">
              Our <span className="font-semibold text-amber-400">Bundles</span>
            </h3>
            <p className="text-zinc-300 text-sm font-light tracking-wide leading-relaxed">
              روائع عطرية متناغمة تأتيك في مجموعات حصرية مختارة بعناية لتغمر حواسك وتمنحك هالة طاغية من الجاذبية طوال اليوم وبسعر منتقى بعناية.
            </p>
            <div className="pt-4">
              <button
                className="group/btn relative px-12 py-4 overflow-hidden rounded-xl border border-amber-500/30 text-amber-400 bg-transparent text-xs tracking-[0.4em] uppercase font-medium transition-all duration-500 hover:text-black"
                onClick={() => (window.location.href = "/shop")}
              >
                <span className="absolute inset-0 w-0 bg-amber-400 transition-all duration-500 ease-out group-hover/btn:w-full -z-10"></span>
                Shop The Set
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. شريط الماركي الثاني */}
      <div className="w-full bg-[#09090e] py-14 my-32 border-y border-zinc-900/40 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#030305] before:via-transparent before:to-[#030305] before:z-10 before:pointer-events-none">
        <Marquee direction="right" speed={45}>
          <h1 className="text-zinc-600 md:text-xl text-xs font-light uppercase tracking-[0.5em] mx-12">
            Discover Luxury Fragrances <span className="text-amber-500/30 mx-4">✦</span> Exclusive Scents <span className="text-amber-500/30 mx-4">✦</span> Premium Perfumes For You
          </h1>
        </Marquee>
      </div>

      {/* 7. بانر الأناقة الذهبي العميق (Premium Velvet Banner) */}
      <div className="w-full my-36 px-6 max-w-7xl mx-auto">
        <div className="h-60 md:h-72 flex flex-col items-center justify-center bg-gradient-to-b from-[#3a260a] to-[#120b02] text-center px-8 rounded-[40px] shadow-[0_30px_70px_rgba(0,0,0,0.7)] border border-amber-500/10 relative overflow-hidden group">
          <div className="absolute -top-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-120 transition-transform duration-1000" />
          <h2 className="text-zinc-200 text-xl md:text-4xl font-extralight tracking-[0.3em] leading-relaxed max-w-3xl z-10">
            DISCOVER ELEGANCE
            <span className="block text-[10px] font-bold tracking-[0.6em] text-amber-400/80 mt-4 uppercase">
              The Masterpiece of Premium Quality
            </span>
          </h2>
        </div>
      </div>

      {/* 8. مجموعتنا بتنسيق المجلات اللامتناظر (Asymmetric Editorial Grid) */}
      <div className="my-40 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-3">
          <h2 className="text-2xl md:text-5xl font-extralight tracking-[0.5em] uppercase text-white">
            Our Collections
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/30 mx-auto"></div>
        </div>

        {/* شبكة العرض الفنية اللامتناظرة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 items-center">
          
          {/* الكارت الأول */}
          <div className="overflow-hidden rounded-[24px] shadow-2xl bg-black border border-zinc-900 group relative aspect-[3/4]">
            <img
              src="/3.1.webp"
              alt="Artisan Collection"
              className="w-full h-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
            />
          </div>

          {/* الكارت الأوسط: يرتفع للأعلى ومميز بالحجم لإضافة لمسة فنية غير تقليدية */}
          <div className="overflow-hidden rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] bg-black border border-amber-500/20 group relative aspect-[3/4] md:-translate-y-8">
            <img
              src="/3.2.webp"
              alt="Signature Collection"
              className="w-full h-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105 opacity-95 group-hover:opacity-100"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-6">
              <span className="text-[10px] tracking-[0.4em] text-amber-400 uppercase font-medium">Most Coveted</span>
            </div>
          </div>

          {/* الكارت الثالث */}
          <div className="overflow-hidden rounded-[24px] shadow-2xl bg-black border border-zinc-900 group relative aspect-[3/4]">
            <img
              src="/3.3.webp"
              alt="Private Blend"
              className="w-full h-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
            />
          </div>

        </div>
      </div>

      <style jsx global>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-x-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  );
}