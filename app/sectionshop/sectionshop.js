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
    setCartOpen(true);
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
    <div className="min-h-screen mt-20 bg-[#FBFBFB] text-[#1D1D1F] font-sans selection:bg-black selection:text-white">
      
      {/* --- ENHANCED FLOATING CART BUTTON (Larger on Desktop) --- */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end gap-3">
        {cart.length > 0 && (
          <div className="bg-black text-white text-[10px] md:text-[12px] font-black px-4 py-1.5 rounded-full animate-bounce shadow-2xl uppercase tracking-tighter">
            {cart.length} items added
          </div>
        )}
        <button 
          onClick={() => setCartOpen(true)}
          className="relative w-16 h-16 md:w-24 md:h-24 bg-black text-white rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
        >
          {/* Bag Icon: Standard size on mobile, much larger on Desktop */}
          <ShoppingBag className="w-6 h-6 md:w-10 md:h-10 group-hover:rotate-12 transition-transform stroke-[1.5px]" />
          
          {/* Counter Badge inside the button for Desktop for a cleaner look */}
          {cart.length > 0 && (
            <span className="absolute inset-0 rounded-full border-4 border-black animate-ping opacity-20"></span>
          )}
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20">
        
        {/* HEADER SECTION */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Siwa <span className="text-gray-300">Studio.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mt-8 justify-between items-start md:items-center">
            <div className="relative w-full max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Search products..." 
                 className="w-full bg-white border border-gray-100 rounded-2xl px-12 py-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-black/5"
                 onChange={(e) => handleSearch(e.target.value)}
               />
            </div>
            <select 
              onChange={(e) => handleSort(e.target.value)}
              className="bg-white border border-gray-100 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none shadow-sm cursor-pointer"
            >
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID (2 COLUMNS ON MOBILE) */}
        {loading ? (
          <div className="py-40 text-center font-black text-gray-100 text-4xl italic animate-pulse tracking-tighter">LOADING...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-x-8 md:gap-y-16">
            {filtered.map((product) => {
              const p = product.attributes || product;
              return (
                <div key={product.id} className="group relative">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#EAEAEA] mb-4 shadow-sm group-hover:shadow-xl transition-all duration-700">
                    <img 
                      src={getFullImgUrl(product)} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-end p-4">
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs shadow-2xl hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          QUICK ADD +
                        </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col px-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm md:text-lg font-bold tracking-tight uppercase line-clamp-1 italic">{p.name}</h3>
                      <button onClick={() => setSelectedProduct(product)} className="md:hidden p-1">
                        <Info className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <span className="text-lg md:text-2xl font-black mt-1">${p.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="mt-3 md:hidden w-full bg-black text-white py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest"
                    >
                      Add to bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- MODAL --- */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-white/80 backdrop-blur-xl">
            <div className="bg-white max-w-4xl w-full flex flex-col md:flex-row max-h-[90vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] shadow-2xl relative border border-gray-100">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-10 p-2 bg-black text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
              <div className="md:w-1/2 h-64 md:h-auto">
                <img src={getFullImgUrl(selectedProduct)} className="w-full h-full object-cover" />
              </div>
              <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase leading-none">{selectedProduct.attributes?.name || selectedProduct.name}</h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {selectedProduct.attributes?.description?.[0]?.children?.[0]?.text || "Premium selection from Siwa Studio."}
                </p>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-4xl font-black">${selectedProduct.attributes?.price || selectedProduct.price}</span>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:opacity-80 transition-all flex items-center justify-center gap-4"
                >
                  ADD TO BAG <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- SIDE CART --- */}
        {cartOpen && (
          <div className="fixed inset-0 z-[300] flex justify-end">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
            <div className="relative h-full w-full sm:w-[450px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase">Your Bag <span className="text-gray-200">({cart.length})</span></h2>
                <X className="w-6 h-6 cursor-pointer" onClick={() => setCartOpen(false)} />
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-300 font-bold uppercase tracking-widest italic text-center px-10 leading-tight">Your collection is empty</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-20 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-50">
                            <img src={getFullImgUrl(item)} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-[11px] uppercase italic tracking-tight">{item.attributes?.name || item.name}</h4>
                            <p className="text-gray-400 font-bold text-sm">${item.attributes?.price || item.price}</p>
                            <div className="flex items-center gap-3 mt-2 bg-gray-50 w-fit px-3 py-1 rounded-full">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-[10px] hover:text-red-500 transition-colors">-</button>
                                <span className="text-[10px] font-black">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[10px] hover:text-green-500 transition-colors">+</button>
                            </div>
                        </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-gray-50 bg-[#FBFBFB]">
                  <div className="flex justify-between mb-6">
                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Subtotal</span>
                    <span className="text-3xl font-black">${total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:opacity-90 transition-all"
                  >
                    CHECKOUT
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