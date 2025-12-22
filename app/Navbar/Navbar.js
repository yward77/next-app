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
    { name: "Frequently Asked Questions", link: "/FrequentlyAskedQuestions" },
    { name: "CONTACT US", link: "/contact" },
    { name: "ABOUT", link: "/about" },
  ];

  if (!mounted) return null; 

  return (
    <>
    <div className="fixed top-0 left-0 w-full h-[35px] bg-black text-white flex justify-center items-center z-50">
  welcome to our store
</div>
    <div className="fixed top-[35px] left-0 w-full h-[80px] md:h-[100px] flex items-center justify-center px-6 bg-white duration-500 gap-[80px] md:gap-[530px] z-50">
        <img
          src="/menu.png"
          alt="Menu"
          className="w-7 md:w-10 cursor-pointer"
          onClick={() => setOpenMenu(true)}
        />
        <img src="/logo5.avif" alt="Logo" className="w-20 md:w-24" />
<h2 className="md:w-[20px] ">welcome</h2>
      </div>

      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-700"
        />
      )}

      <div
        className={`fixed top- left-0 h-full w-[200px] md:w-[340px] bg-white shadow-xl z-50 p-6 
        flex flex-col
        transform transition-transform duration-700 ease-in-out
        ${openMenu ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex justify-end">
          <span
            onClick={() => setOpenMenu(false)}
            className="text-5xl font-light cursor-pointer mr-8 mt-4 hover:scale-110 transition-transform duration-200"
          >
            ×
          </span>
        </div>

        <nav className="flex flex-col items-center gap-5 pt-11">
          {items.map((item, index) => (
            <span
              key={item.name}
              className={`
                text-sm tracking-widest font-light cursor-pointer
                opacity-0 translate-y-7
                transition-all duration-[1300ms] ease-out
                ${openMenu ? "opacity-100 translate-y-0" : ""}
              `}
              style={{ transitionDelay: `${index * 220}ms` }}
              onClick={() => {
                router.push(item.link);
                setOpenMenu(false);
              }}
            >
              {item.name}
            </span>
          ))}
        </nav>

        {/* EXIT BUTTON كما في مكانه الأصلي */}
        <div className="w-full h-[200px] flex justify-center mt-15">
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "about:blank";
              }
            }}
            className="
              md:w-[60%] py-1 md:h-[40px] w-[110px] h-[35px]
              rounded-full md:text-[20px] tracking-widest font-light
              bg-black text-white
              hover:bg-white hover:text-black hover:border-black
              border border-transparent
              transition-all duration-500
              shadow-md hover:shadow-xl
            "
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
