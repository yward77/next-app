"use client";
import { useState } from "react";
import Link from "next/link";

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
          <h3 className="text-xs tracking-[0.25em] mb-6 text-gray-300">Our Features</h3>
          <ul className="space-y-3 text-sm leading-6">
            <li className="hover:underline cursor-pointer">Authentic Perfumes</li>
            <li className="hover:underline cursor-pointer">Wide Selection</li>
            <li className="hover:underline cursor-pointer">Personal Consultation</li>
            <li className="hover:underline cursor-pointer">Unique Experience</li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex flex-col items-start md:items-end ">
          <h3 className="text-xs mr-[120px] tracking-[0.25em] mb-6 text-gray-300">FOLLOW US</h3>
          <div className="flex gap-7 mt-9">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/facebook-app-symbol.png" alt="Facebook" className="md:w-[60px] md:h-[60px] hover:opacity-70 w-[40px] h-[40px]" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/instagram.png" alt="Instagram" className="md:w-[60px] md:h-[60px] hover:opacity-70 w-[40px] h-[40px]" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/twitter.png" alt="Twitter" className="md:w-[60px] md:h-[60px] hover:opacity-70 w-[40px] h-[40px]" />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <img src="/tiktok.png" alt="LinkedIn" className="md:w-[60px] md:h-[60px] hover:opacity-70 w-[40px] h-[40px]" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-20 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm w-[50px] h-[50px]">
        <p>© 2025 — SIWA FRAGRANCES</p>
      </div>
    </footer>
  );
}
