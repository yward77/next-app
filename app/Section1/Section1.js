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

  // تغيير الصورة الكبيرة تلقائيًا
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // التمرير الأفقي التلقائي للصور الصغيرة
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 2, behavior: "smooth" });
        if (
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
          scrollRef.current.scrollWidth
        ) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 20);
    return () => clearInterval(scrollInterval);
  }, []);

  // سحب بالماوس
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };
  const handleMouseLeave = () => { isDown.current = false; };
  const handleMouseUp = () => { isDown.current = false; };
  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  // أزرار التمرير
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* الصور الكبيرة */}
      <div className="relative w-full h-[500px] md:h-[100vh] overflow-hidden bg-black mt-7">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Slider"
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-[2500ms] ease-in-out
              ${index === currentImage ? "opacity-100" : "opacity-0"}
            `}
          />
        ))}
      </div>

      <br /><br />

      {/* NEW IN */}
      <div className="mt-2.5 text-center">
        <h3 className="md:text-3xl text-xl">NEW IN</h3>
        <br />
        <div className="flex justify-center gap-10 mt-2.5 mb-5">
          <h1 className="md:text-4xl text-2xl">WOMAN</h1>
          <h1 className="md:text-4xl text-2xl">&</h1>
          <h1 className="md:text-4xl text-2xl">MEN</h1>
          <br />
        </div>
      </div>

      <br />

      {/* التمرير الأفقي للصور الصغيرة */}
      <div className="relative mb-10">
      

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth cursor-grab px-4"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {[
            "/1.1.avif",
            "/1.2.avif",
            "/1.3.avif",
            "/1.4.avif",
            "/1.5.avif",
            "/1.6.avif",
            "/1.7.webp",
            "/1.8.webp",
            "/1.9.webp",
          ].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Section Image ${idx}`}
              className="flex-shrink-0 md:w-70 w-60 h-auto rounded-md"
            />
          ))}
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

      <br /><br /><br />

        <div className="w-full h-[200px] bg-[#18181f] py-4 md:mt-25 text-center flex items-center mb-3.5 justify-center">
          <Marquee direction="right" speed={100}>
            <h1 className="text-white md:text-6xl text-2xl font-bold text-center uppercase tracking-widest">
              Discover Luxury Fragrances • Exclusive Scents • Premium Perfumes For You
            </h1>
          </Marquee>
        </div>

      {/* Bundles */}
      <div className="relative w-full h-[550px] mb-10 ">
        <img
          src="/Bundles_1 (1).webp"
          alt="Bottom Image"
          className="md:w-[100%] w-[100%] md:h-[110%] h-[100%] object-cover"
        />

        <div className="ml-6 absolute bottom-4 left-4 flex flex-col items-start text-white z-10">
          <p className="uppercase tracking-wider mb-1 text-sm md:text-base">
            offers & discount
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">our bundles</h1>
          <button
            className="w-[200px] h-[40px] mb-1.5 text-[25px] border border-white text-white bg-transparent font-semibold hover:bg-white/10 flex items-center justify-center"
            onClick={() => (window.location.href = "/shop")}
          >
            shop now
          </button>
        </div>
      </div>

      {/* شريط أسفل Bundles */}\
        <div className="w-full h-[200px] bg-[#18181f] py-4 md:mt-2.5 text-center flex items-center justify-center">
          <Marquee direction="right" speed={100}>
            <h1 className="text-white md:text-6xl text-2xl font-bold text-center uppercase tracking-widest">
              Discover Luxury Fragrances • Exclusive Scents • Premium Perfumes For You
            </h1>
          </Marquee>
        </div>

      <br /><br />

      {/* اكتشف الأناقة */}
      <div className="bg-black h-[150px]">
        <div className="md:h-80 h-55 flex items-center justify-center bg-[#835a1d] gap-5">
          <h1 className="text-amber-50 text-center text-[20px] md:text-4xl font-bold gap-4">
            DICOVER ELEGANCE
            <br /><br />
            PREMIUM QUALITY
          </h1>
        </div>
      </div>

      <br /><br /><br /><br /><br />

      {/* مجموعتنا */}
      <div>
        <h1 className="md:text-4xl text-2xl text-center font-bold md:mt-30 mb-5">
          OUR COLLECTIONS
        </h1>
        <br /><br /><br />

        <div className="flex gap-10 justify-center flex-wrap">
          <img
            src="/3.1.webp"
            alt="Collections"
            className="w-[320px] md:w-[500px] animate__animated animate__fadeIn wow"
          />
          <img
            src="/3.2.webp"
            alt="Collections"
            className="w-[320px] md:w-[500px] animate__animated animate__fadeIn wow"
          />
          <img
            src="/3.3.webp"
            alt="Collections"
            className="w-[320px] md:w-[500px] animate__animated animate__fadeIn wow"
          />
        </div>
        <br /><br />
      </div>

    </>
  );
}
