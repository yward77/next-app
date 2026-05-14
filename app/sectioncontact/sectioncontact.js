"use client";

import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Marquee from "react-fast-marquee";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formspree.io/f/mldvydgy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("Message sent successfully! ✦");
        setType("success");
        e.target.reset();
      } else {
        setStatus("Failed to send message.");
        setType("error");
      }
    } catch (error) {
      setStatus("Error sending message.");
      setType("error");
    }
  };

  return (
    <div className="w-full bg-[#030305] text-zinc-200 min-h-screen overflow-hidden select-none font-sans antialiased relative pt-[110px]">
      
      {/* هالة ضوئية خلفية تمنح الفورم طابعاً سينمائياً */}
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* 1. الصورة الرئيسية العلوية المعدلة المسار */}
      <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden bg-black">
        <img 
          src="/bundles.webp" 
          alt="Contact Luxury Banner" 
          className="w-full h-full object-cover opacity-60 transition-transform duration-[4000ms] hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030305]" />
      </div>

      <div className="max-w-5xl mx-auto p-6 mb-20 relative z-10">
        
        {/* 2. العناوين الرئيسية */}
        <div className="text-center space-y-4 my-12">
          <span className="text-[10px] tracking-[0.6em] text-amber-500/80 font-bold uppercase block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] uppercase text-zinc-100">
            Contact Us
          </h1>
          <div className="w-12 h-[1px] bg-amber-500/30 mx-auto mt-4"></div>
        </div>

        {/* 3. نصوص تفاصيل التواصل المعمارية الفاخرة */}
        <div className="text-zinc-400 max-w-2xl mx-auto space-y-4 text-center font-light text-sm md:text-base leading-relaxed tracking-wide">
          <p>Our dedicated concierge team is at your service Monday to Friday, 9 AM to 6 PM.</p>
          <p>We craft each response with care and aim to reply to your inquiry within 24 hours.</p>
          <p>For immediate assistance regarding private orders, you may reach our boutique directly via phone.</p>
        </div>

        {/* 4. شريط الـ Marquee المطور بالثيم المظلم */}
        <div className="w-full my-24 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#030305] before:via-transparent before:to-[#030305] before:z-10 before:pointer-events-none">
          <Marquee gradient={false} speed={40}>
            {["/1.1.avif", "/1.2.avif", "/1.3.avif", "/1.4.avif"].map((img, idx) => (
              <div key={idx} className="mx-6 overflow-hidden rounded-2xl border border-zinc-900 bg-black aspect-square w-[180px] md:w-[260px] shadow-2xl opacity-70 hover:opacity-100 transition-opacity duration-500">
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </Marquee>
        </div>

        {/* 5. أيقونات التواصل الاجتماعي المشعة بنعومة */}
        <div className="flex justify-center gap-10 my-16 text-3xl md:text-4xl">
          <FaFacebookF className="text-zinc-600 cursor-pointer hover:text-amber-400 hover:scale-110 transition-all duration-300" />
          <FaTwitter className="text-zinc-600 cursor-pointer hover:text-amber-400 hover:scale-110 transition-all duration-300" />
          <FaInstagram className="text-zinc-600 cursor-pointer hover:text-amber-400 hover:scale-110 transition-all duration-300" />
        </div>

        {/* 6. كارت معلومات الاتصال الزجاجي */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-950/40 border border-zinc-900/60 p-8 rounded-3xl backdrop-blur-md my-16 text-zinc-300 text-sm md:text-base shadow-2xl tracking-wide max-w-4xl mx-auto">
          <div className="flex items-center gap-4 py-3 justify-center md:justify-start">
            <FaEnvelope className="text-amber-500/70 text-lg flex-shrink-0" /> 
            <span className="font-light">elixir@gmail.com</span>
          </div>
          <div className="flex items-center gap-4 py-3 justify-center md:justify-start border-y md:border-y-0 md:border-x border-zinc-900/80 px-0 md:px-6">
            <FaPhone className="text-amber-500/70 text-lg flex-shrink-0" /> 
            <span className="font-light" dir="ltr">+20 0115 458265</span>
          </div>
          <div className="flex items-center gap-4 py-3 justify-center md:justify-start">
            <FaMapMarkerAlt className="text-amber-500/70 text-lg flex-shrink-0" /> 
            <span className="font-light text-center md:text-left">Abas Al Aqad Street, Cairo, Egypt</span>
          </div>
        </div>
 
        {/* 7. فورم المراسلة الزجاجي المتطور (Ultra-Luxury Glass Form) */}
        <div className="max-w-xl mx-auto mt-24">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-gradient-to-b from-zinc-900/30 to-zinc-950/60 border border-zinc-900/80 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
            
            <div className="space-y-1 mb-4">
              <h3 className="text-xl font-light text-zinc-100 uppercase tracking-widest">Send a Message</h3>
              <p className="text-xs text-zinc-500 font-light">We will review your letter and reach back shortly.</p>
            </div>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full bg-[#09090e]/60 text-zinc-100 border border-zinc-900 p-4 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors text-sm font-light tracking-wide placeholder-zinc-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full bg-[#09090e]/60 text-zinc-100 border border-zinc-900 p-4 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors text-sm font-light tracking-wide placeholder-zinc-600"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="w-full bg-[#09090e]/60 text-zinc-100 border border-zinc-900 p-4 rounded-xl focus:outline-none focus:border-amber-500/50 transition-colors text-sm font-light tracking-wide placeholder-zinc-600 h-40 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full py-4 mt-2 text-xs tracking-[0.4em] uppercase font-medium border border-amber-500/30 text-amber-400 bg-amber-950/10 rounded-xl hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-500 shadow-xl shadow-amber-950/20 active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>

          {/* رسائل الحالة الإشعارية الفاخرة */}
          {status && (
            <div
              className={`mt-6 p-4 rounded-xl text-sm tracking-widest font-light shadow-2xl text-center backdrop-blur-md border animate-fade-in ${
                type === "success" 
                  ? "bg-emerald-950/30 text-emerald-400 border-emerald-500/20" 
                  : "bg-rose-950/30 text-rose-400 border-rose-500/20"
              }`}
            >
              {status}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}