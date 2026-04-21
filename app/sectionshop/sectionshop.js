"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, X, Plus, Minus, ArrowRight, Info, Search } from "lucide-react";

const API = "https://siwa-api.onrender.com";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`${API}/api/products?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        const fetchedItems = data?.data || [];
        setProducts(fetchedItems);
        setFiltered(fetchedItems);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const savedCart = JSON.parse(localStorage.getItem("siwa_cart")) || [];
    setCart(savedCart.map((item) => ({ ...item, quantity: item.quantity || 1 })));
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    let newCart;
    if (exists) {
      newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem("siwa_cart", JSON.stringify(newCart));
  };

  const updateQuantity = (productId, newQty) => {
    const updatedCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem("siwa_cart", JSON.stringify(updatedCart));
  };

  const handleSearch = (value) => {
    setSearch(value);
    const result = products.filter((p) =>
      (p.attributes?.name || p.name || "").toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  };

  const handleSort = (type) => {
    setSortType(type);
    let sorted = [...filtered];
    if (type === "price-low") sorted.sort((a, b) => (a.attributes?.price || a.price) - (b.attributes?.price || b.price));
    else if (type === "price-high") sorted.sort((a, b) => (b.attributes?.price || b.price) - (a.attributes?.price || a.price));
    setFiltered(sorted);
  };

  const getFullImgUrl = (item) => {
    if (!item) return "/default-image.png";
    const p = item.attributes || item;
    const imgData = p.imag?.data?.[0]?.attributes || p.imag?.[0];
    const url = imgData?.url;
    return url ? (url.startsWith("http") ? url : `${API}${url}`) : "/default-image.png";
  };

  const total = cart.reduce((acc, cur) => acc + (cur.attributes?.price || cur.price || 0) * cur.quantity, 0);

  return (
    <div className="min-h-screen mt-20 bg-white text-[#1D1D1F] font-sans selection:bg-black selection:text-white">
      
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end gap-3">
        {cart.length > 0 && (
          <div className="bg-black text-white text-[10px] md:text-[11px] font-bold px-3 py-1 rounded-full animate-bounce shadow-xl uppercase tracking-tighter">
            {cart.length} IN BAG
          </div>
        )}
        <button 
          onClick={() => setCartOpen(true)}
          className="relative w-14 h-14 md:w-20 md:h-20 bg-black text-white rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center group"
        >
          <ShoppingBag className="w-5 h-5 md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
          {cart.length > 0 && (
            <span className="absolute inset-0 rounded-full border-2 border-black animate-ping opacity-20"></span>
          )}
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-10 pt-20 pb-20">
        
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none italic mb-8">
            Siwa <span className="text-gray-200 block md:inline">Store.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/50 p-4 rounded-[2rem] border border-gray-100">
            <div className="relative w-full max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Search our collection..." 
                 className="w-full bg-white border border-gray-100 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/5"
                 onChange={(e) => handleSearch(e.target.value)}
               />
            </div>
            <select 
              onChange={(e) => handleSort(e.target.value)}
              className="bg-white border border-gray-100 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer"
            >
              <option value="">Sort: Default</option>
              <option value="price-low">Price: Low - High</option>
              <option value="price-high">Price: High - Low</option>
            </select>
          </div>
        </div>

        {/* --- FIXED PRODUCT GRID --- */}
        {loading ? (
          <div className="py-40 text-center font-black text-gray-100 text-5xl italic animate-pulse">LOADING...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-20">
            {filtered.map((product) => {
              const p = product.attributes || product;
              return (
                <div key={product.id} className="group flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#f9f9f9] mb-6 shadow-sm hover:shadow-xl transition-all duration-700">
                    <img 
                      src={getFullImgUrl(product)} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    
                    {/* Hover Quick Add */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-end p-5">
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-white text-black py-4 rounded-2xl font-black text-[10px] tracking-widest shadow-2xl hover:bg-black hover:text-white transition-all uppercase"
                        >
                          Quick Add +
                        </button>
                    </div>
                  </div>
                  
                  {/* Info Section */}
                  <div className="flex flex-col px-2">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm md:text-base font-bold tracking-tight uppercase line-clamp-1 italic text-gray-800">{p.name}</h3>
                      <button onClick={() => setSelectedProduct(product)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <Info className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <span className="text-lg md:text-xl font-black text-black">${p.price}</span>
                    
                    {/* Mobile Only Button */}
                    <button 
                      onClick={() => addToCart(product)}
                      className="mt-4 md:hidden w-full bg-black text-white py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-md active:scale-95 transition-transform"
                    >
                      Add to bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal & Side Cart code remain the same... */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-white/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-white max-w-4xl w-full flex flex-col md:flex-row max-h-[85vh] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative border border-gray-50">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-10 p-2 bg-black text-white rounded-full hover:rotate-90 transition-transform">
                <X className="w-5 h-5" />
              </button>
              <div className="md:w-1/2 h-64 md:h-auto">
                <img src={getFullImgUrl(selectedProduct)} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase leading-none">{selectedProduct.attributes?.name || selectedProduct.name}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-10 italic">
                  {selectedProduct.attributes?.description?.[0]?.children?.[0]?.text || "Experience the pure essence of Siwa Studio's premium collection."}
                </p>
                <div className="flex items-center justify-between mb-10">
                  <span className="text-4xl font-black">${selectedProduct.attributes?.price || selectedProduct.price}</span>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full bg-black text-white py-6 rounded-2xl font-black text-lg hover:opacity-80 transition-all flex items-center justify-center gap-4 shadow-xl"
                >
                  ADD TO BAG <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Side Cart UI */}
        {cartOpen && (
          <div className="fixed inset-0 z-[300] flex justify-end">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
            <div className="relative h-full w-full sm:w-[480px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
              <div className="p-10 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Your Bag <span className="text-gray-200">({cart.length})</span></h2>
                <X className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform" onClick={() => setCartOpen(false)} />
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-300 font-bold uppercase tracking-widest italic text-center px-10">Empty Bag</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-6 items-center">
                        <div className="w-24 h-28 rounded-3xl overflow-hidden bg-gray-50 shrink-0 border border-gray-50 shadow-sm">
                            <img src={getFullImgUrl(item)} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-xs uppercase italic tracking-tight mb-1">{item.attributes?.name || item.name}</h4>
                            <p className="text-gray-400 font-bold text-sm mb-4">${item.attributes?.price || item.price}</p>
                            <div className="flex items-center gap-4 bg-gray-100 w-fit px-4 py-2 rounded-full shadow-inner">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-xs font-bold">-</button>
                                <span className="text-xs font-black">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-xs font-bold">+</button>
                            </div>
                        </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-10 border-t border-gray-50 bg-[#fdfdfd]">
                  <div className="flex justify-between mb-8 items-end">
                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Subtotal</span>
                    <span className="text-4xl font-black tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-black text-white py-6 rounded-3xl font-black text-lg shadow-2xl hover:opacity-90 transition-all active:scale-95"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}