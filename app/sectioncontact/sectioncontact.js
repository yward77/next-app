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
        setStatus("Message sent successfully!");
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
    <>
      {/* صورة رئيسية */}
      <img src="/Contact_Us.webp" className="md:w-full  md:h-[500px] mt-8 h-[300px] object-cover" />

      <div className="max-w-6xl mx-auto p-6 mb-8">
        <h1 className="text-5xl font-light text-center mb-4 mt-7">Contact Us</h1>
        <p className="text-center text-gray-600 mb-6 text-lg">
          We'd love to hear from you! Fill out the form below or reach us through our social media.
        </p>

        {/* فقرات إضافية */}
        <div className="text-gray-700 mb-8 space-y-3 text-center">
          <p>
            Our team is available Monday to Friday, 9 AM to 6 PM. We aim to respond to all inquiries within 24 hours.
          </p>
          <p>
            Please make sure to provide a valid email address so we can get back to you efficiently.
          </p>
          <p>
            For urgent matters, you can also contact us via phone during business hours.
          </p>
          <p>
            Follow us on our social media channels to get the latest updates and announcements.
          </p>
        </div>

        {/* شريط متحرك */}
        <Marquee gradient={false} speed={50} className="mb-38 mt-20 bg-white p-4 rounded-lg">
          <img src="/1.1.avif" alt="logo1" className="w-[300px] h-[300px] mx-4 object-cover" />
          <img src="/1.2.avif" alt="logo2" className="w-[300px] h-[300px] mx-4 object-cover" />
          <img src="/1.3.avif" alt="logo3" className="w-[300px] h-[300px] mx-4 object-cover" />
          <img src="/1.4.avif" alt="logo4" className="w-[300px] h-[300px] mx-4 object-cover" />
        </Marquee>

        {/* أيقونات وسائل التواصل الاجتماعي */}
        <div className="flex justify-center gap-8 mb-8 text-5xl">
          <FaFacebookF className="text-gray-500 cursor-pointer hover:scale-110 transition-transform" />
          <FaTwitter className="text-gray-500 cursor-pointer hover:scale-110 transition-transform" />
          <FaInstagram className="text-gray-500 cursor-pointer hover:scale-110 transition-transform" />
        </div>

        {/* معلومات الاتصال */}
        <div className="bg-gray-100 mt-7 p-6 rounded-2xl mb-8 text-gray-700 text-lg">
          <div className="flex items-center gap-4 mb-3 mt-6">
            <FaEnvelope className="text-xl" /> info@example.com
          </div>
          <div className="flex items-center gap-4 mb-3">
            <FaPhone className="text-xl" /> +123 456 7890
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-xl" /> 123 Street, City, Country
          </div>
        </div>

        {/* الفورم */}

<form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl mx-auto bg-white/20 backdrop-blur-md p-8 rounded-3-lg mt-28">
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
    className="  p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-white/70 focus:border-transparent text-lg text-black placeholder-gray "
  />
  <input
    type="email"
    name="email"
    placeholder="Email"
    required
    className="border-b-2 border-white/50 p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-white/70 focus:border-transparent text-lg text-black placeholder-gray "
  />
  <textarea
    name="message"
    placeholder="Your Message"
    required
    className="border border-white/50 p-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-white/70 focus:border-transparent text-lg text-black placeholder-gray  h-48 resize-none"
  ></textarea>
  <button
    type="submit"
    className="bg-black/80 text-white py-4 rounded-2xl hover:bg-black/90 transition-colors text-lg font-semibold shadow-md"
  >
    Send Message
  </button>
</form>

        {status && (
          <div
            className={`mt-6 p-4 rounded-lg text-white shadow-md text-center text-lg ${
              type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </>
  );
}
