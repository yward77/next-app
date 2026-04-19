"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, User, Phone, MapPin, CheckCircle2 } from "lucide-react";

const API = "https://siwa-api.onrender.com";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("siwa_cart")) || [];
    if (savedCart.length === 0) {
      router.push("/"); // العودة للمتجر إذا كانت السلة فارغة
    }
    setCart(savedCart);
  }, [router]);

  const total = cart.reduce((acc, cur) => {
    const price = cur.attributes?.price || cur.price || 0;
    return acc + Number(price) * (cur.quantity || 1);
  }, 0);

  const getImageUrl = (item) => {
    const p = item.attributes || item;
    const imgData = p.image?.data?.[0]?.attributes || p.imag?.data?.[0]?.attributes || p.image?.[0] || p.imag?.[0];
    const url = imgData?.url;
    if (!url) return "/default-image.png";
    return url.startsWith("http") ? url : `${API}${url}`;
  };

  const updateQuantity = (productId, newQty) => {
    const updatedCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem("siwa_cart", JSON.stringify(updatedCart));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      name,
      phone,
      address,
      total,
      items: cart.map((item) => {
        const p = item.attributes || item;
        return {
          name: p.name,
          price: Number(p.price),
          quantity: item.quantity,
          image: getImageUrl(item),
        };
      }),
    };

    try {
      const response = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: orderData }),
      });

      if (!response.ok) throw new Error("Order failed");

      localStorage.removeItem("siwa_cart");
      alert("Order placed successfully! ✅");
      router.push("/");
    } catch (err) {
      alert("Error processing your order ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-[#1D1D1F] font-sans selection:bg-black selection:text-white pb-20">
      
      {/* Header / Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex items-center justify-between">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:opacity-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to store
        </button>
        <h1 className="text-xl font-black uppercase italic tracking-tighter">Siwa Studio <span className="text-gray-300">Checkout</span></h1>
        <div className="w-20 hidden md:block"></div> {/* Spacer */}
      </div>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Information Form */}
        <div className="lg:col-span-7">
          <div className="mb-10">
            <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">Delivery Info.</h2>
            <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">Please provide your details for shipping</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="FULL NAME"
                className="w-full bg-white border border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-5 outline-none focus:ring-4 focus:ring-black/5 transition-all font-bold text-sm uppercase tracking-tight"
              />
            </div>

            <div className="relative group">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="PHONE NUMBER"
                className="w-full bg-white border border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-5 outline-none focus:ring-4 focus:ring-black/5 transition-all font-bold text-sm tracking-tight"
              />
            </div>

            <div className="relative group">
              <MapPin className="absolute left-5 top-8 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-black transition-colors" />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="FULL ADDRESS (CITY, STREET, BUILDING...)"
                className="w-full bg-white border border-gray-100 rounded-[1.5rem] pl-14 pr-6 py-5 h-40 outline-none focus:ring-4 focus:ring-black/5 transition-all font-bold text-sm uppercase tracking-tight resize-none"
              />
            </div>

            {/* Pay Button for Mobile (Hidden on Desktop) */}
            <div className="lg:hidden pt-6">
               <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-6 rounded-[2rem] font-black text-xl hover:opacity-90 disabled:bg-gray-200 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3"
              >
                {loading ? "PROCESSING..." : "CONFIRM ORDER"}
                <CheckCircle2 className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-gray-50 rounded-[3rem] p-8 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.03)] sticky top-32">
            <h3 className="text-2xl font-black uppercase italic mb-8 tracking-tighter">Your Bag <span className="text-gray-200">({cart.length})</span></h3>
            
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar mb-8">
              {cart.map((item) => {
                const p = item.attributes || item;
                return (
                  <div key={item.id} className="flex gap-4 items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                      <img src={getImageUrl(item)} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-[11px] uppercase italic tracking-tight line-clamp-1">{p.name}</h4>
                      <p className="text-gray-400 font-bold text-xs mt-1 tracking-widest">${Number(p.price).toFixed(2)}</p>
                      
                      <div className="flex items-center gap-4 mt-2 bg-gray-50 w-fit px-3 py-1 rounded-full border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-xs hover:text-red-500">-</button>
                        <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[10px] hover:text-green-500">+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 border-t border-gray-50 pt-8">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Subtotal</span>
                <span className="font-bold text-lg">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Shipping</span>
                <span className="text-green-500 font-bold text-[10px] uppercase tracking-widest">Free</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-black font-black uppercase text-sm tracking-tighter">Total Amount</span>
                <span className="text-4xl font-black tracking-tighter">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Pay Button for Desktop */}
            <button
              onClick={handleSubmit}
              disabled={loading || cart.length === 0}
              className="hidden lg:flex w-full mt-10 bg-black text-white py-6 rounded-[2rem] font-black text-xl hover:opacity-80 disabled:bg-gray-200 transition-all shadow-2xl shadow-black/10 items-center justify-center gap-3"
            >
              {loading ? "PROCESSING..." : "SUBMIT ORDER"}
              <CheckCircle2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </main>

      {/* Custom Styles for Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #EAEAEA;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}