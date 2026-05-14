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
    <div className="min-h-screen bg-[#030305] text-zinc-200 font-sans selection:bg-amber-400 selection:text-black antialiased relative pt-[90px]">
      
      {/* هالة إضاءة معتمة متحركة بالخلفية لتعميق الإحساس بالفخامة */}
      <div className="absolute top-[15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-zinc-500/5 blur-[130px] pointer-events-none" />

      {/* زر سلة التسوق العائم المطور */}
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end gap-3">
        {cart.length > 0 && (
          <div className="bg-amber-400 text-black text-[9px] font-bold px-3 py-1 rounded-full animate-pulse shadow-xl uppercase tracking-[0.2em]">
            {cart.length} IN BAG
          </div>
        )}
        <button 
          onClick={() => setCartOpen(true)}
          className="relative w-14 h-14 md:w-18 md:h-18 bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md text-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:scale-110 hover:border-amber-500/30 active:scale-95 transition-all flex items-center justify-center group"
        >
          <ShoppingBag className="w-5 h-5 md:w-6 h-6 text-zinc-300 group-hover:text-amber-400 transition-colors" />
          {cart.length > 0 && (
            <span className="absolute inset-0 rounded-full border border-amber-400 animate-ping opacity-20"></span>
          )}
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-32 relative z-10">
        
        {/* 1. قسم رأس الصفحة المحدث بالكامل */}
        <div className="mb-20 text-center md:text-left space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.6em] text-amber-500/80 font-bold uppercase block">
              Haute Parfumerie
            </span>
            <h1 className="text-4xl md:text-7xl font-extralight tracking-[0.3em] uppercase text-zinc-100">
              ELIXIR <span className="text-zinc-600 font-thin block md:inline">Boutique.</span>
            </h1>
          </div>
          
          {/* شريط أدوات البحث والتصفية الزجاجي الفاخر */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-2xl backdrop-blur-md">
            <div className="relative w-full max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
               <input 
                 type="text" 
                 placeholder="Search our exclusive collection..." 
                 className="w-full bg-[#09090e]/60 text-zinc-200 border border-zinc-900 p-3 rounded-xl pl-12 pr-4 text-xs font-light tracking-wide outline-none focus:border-amber-500/40 placeholder-zinc-600 transition-colors"
                 onChange={(e) => handleSearch(e.target.value)}
               />
            </div>
            <select 
              onChange={(e) => handleSort(e.target.value)}
              className="w-full md:w-auto bg-[#09090e]/60 text-zinc-400 border border-zinc-900 px-6 py-3 rounded-xl text-[10px] font-light uppercase tracking-[0.2em] outline-none cursor-pointer focus:border-amber-500/40 transition-colors"
            >
              <option value="" className="bg-[#09090e]">Sort: Default</option>
              <option value="price-low" className="bg-[#09090e]">Price: Low - High</option>
              <option value="price-high" className="bg-[#09090e]">Price: High - Low</option>
            </select>
          </div>
        </div>

        {/* 2. شبكة عرض المنتجات الراقية */}
        {loading ? (
          <div className="py-40 text-center font-extralight text-zinc-700 text-3xl tracking-[0.4em] uppercase animate-pulse">
            Loading Collection...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14 md:gap-x-8 md:gap-y-20">
            {filtered.map((product) => {
              const p = product.attributes || product;
              return (
                <div key={product.id} className="group flex flex-col justify-between bg-gradient-to-b from-zinc-900/10 to-zinc-950/40 border border-zinc-900/30 p-3 rounded-[28px] transition-all duration-500 hover:border-amber-500/20">
                  
                  {/* حاوية الصورة المتجاوبة والذكية */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-zinc-950 mb-5 shadow-inner">
                    <img 
                      src={getFullImgUrl(product)} 
                      alt={p.name} 
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1500ms]" 
                    />
                    
                    {/* إضافة سريعة للكمبيوتر عند تمرير الماوس */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-end p-4">
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-white text-black py-3.5 rounded-xl text-[10px] tracking-[0.3em] font-medium uppercase shadow-2xl hover:bg-amber-400 hover:text-black transition-colors"
                        >
                          Quick Add +
                        </button>
                    </div>
                  </div>
                  
                  {/* قسم معلومات وتفاصيل العطر */}
                  <div className="flex flex-col px-1 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs md:text-sm font-light tracking-wide text-zinc-300 uppercase line-clamp-1">{p.name}</h3>
                      <button 
                        onClick={() => setSelectedProduct(product)} 
                        className="p-1 text-zinc-600 hover:text-amber-400 hover:bg-zinc-900/50 rounded-full transition-all"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-base md:text-lg font-light tracking-wide text-amber-400/90">${p.price}</span>
                    
                    {/* زر الإضافة للهواتف فقط بشكل رائع */}
                    <button 
                      onClick={() => addToCart(product)}
                      className="mt-2 md:hidden w-full bg-zinc-900/60 border border-zinc-800 text-zinc-300 py-2.5 rounded-xl text-[9px] uppercase tracking-[0.2em] font-light shadow-md active:scale-95 transition-all"
                    >
                      Add to bag
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* 3. مودال تفاصيل العطر الزجاجي المنبثق */}
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-zinc-950 border border-zinc-900 max-w-3xl w-full flex flex-col md:flex-row max-h-[85vh] overflow-hidden rounded-[32px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-6 right-6 edit-z-10 p-2 text-zinc-500 hover:text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="md:w-1/2 h-56 md:h-auto bg-black">
                <img src={getFullImgUrl(selectedProduct)} className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
                <span className="text-[9px] tracking-[0.5em] text-amber-400 uppercase font-bold block">Private Collection</span>
                <h2 className="text-2xl md:text-4xl font-extralight tracking-wide text-zinc-100 uppercase leading-snug">
                  {selectedProduct.attributes?.name || selectedProduct.name}
                </h2>
                <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed tracking-wide">
                  {selectedProduct.attributes?.description?.[0]?.children?.[0]?.text || "Experience the pure essence of ELIXIR Studio's premium fragrance artwork collection."}
                </p>
                <div className="text-2xl font-light text-amber-400">${selectedProduct.attributes?.price || selectedProduct.price}</div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full bg-amber-950/20 text-amber-400 border border-amber-500/30 py-4 rounded-xl text-xs tracking-[0.3em] uppercase font-medium hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl"
                >
                  ADD TO BAG <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. عربة التسوق الجانبية الزجاجية المستوحاة من المجلات الفاخرة */}
        {cartOpen && (
          <div className="fixed inset-0 z-[300] flex justify-end">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setCartOpen(false)} />
            <div className="relative h-full w-full sm:w-[440px] bg-zinc-950/80 border-l border-zinc-900/80 backdrop-blur-2xl shadow-[-50px_0_100px_rgba(0,0,0,0.9)] flex flex-col justify-between animate-in slide-in-from-right duration-500">
              
              {/* ترويسة الحقيبة */}
              <div className="p-8 border-b border-zinc-900/60 flex justify-between items-center">
                <h2 className="text-lg font-light uppercase tracking-[0.2em] text-zinc-200">
                  Your Bag <span className="text-zinc-600 font-mono text-sm">({cart.length})</span>
                </h2>
                <X className="w-6 h-6 text-zinc-500 cursor-pointer hover:text-white transition-colors" onClick={() => setCartOpen(false)} />
              </div>

              {/* قائمة العناصر داخل السلة */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-600 font-light uppercase tracking-[0.3em] text-xs text-center">Your Bag Is Empty</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-zinc-900/20 border border-zinc-900/50 p-3 rounded-2xl">
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-zinc-900">
                            <img src={getFullImgUrl(item)} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <h4 className="font-light text-xs text-zinc-300 uppercase tracking-wide line-clamp-1">{item.attributes?.name || item.name}</h4>
                            <p className="text-amber-400/80 font-light text-xs tracking-wider">${item.attributes?.price || item.price}</p>
                            
                            {/* أزرار زيادة ونقصان الكمية بنمط مدمج */}
                            <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-900 w-fit px-3 py-1.5 rounded-lg mt-2 shadow-inner">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-zinc-500 hover:text-white text-xs px-1">-</button>
                                <span className="text-xs font-mono text-zinc-300 px-1">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-zinc-500 hover:text-white text-xs px-1">+</button>
                            </div>
                        </div>
                    </div>
                  ))
                )}
              </div>

              {/* الحساب النهائي وزر الدفع المطور */}
              {cart.length > 0 && (
                <div className="p-8 border-t border-zinc-900/60 bg-zinc-950/60 backdrop-blur-md">
                  <div className="flex justify-between mb-6 items-end">
                    <span className="text-zinc-500 text-[10px] tracking-[0.3em] uppercase font-light">Subtotal</span>
                    <span className="text-2xl font-light tracking-wide text-amber-400">${total.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-amber-400 text-black py-4 rounded-xl text-xs tracking-[0.4em] uppercase font-medium hover:bg-amber-500 transition-all shadow-xl shadow-amber-500/5 active:scale-[0.98]"
                  >
                    Proceed To Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </div>
  );
}