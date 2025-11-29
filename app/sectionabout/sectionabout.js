"use client";
import Marquee from "react-fast-marquee";

export default function About() {
  return (
    <>
      <img src="/About_Us.webp" className="w-full h-[400px] object-cover mt-30" />

      <div className="w-full">

        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="text-center text-3xl tracking-[4px] font-medium mb-10">
            ABOUT US
          </h1>

          <p className="text-gray-700 leading-7 mb-6">
            Siwa Fragrances is an esteemed Egyptian maison, weaving heritage and identity into every bottle. 
            We exist to elevate your daily ritual with scents that are both a personal signature and a profound 
            connection to culture, all while embracing unparalleled comfort.
          </p>

          <p className="text-gray-700 leading-7 mb-8">
            Our pledge is to redefine luxury, making it authentically Egyptian and accessible. 
            By fusing masterful craftsmanship with exceptional value, we earn your trust—proving 
            local quality rivals the world's best.
          </p>

          <ul className="list-disc ml-6 space-y-2">
            <li className="font-semibold">Exquisite Ingredients</li>
            <li className="font-semibold">Inclusive Pricing</li>
            <li className="font-semibold">Personalized Service</li>
          </ul>
        </div>

  <div className="w-full h-[200px] bg-[#18181f]  py-4 md:mt-25 text-center flex items-center justify-center">
        <Marquee direction="right" speed={100}>

          <h1 className="text-white md:text-6xl text-2xl font-bold text-center uppercase tracking-widest">
           Discover Luxury Fragrances • Exclusive Scents • Premium Perfumes For You
          </h1>
        </Marquee>
      </div>

        <div className="bg-gray-200 py-20 p9.1.jpg">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <img src="/9.1.jpg" className="w-full h-60 object-cover rounded-xl mb-4" />
              <h3 className="font-semibold text-lg mb-2">Authentic Craftsmanship</h3>
              <p className="text-gray-600 text-sm">Hand-crafted techniques inspired by heritage.</p>
            </div>

            <div className="text-center">
              <img src="/9.2.jpg" className="w-full h-60 object-cover rounded-xl mb-4" />
              <h3 className="font-semibold text-lg mb-2">Premium Ingredients</h3>
              <p className="text-gray-600 text-sm">We use world-class scents for long-lasting aroma.</p>
            </div>

            <div className="text-center">
              <img src="/9.3.jpg" className="w-full h-60 object-cover rounded-xl mb-4" />
              <h3 className="font-semibold text-lg mb-2">Modern Aesthetic</h3>
              <p className="text-gray-600 text-sm">Designed to look beautiful in every setting.</p>
            </div>
          </div>
        </div>




        <div className="max-w-5xl mx-auto py-24 px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img src="/5.1.jpg" className="rounded-2xl w-full h-[350px] object-cover" />
            <div>
              <h2 className="text-2xl font-semibold mb-4 tracking-wide">
                A Journey Through Scent
              </h2>
              <p className="text-gray-700 leading-7 mb-6">
                Every fragrance tells a story—crafted with passion and inspired by the heart of Egyptian roots. 
                Our perfumes blend modern luxury with cultural authenticity.
              </p>
             
            </div>
          </div>
        </div>

        <div className="bg-black text-white py-20 px-6 text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4 tracking-wide">
            Why Choose Us?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8 leading-7">
            We focus on quality, authenticity, and delivering an unforgettable experience with every product.
          </p>
          <div className="flex justify-center gap-10 flex-wrap">
            <div>
              <h3 className="text-xl font-bold">10+</h3>
              <p className="text-gray-400 text-sm">Years of Experience</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">50K+</h3>
              <p className="text-gray-400 text-sm">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">100%</h3>
              <p className="text-gray-400 text-sm">Premium Quality</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
