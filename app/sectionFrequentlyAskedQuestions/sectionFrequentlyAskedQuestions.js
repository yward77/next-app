"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const faqs = [
  { question: "What are your working hours?", answer: "We work from 9 AM to 8 PM every day." },
  { question: "Where are you located?", answer: "123 Main Street, Damascus, Syria." },
  { question: "How can I contact support?", answer: "You can call us at +963 12345678 or email support@example.com." },
  { question: "Do you offer delivery?", answer: "Yes, we deliver locally within 24 hours." },
];

const testimonials = [
  { name: "Ali", comment: "Great service and fast delivery!" },
  { name: "Sara", comment: "Amazing products, very satisfied." },
  { name: "Omar", comment: "Support team was very helpful." },
];

const team = [
  { name: "Mohammed", role: "CEO", img: "/team1.jpg" },
  { name: "Layla", role: "Marketing Lead", img: "/team2.jpg" },
  { name: "Omar", role: "Developer", img: "/team3.jpg" },
];

const services = [
  { title: "Fast Delivery", desc: "Receive your orders in record time.", icon: "🚀" },
  { title: "Quality Products", desc: "Only the best items for our customers.", icon: "🏆" },
  { title: "24/7 Support", desc: "Always here to help you anytime.", icon: "📞" },
];

const statsData = [
  { label: "Orders Delivered", value: 1500, suffix: "+" },
  { label: "Happy Customers", value: 1200, suffix: "+" },
  { label: "Awards Won", value: 15, suffix: "" },
];

export default function SectionInfo() {
  const [openIndex, setOpenIndex] = useState(null);
  const [counts, setCounts] = useState(statsData.map(() => 0));

  // Count-up effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, idx) =>
          c < statsData[idx].value
            ? Math.min(c + Math.ceil(statsData[idx].value / 100), statsData[idx].value)
            : statsData[idx].value
        )
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen mt-30">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-300 to-black text-white py-20">
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-4xl md:text-6xl font-bold text-center">
          Welcome to Our Company
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-4 text-lg md:text-2xl">
          Discover our services and FAQ
        </motion.p>
      </div>

      {/* Services */}
      <div className="bg-white py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.2 }} className="p-6 bg-gray-50 rounded-xl shadow text-center">
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}  
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {statsData.map((stat, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: idx * 0.2 }}>
              <h3 className="text-4xl font-bold">{counts[idx]}{stat.suffix}</h3>
              <p className="text-gray-700">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {testimonials.map((t, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: idx * 0.2 }} className="bg-gray-50 rounded-xl p-6 shadow">
              <p className="text-gray-700 mb-2">"{t.comment}"</p>
              <p className="text-gray-900 font-semibold">- {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: index * 0.1 }} className="bg-gray-100 rounded-xl p-4">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="flex justify-between w-full text-left font-semibold text-lg">
                {faq.question} <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && <p className="mt-2 text-gray-700">{faq.answer}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
