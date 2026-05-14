"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Phone, MapPin, CheckCircle2, ShieldCheck, CreditCard, ShoppingBag } from "lucide-react";

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
      router.push("/");
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
    if (cart.length === 0) return;
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
    <div className="min-h-screen bg-[#030305] text-zinc-200 font-sans antialiased selection:bg-amber-400 selection:text-black">
      
      {/* Background Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#030305]/80 backdrop-blur-md border-b border-zinc-900/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => router.back()} 
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-amber-400 transition-all"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Back
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-sm font-light uppercase tracking-[0.4em] text-zinc-100">ELIXIR <span className="text-zinc-600">STUDIO</span></h1>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Information Form */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="text-[10px] tracking-[0.4em] text-amber-500 font-bold uppercase block mb-2">Checkout Process</span>
              <h2 className="text-3xl md:text-4xl font-extralight uppercase tracking-widest text-zinc-100">Delivery <span className="text-zinc-500 italic">Info.</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {[
                  { label: "Full Name", state: name, setState: setName, icon: User, placeholder: "ENTER YOUR NAME" },
                  { label: "Phone Number", state: phone, setState: setPhone, icon: Phone, placeholder: "YOUR PHONE" }
                ].map((input, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-2">{input.label}</label>
                    <div className="relative group">
                      <input
                        value={input.state}
                        onChange={(e) => input.setState(e.target.value)}
                        required
                        placeholder={input.placeholder}
                        className="w-full bg-zinc-900/40 border border-zinc-800 rounded-2xl px-6 py-5 text-sm font-light outline-none focus:border-amber-500/50 focus:bg-zinc-900/60 transition-all placeholder:text-zinc-700"
                      />
                      <input.icon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700 group-focus-within:text-amber-500 transition-colors" />
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-2">Shipping Address</label>
                  <div className="relative group">
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="CITY, STREET, BUILDING..."
                      className="w-full bg-zinc-900/40 border border-zinc-800 rounded-3xl px-6 py-5 h-32 text-sm font-light outline-none focus:border-amber-500/50 focus:bg-zinc-900/60 transition-all placeholder:text-zinc-700 resize-none"
                    />
                    <MapPin className="absolute right-6 bottom-6 w-4 h-4 text-zinc-700 group-focus-within:text-amber-500 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="bg-amber-500/5 p-6 rounded-3xl border border-amber-500/10 flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Method</h4>
                  <p className="text-xs text-zinc-500 uppercase tracking-tight">Cash on Delivery</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-amber-500 ml-auto" />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/30 backdrop-blur-md rounded-[2.5rem] p-8 border border-zinc-800/50 sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-light uppercase tracking-[0.3em] text-zinc-100">Your Bag</h3>
                <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">{cart.length} Items</span>
              </div>
              
              <div className="space-y-5 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center group">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 shrink-0">
                      <img src={getImageUrl(item)} className="w-full h-full object-cover opacity-80" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-light text-[10px] uppercase truncate tracking-widest text-zinc-300">{item.attributes?.name || item.name}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-amber-500/80 font-mono text-[10px]">${Number(item.attributes?.price || item.price).toFixed(2)}</span>
                        
                        <div className="flex items-center gap-3 bg-zinc-950 px-2 py-1 rounded-md border border-zinc-800">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-xs text-zinc-500 hover:text-white">-</button>
                          <span className="text-[9px] font-mono text-zinc-300">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-xs text-zinc-500 hover:text-white">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-zinc-800">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  <span>Shipping</span>
                  <span className="text-amber-500">Complimentary</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs font-light uppercase tracking-widest text-zinc-100">Total</span>
                  <span className="text-3xl font-light tracking-tighter text-amber-500">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading || cart.length === 0}
                className="w-full mt-10 bg-amber-500 text-black py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-amber-400 active:scale-[0.98] disabled:bg-zinc-800 disabled:text-zinc-600 transition-all shadow-xl shadow-amber-500/10 flex items-center justify-center gap-3 group"
              >
                {loading ? "Processing..." : (
                  <>
                    Complete Order
                    <CheckCircle2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-zinc-700">
                <ShieldCheck className="w-3 h-3" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Encrypted & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        main { animation: fadeIn 1s ease-in-out; }
      `}</style>
    </div>
  );
}