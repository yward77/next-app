"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const items = [
    { name: "HOME", link: "/" },
    { name: "SHOP ALL", link: "/shop" },
    { name: "FAQ", link: "/FrequentlyAskedQuestions" },
    { name: "CONTACT US", link: "/contact" },
    { name: "ABOUT", link: "/about" },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* 1. شريط الإعلان العلوي الفاخر */}
      <div className="fixed top-0 left-0 w-full h-[35px] bg-black text-zinc-300 flex justify-center items-center z-50 text-[10px] md:text-xs tracking-[0.4em] uppercase border-b border-zinc-900/40">
        Welcome to our exclusive store
      </div>

      {/* 2. الـ Navbar الرئيسي المتجاوب والشفاف بنعومة */}
      <div className="fixed top-[35px] left-0 w-full h-[75px] md:h-[90px] flex items-center justify-between px-6 md:px-16 bg-[#030305]/90 backdrop-blur-md border-b border-zinc-900/50 z-50 transition-all duration-300">
        
        {/* زر القائمة المطور */}
        <button 
          onClick={() => setOpenMenu(true)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-zinc-900/50 transition-colors duration-300 group focus:outline-none"
        >
          <img
            src="/menu.png"
            alt="Menu"
            className="w-5 md:w-6 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          />
        </button>

        {/* الشعار المركزي */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <img src="/logo5.avif" alt="Logo" className="w-16 md:w-20 object-contain brightness-110" />
        </div>

        {/* نص الترحيب الراقي */}
        <h2 className="text-[10px] md:text-xs font-light tracking-[0.3em] uppercase text-amber-400/80 hidden sm:block">
          Welcome
        </h2>
      </div>

      {/* 3. الطبقة الخلفية المعتمة والضبابية عند فتح القائمة */}
      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-md transition-opacity duration-500 ease-in-out"
        />
      )}

      {/* 4. الـ Sidebar الزجاجي المستقبلي (Luxury Glass Drawer) */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] md:w-[380px] bg-zinc-950/70 border-r border-zinc-900/80 backdrop-blur-2xl shadow-[50px_0_100px_rgba(0,0,0,0.9)] z-50 p-8 flex flex-col justify-between transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)
        ${openMenu ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div>
          {/* زر الإغلاق الأنيق (X) */}
          <div className="flex justify-end">
            <button
              onClick={() => setOpenMenu(false)}
              className="text-3xl md:text-4xl font-extralight text-zinc-500 hover:text-white transition-colors duration-300 focus:outline-none"
            >
              ×
            </button>
          </div>

          {/* روابط التنقل الاحترافية */}
          <nav className="flex flex-col gap-8 pt-16 pl-4">
            {items.map((item, index) => (
              <div
                key={item.name}
                className={`transform transition-all duration-[1000ms] ease-out flex flex-col items-start relative group
                  ${openMenu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span
                  className="text-xs md:text-sm tracking-[0.3em] font-light text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer uppercase py-1"
                  onClick={() => {
                    router.push(item.link);
                    setOpenMenu(false);
                  }}
                >
                  {item.name}
                </span>
                {/* خط سفلي متحرك ناعم لكل رابط عند الـ Hover */}
                <span className="w-0 h-[1px] bg-gradient-to-r from-amber-500/60 to-transparent transition-all duration-500 group-hover:w-3/4 mt-1" />
              </div>
            ))}
          </nav>
        </div>

        {/* 5. زر تسجيل الخروج الزجاجي المتفاعل في الأسفل */}
        <div className="w-full flex justify-center pb-8">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "about:blank";
              }
            }}
            className="w-full py-3.5 rounded-xl text-[10px] md:text-xs tracking-[0.4em] uppercase font-light bg-zinc-900/40 text-zinc-400 border border-zinc-800/60 backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all duration-500 shadow-xl hover:shadow-white/5 active:scale-95"
          >
            Log out
          </button>
        </div>

      </div>
    </>
  );
}