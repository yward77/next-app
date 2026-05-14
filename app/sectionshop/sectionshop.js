"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, X, Plus, Minus, Search, ChevronDown } from "lucide-react";

const API = "https://siwa-api.onrender.com";

export default function ShopPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  // حالات البحث والترتيب
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const savedCart = JSON.parse(localStorage.getItem("siwa_cart")) || [];
    setCart(savedCart);

    fetch(`${API}/api/products?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data?.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 1. استخراج البيانات بشكل آمن (Helper)
  const getProductInfo = (item) => {
    const attr = item?.attributes || item;
    const price = attr?.price || 0;
    const name = attr?.name || "Premium Fragrance";
    const imgData = attr?.imag?.data?.[0]?.attributes || attr?.imag?.[0];
    const imgUrl = imgData?.url 
      ? (imgData.url.startsWith("http") ? imgData.url : `${API}${imgData.url}`) 
      : "/placeholder.png";
    
    return { price, name, imgUrl };
  };

  // 2. منطق البحث والترتيب (Memoized لضمان الأداء)
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // منطق البحث
    if (searchQuery) {
      result = result.filter((p) => {
        const { name } = getProductInfo(p);
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // منطق الترتيب
    if (sortBy === "price-low") {
      result.sort((a, b) => getProductInfo(a).price - getProductInfo(b).price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => getProductInfo(b).price - getProductInfo(a).price);
    } else if (sortBy === "name") {
      result.sort((a, b) => getProductInfo(a).name.localeCompare(getProductInfo(b).name));
    }

    return result;
  }, [products, searchQuery, sortBy]);

  // 3. دوال السلة
  const addToCart = (product) => {
    const newCart = [...cart];
    const index = newCart.findIndex((i) => i.id === product.id);
    if (index > -1) {
      newCart[index].quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    updateCartState(newCart);
  };

  const updateQuantity = (productId, newQty) => {
    const newCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
      .filter((item) => item.quantity > 0);
    updateCartState(newCart);
  };

  const updateCartState = (newCart) => {
    setCart(newCart);
    localStorage.setItem("siwa_cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((acc, item) => {
    const { price } = getProductInfo(item);
    return acc + price * (item.quantity || 1);
  }, 0);

  if (!isMounted) return <div className="min-h-screen bg-[#030305]" />;

  return (
    <div className="min-h-screen bg-[#030305] text-zinc-200 selection:bg-amber-400 selection:text-black relative pt-20 overflow-x-hidden">
      
      {/* زر السلة العائم */}
      <button 
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-zinc-900/90 border border-zinc-800 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-all"
      >
        <ShoppingBag className="w-6 h-6 text-amber-400" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
            {cart.length}
          </span>
        )}
      </button>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="mt-10">
            <span className="text-[10px] tracking-[0.5em] text-amber-500 uppercase font-bold block mb-2">ELIXIR Boutique</span>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter uppercase text-white opacity-90">
              Collections<span className="text-zinc-700">.</span>
            </h1>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
            {/* Input Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text"
                placeholder="Search fragrances..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-xs font-light outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 px-4 text-[10px] uppercase tracking-widest font-light outline-none appearance-none cursor-pointer focus:border-amber-500/50"
              >
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">A - Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-40 text-center text-zinc-700 tracking-[0.3em] text-xs animate-pulse uppercase">Refining Essences...</div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="py-40 text-center text-zinc-500 text-sm font-light">No products found matching your search.</div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredAndSortedProducts.map((product) => {
              const { price, name, imgUrl } = getProductInfo(product);
              return (
                <div key={product.id} className="group flex flex-col bg-zinc-900/10 border border-zinc-900/50 p-3 rounded-[30px] hover:border-amber-500/30 transition-all">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-zinc-950 mb-4">
                    <img src={imgUrl} alt={name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-1000" />
                    <button 
                      onClick={() => addToCart(product)}
                      className="absolute bottom-4 inset-x-4 bg-white text-black py-3 rounded-xl text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300"
                    >
                      Add To Bag
                    </button>
                  </div>
                  <div className="px-2 pb-2">
                    <h3 className="text-[11px] font-light tracking-wide uppercase text-zinc-400 mb-1 truncate">{name}</h3>
                    <p className="text-lg font-light text-amber-400">${price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Sidebar Cart */}
      {cartOpen && (
        <div className="fixed inset-0 z-[10000] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-[420px] bg-[#050507] h-full flex flex-col shadow-2xl border-l border-zinc-900 animate-in slide-in-from-right duration-500">
            {/* Header */}
            <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-[#050507]">
              <div>
                <h2 className="text-sm font-light uppercase tracking-[0.3em] text-white">Your Bag</h2>
                <p className="text-[9px] text-zinc-500 uppercase mt-1">{cart.length} Items Selected</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors">
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-700">
                   <ShoppingBag className="w-12 h-12 mb-4 opacity-10" />
                   <p className="text-[10px] uppercase tracking-widest">Bag is empty</p>
                </div>
              ) : (
                cart.map((item) => {
                  const { price, name, imgUrl } = getProductInfo(item);
                  return (
                    <div key={item.id} className="flex gap-5 items-center pb-6 border-b border-zinc-900/50">
                      <div className="w-20 h-24 bg-zinc-950 rounded-xl overflow-hidden shrink-0 border border-zinc-800">
                        <img src={imgUrl} className="w-full h-full object-cover opacity-70" alt={name} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[11px] uppercase tracking-wider text-zinc-300 mb-1 line-clamp-1">{name}</h4>
                        <p className="text-amber-400 font-light text-sm mb-3">${price}</p>
                        <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-900 w-fit px-3 py-1 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-zinc-600 hover:text-white transition-colors"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-mono text-zinc-400 min-w-[15px] text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-zinc-600 hover:text-white transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                      <button onClick={() => updateQuantity(item.id, 0)} className="self-start text-zinc-800 hover:text-zinc-500"><X className="w-4 h-4" /></button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-zinc-950/50 border-t border-zinc-900 backdrop-blur-xl">
                <div className="flex justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">Total Amount</span>
                  <span className="text-2xl font-light text-amber-400 tracking-tighter">${total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-amber-400 text-black py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-amber-300 transition-all active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #18181b; border-radius: 10px; }
      `}</style>
    </div>
  );
}