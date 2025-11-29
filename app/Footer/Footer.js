"use client";
import { useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!name || !email || !message) return alert("Please fill all fields");

    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }

    setLoading(false);
  };

  return (
    <footer className="w-full bg-[#423d3d] text-white pt-20 pb-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

        {/* MAIN MENU */}
        <div>
          <h3 className="text-xs tracking-[0.25em] mb-6 text-gray-300">MAIN MENU</h3>
          <ul className="space-y-3 text-sm leading-6">
            <li className="hover:underline cursor-pointer"><Link href="/">HOME</Link></li>
            <li className="hover:underline cursor-pointer"><Link href="/shop">SHOP ALL</Link></li>
            <li className="hover:underline cursor-pointer"><Link href="/branches">BRANCHES</Link></li>
            <li className="hover:underline cursor-pointer"><Link href="/about">ABOUT</Link></li>
            <li className="hover:underline cursor-pointer"><Link href="/contact">CONTACT US</Link></li>
          </ul>
        </div>

        {/* MORE INFORMATION */}
        <div>
          <h3 className="text-3xl tracking-[0.25em] mb-6 text-gray-300">Our Features</h3>
          <ul className="space-y-3 text-sm leading-6">
            <li className="text-2xl cursor-pointer">Authentic Perfumes</li>
            <li className="text-2xl cursor-pointer">Wide Selection</li>
            <li className="text-2xl cursor-pointer">Personal Consultation</li>
            <li className="text-2xl cursor-pointer">Unique Experience</li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
       {/* أيقونات وسائل التواصل الاجتماعي */}
             <div className="flex justify-center gap-8 mb-8 text-5xl md:mt-30">
               <FaFacebookF className="text-blue-600 cursor-pointer hover:scale-110 transition-transform" />
               <FaTwitter className="text-blue-400 cursor-pointer hover:scale-110 transition-transform" />
               <FaInstagram className="text-pink-500 cursor-pointer hover:scale-110 transition-transform" />
             </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm w-[50px] h-[50px]">
        <p>© 2025 — SIWA FRAGRANCES</p>
      </div>
    </footer>
  );
}
