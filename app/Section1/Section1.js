
"use client";

import { useState, useEffect, useRef } from "react";


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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // وظائف السحب بالماوس
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  // وظائف أزرار التمرير
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
    <br></br>
    <br></br>
    <br></br>

      <div className="w-full">
        <img
          src={images[currentImage]}
          alt="Section Image"
          className="w-full h-[500px] object-cover md:hidden"
        />
        <img
          src={images[currentImage]}
          alt="Section Image"
          className="hidden md:block w-full h-[100vh] object-cover"
        />
      </div>
      <br />
      <br />
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
      <div className="relative mb-10">
   
        <button
          onClick={scrollLeft}
          className="hidden  w-[50px] h-[50px] md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
        >
          &#8592;
        </button>
        <button
          onClick={scrollRight}
          className="hidden w-[50px] h-[50px] md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-800"
        >
          &#8594;
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth cursor-grab px-4"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {["/1.1.avif","/1.2.avif","/1.3.avif","/1.4.avif","/1.5.avif","/1.6.avif","/1.7.webp","/1.8.webp","/1.9.webp"].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Section Image ${idx}`}
              className="flex-shrink-0 md:w-70 w-60 h-auto rounded-md "
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
<br></br>
<br></br>
<br></br>
<div className="relative w-full h-[500px] mt-2.5 mb-10">
  <img
    src="/Bundles_1 (1).webp"
    alt="Bottom Image"
    className="md:w-[100%] w-[100%] md:h-[110%] h-[100%] object-cover"
  />

  <div className="ml-6 absolute bottom-4 left-4 flex flex-col items-start text-white">
    <p className="uppercase tracking-wider mb-1 text-sm md:text-base">offers & discount</p>
    
    <h1 className="text-4xl md:text-5xl font-bold mb-3">our bundles</h1>
    <button 
  className="w-[200px] h-[40px] mb-1.5 text-[25px] border border-white text-white bg-transparent font-semibold hover:bg-white/10 flex items-center justify-center"
  onClick={() => window.location.href='/shop'}
>
  shop now
</button>


  </div>
</div>
<br></br>
<br></br>
<div className="bg-black  h-[150px]">
<div className="md:h-80  h-55 flex items-center justify-center bg-[#835a1d] gap-5">
  <h1 className="text-amber-50 text-center text-[20px] MD:text-4xl font-bold gap-4">DICOVER ELEGANCE<br></br><br></br>PREMIUM QUALITY</h1>
</div>

</div>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div>
<h1 className="md:text-4xl text-2xl text-center font-light md:mt-30 mb-5">our collections</h1>
<br></br>
<br></br>
<br></br>

<div className=" flex gap-10 justify-center flex-wrap">
<img src="/3.1.webp" alt="Collections" className="w-[320px]  md:w-[500px] animate__animated animate__fadeIn wow " />
<img src="/3.2.webp" alt="Collections" className="w-[320px]  md:w-[500px] animate__animated animate__fadeIn wow " />
<img src="/3.3.webp" alt="Collections" className="w-[320px]  md:w-[500px] animate__animated animate__fadeIn wow " />

</div>
<br></br>
<br></br>

</div>
<br></br>
<br></br>
<br></br><div className="flex flex-wrap justify-center gap-5 mb-10 border-t-black pt-10">
  <img src="/2.1.png" alt="Footer Image" className="w-40 md:w-100 shadow-2xl mb-4 border-2 border-gray-300" />
  <img src="/2.2.png" alt="Footer Image" className="w-40 md:w-100 shadow-2xl mb-4 border-2 border-gray-300" />
  <img src="/2.3 (2).png" alt="Footer Image" className="w-40 md:w-100 shadow-2xl mb-4 border-2 border-gray-300" />
</div>

<br></br>
<br></br>
<br></br>
<br></br>




    </>
  );
}
