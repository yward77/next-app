"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles, MoveRight } from "lucide-react";

export default function UltimateShowcase() {
  // --- States for Animations & Interactions ---
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef(null);

  // --- 1. Custom Smooth Cursor Logic ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    
    // Cinematic entrance
    setTimeout(() => setIsLoaded(true), 100);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Cursor Physics (Lerp for smooth trailing)
  useEffect(() => {
    let animationFrameId;
    const renderCursor = () => {
      setCursorPos((prev) => {
        const ease = 0.15; // Smoothness factor
        return {
          x: prev.x + (mousePos.x - prev.x) * ease,
          y: prev.y + (mousePos.y - prev.y) * ease,
        };
      });
      animationFrameId = requestAnimationFrame(renderCursor);
    };
    renderCursor();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // --- 2. 3D Card Tilt Math ---
  const handleCardMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15; // Max 15 deg tilt
    const rotateY = ((x - centerX) / centerX) * 15;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleCardLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 }); // Reset with spring-like feel in CSS
  };

  return (
    // "cursor-none" hides default cursor to use our custom one
    <div className="relative min-h-screen bg-[#030303] text-white overflow-hidden cursor-none selection:bg-white selection:text-black font-sans">
      
      {/* --- Custom Cursor --- */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[999] mix-blend-difference flex items-center justify-center backdrop-blur-sm"
        style={{ transform: `translate3d(${cursorPos.x - 16}px, ${cursorPos.y - 16}px, 0)` }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </div>

      {/* --- Ambient Background --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-gradient-to-tr from-zinc-800 to-zinc-900 rounded-full blur-[120px] opacity-20 animate-pulse pointer-events-none" />

      {/* --- Header / Nav --- */}
      <nav className={`fixed top-0 w-full p-8 md:px-16 flex justify-between items-center z-50 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="text-sm font-black tracking-[0.3em] uppercase">SIWA<span className="text-zinc-500">.</span></div>
        <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
          <span className="hover:text-white transition-colors">Catalog</span>
          <span className="hover:text-white transition-colors">Vision</span>
        </div>
        <div className="text-[10px] font-black tracking-[0.2em] uppercase border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
          Menu
        </div>
      </nav>

      {/* --- Main Cinematic Layout --- */}
      <main className="relative h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 max-w-[1800px] mx-auto">
        
        {/* Left Typography Block */}
        <div className="w-full md:w-1/2 z-10 flex flex-col justify-center mt-20 md:mt-0">
          <div className="overflow-hidden mb-6">
            <div className={`flex items-center gap-3 text-xs font-black uppercase tracking-[0.4em] text-zinc-400 transition-transform duration-1000 delay-500 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`}>
              <Sparkles className="w-4 h-4 text-white" /> Pure Aesthetics
            </div>
          </div>
          
          <div className="overflow-hidden">
            <h1 className={`text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) delay-700 ${isLoaded ? 'translate-y-0' : 'translate-y-full'}`}>
              Digital<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>Perfection</span>
            </h1>
          </div>

          <div className={`mt-10 max-w-sm transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-zinc-400 text-xs leading-relaxed uppercase tracking-widest font-bold mb-10">
              Crafting experiences that transcend the screen. Engineered with precision, designed for impact.
            </p>
            
            {/* Magnetic Button Simulation */}
            <button className="group relative px-8 py-5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden">
              <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10 flex items-center gap-4">
                Explore The Drop <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Right 3D Interaction Block */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center relative perspective-[1000px] mt-10 md:mt-0">
          
          {/* Subtle Developer Signature */}
          <div className={`absolute right-0 bottom-10 origin-bottom-right -rotate-90 text-[8px] font-black uppercase tracking-[0.5em] text-zinc-600 transition-opacity duration-1000 delay-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Engineered by Infinity Code
          </div>

          {/* 3D Card Container */}
          <div 
            ref={cardRef}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            className={`relative w-[80%] max-w-[450px] aspect-[3/4] transition-all duration-1000 ease-out delay-[800ms] ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-20'}`}
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: "preserve-3d",
              transition: tilt.rotateX === 0 && tilt.rotateY === 0 ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)" : "none" // Smooth reset
            }}
          >
            {/* The Physical Card */}
            <div className="absolute inset-0 rounded-3xl bg-zinc-900 overflow-hidden shadow-2xl border border-white/10" style={{ transform: "translateZ(0px)" }}>
              <img 
                src="https://images.unsplash.com/photo-1615397323234-7a4214227fb3?q=80&w=2070&auto=format&fit=crop" 
                alt="Product" 
                className="w-full h-full object-cover opacity-80"
              />
              
              {/* Dynamic Glare Effect mapping to mouse position */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`,
                }}
              />
            </div>

            {/* Floating Elements (parallax within the 3D card) */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none" style={{ transform: "translateZ(60px)" }}>
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">Noir Essence</h3>
                <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">Limited Run · 2026</p>
              </div>
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Massive Background Typography */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full overflow-hidden pointer-events-none -z-10 mix-blend-overlay opacity-10">
        <h1 className="text-[30vw] font-black uppercase whitespace-nowrap text-center leading-none">
          CRAFTED
        </h1>
      </div>
    </div>
  );
}