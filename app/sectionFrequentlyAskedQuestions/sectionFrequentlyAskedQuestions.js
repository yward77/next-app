"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Star, Rocket, Trophy, PhoneCall, ShieldCheck } from "lucide-react";

// البيانات
const faqs = [
  { question: "What are your working hours?", answer: "Our boutique is open from 9 AM to 8 PM every day, providing personalized scent consultations." },
  { question: "Where are you located?", answer: "You can find our flagship store at 123 Luxury Street, Damascus, Syria." },
  { question: "How can I contact support?", answer: "Our concierge team is available at +963 12345678 or via email at support@elixir.com." },
  { question: "Do you offer delivery?", answer: "Yes, we offer complimentary premium delivery for all orders within 24 hours." },
];

const testimonials = [
  { name: "Ali Ahmed", comment: "The most sophisticated shopping experience. The scents are truly eternal.", rating: 5 },
  { name: "Sara K.", comment: "Exquisite packaging and very professional support team. Highly recommended!", rating: 5 },
  { name: "Omar J.", comment: "Fast delivery and the quality of the perfumes is unmatched in the region.", rating: 4 },
];

const services = [
  { title: "Fast Delivery", desc: "Receive your elixir in record time with our premium courier.", icon: <Rocket className="w-8 h-8" /> },
  { title: "Quality Guarenteed", desc: "Only the finest original ingredients for our customers.", icon: <Trophy className="w-8 h-8" /> },
  { title: "24/7 Concierge", desc: "Our fragrance experts are always here to guide you.", icon: <PhoneCall className="w-8 h-8" /> },
];

const statsData = [
  { label: "Orders Delivered", value: 1500, suffix: "+" },
  { label: "Happy Customers", value: 1200, suffix: "+" },
  { label: "Awards Won", value: 15, suffix: "" },
];

export default function SectionInfo() {
  const [openIndex, setOpenIndex] = useState(null);
  const [counts, setCounts] = useState(statsData.map(() => 0));

  // تأثير العداد التصاعدي
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, idx) =>
          c < statsData[idx].value
            ? Math.min(c + Math.ceil(statsData[idx].value / 50), statsData[idx].value)
            : statsData[idx].value
        )
      );
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#030305] text-zinc-300 min-h-screen pt-20 overflow-hidden relative font-sans selection:bg-amber-400 selection:text-black">
      
      {/* توهج خلفي ديكوري */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* الهيدر الرئيسي */}
      <div className="relative py-24 px-6 text-center">
        <motion.span 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-[10px] tracking-[0.5em] text-amber-500 font-bold uppercase block mb-4"
        >
          Established 2024
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-extralight tracking-[0.2em] text-zinc-100 uppercase"
        >
          THE WORLD OF <span className="text-zinc-600 italic">ELIXIR</span>
        </motion.h1>
      </div>

      {/* الإحصائيات - شريط طائر */}
      <div className="max-w-6xl mx-auto px-6 mb-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-zinc-900/20 border border-zinc-800/50 backdrop-blur-md rounded-[3rem] p-10 shadow-2xl">
          {statsData.map((stat, idx) => (
            <motion.div key={idx} className="text-center space-y-2">
              <h3 className="text-5xl font-light tracking-tighter text-amber-500">
                {counts[idx]}{stat.suffix}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* الأسئلة الشائعة */}
      <div className="max-w-3xl mx-auto py-32 px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-extralight uppercase tracking-[0.4em] text-zinc-100 italic">Common <span className="text-zinc-600">Inquiries</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-zinc-900 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full py-8 text-left group"
              >
                <span className={`text-xs uppercase tracking-[0.2em] transition-colors ${openIndex === index ? 'text-amber-500' : 'text-zinc-400 group-hover:text-zinc-100'}`}>
                    {faq.question}
                </span>
                {openIndex === index ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4 text-zinc-600" />}
              </button>
              <motion.div 
                initial={false}
                animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="pb-8 text-sm text-zinc-500 font-light leading-relaxed max-w-2xl uppercase tracking-wider text-[11px]">
                  {faq.answer}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      {/* قسم الفلسفة (الخدمات) مع الخط المتوهج */}
      <div className="max-w-6xl mx-auto px-6 py-24 border-t border-zinc-900/50">
        
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-extralight uppercase tracking-[0.5em] text-zinc-100 mb-6"
          >
            Our <span className="text-zinc-600">Philosophy</span>
          </motion.h2>
          
          {/* الخط المتوهج */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "80px", opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="relative h-[1px]"
          >
            <div className="absolute inset-0 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
            <div className="absolute inset-0 bg-amber-500 blur-[4px] opacity-50" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {services.map((s, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-10 bg-zinc-900/10 border border-zinc-900/50 rounded-[2.5rem] hover:border-amber-500/30 transition-all duration-500 text-center group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 text-amber-500 mb-8 flex justify-center group-hover:scale-110 transition-transform duration-700">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-900">{s.icon}</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-200 mb-4 group-hover:text-amber-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-light uppercase tracking-wider">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* آراء العملاء */}
      <div className="bg-zinc-950/50 py-32 border-y border-zinc-900/50">
        <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-center text-xl font-extralight uppercase tracking-[0.5em] text-zinc-500 mb-20">Voices of Excellence</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t, idx) => (
                <div key={idx} className="space-y-6">
                    <div className="flex gap-1">
                        {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />)}
                    </div>
                    <p className="text-lg font-light italic text-zinc-300 leading-relaxed">"{t.comment}"</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-zinc-900">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-amber-500">{t.name[0]}</div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">{t.name}</span>
                    </div>
                </div>
            ))}
            </div>
        </div>
      </div>


      {/* تذييل الصفحة البسيط */}
      <div className="py-20 text-center border-t border-zinc-900">
         <ShieldCheck className="w-10 h-10 text-zinc-800 mx-auto mb-4" />
         <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-600 font-bold">Secure Shopping & Authentic Fragrances</p>
      </div>

    </div>
  );
}