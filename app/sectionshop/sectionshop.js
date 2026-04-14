"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

// رابط الباك إيند الخاص بك
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
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });

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

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
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
    if (type === "price-low") sorted.sort((a, b) => (a.attributes?.price || 0) - (b.attributes?.price || 0));
    if (type === "price-high") sorted.sort((a, b) => (b.attributes?.price || 0) - (a.attributes?.price || 0));
    setFiltered(sorted);
  };

  const total = cart.reduce((acc, cur) => acc + (cur.attributes?.price || cur.price || 0) * cur.quantity, 0);

  return (
    <div className="min-h-screen bg-white py-10 px-3 md:px-5 mt-30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - التصميم الأصلي */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left mb-5">
            🛍️ Siwa Shop
          </h1>
          <div className="relative">
            <ShoppingCart
              className="w-8 h-8 cursor-pointer text-gray-800"
              onClick={() => setCartOpen(!cartOpen)}
            />
            {cart.length > 0 && (
              <span className="absolute -top-5 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        {/* Search & Sort - التصميم الأصلي */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 md:w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for a product..."
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <select
            value={sortType}
            onChange={(e) => handleSort(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-lg font-semibold">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => {
              const p = product.attributes || product;
              const imgUrl = p.imag?.data?.[0]?.attributes?.url || p.imag?.[0]?.url;
              const fullImg = imgUrl ? (imgUrl.startsWith("http") ? imgUrl : API + imgUrl) : "/default-image.png";
              const desc = p.description?.[0]?.children?.[0]?.text || "";

              return (
                <div key={product.id} className="bg-transparent transition shadow transform hover:-translate-y-1 overflow-hidden flex flex-col p-2 sm:p-3 md:p-4 min-h-[250px] sm:min-h-[300px] md:min-h-[420px]">
                  <div className="w-full h-24 sm:h-32 md:h-48 bg-gray-200 overflow-hidden">
                    <img src={fullImg} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-2 flex flex-col flex-1">
                    <h2 className="text-lg md:text-xl font-semibold mb-1 truncate">{p.name}</h2>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{desc}</p>
                    <p className="text-xl font-bold text-gray-700 mb-3">${p.price}</p>
                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => addToCart(product)} className="flex-1 flex items-center justify-center py-2 bg-black text-white hover:bg-blue-700 transition gap-1 text-sm md:text-base">
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /> Add
                      </button>
                      <button onClick={() => setSelectedProduct(product)} className="flex-1 flex items-center justify-center py-1 bg-white border border-black text-black hover:bg-green-700 hover:text-white transition gap-1 text-sm md:text-base">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal - التصميم الأصلي */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full md:max-w-3xl overflow-hidden relative">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-3xl font-bold z-10">×</button>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 w-full h-64 md:h-auto">
                  <img 
                    src={(() => {
                      const img = selectedProduct.attributes?.imag?.data?.[0]?.attributes?.url || selectedProduct.imag?.[0]?.url;
                      return img ? (img.startsWith("http") ? img : API + img) : "/default-image.png";
                    })()} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="md:w-1/2 w-full p-6 flex flex-col justify-between bg-gray-50">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-900">{selectedProduct.attributes?.name || selectedProduct.name}</h2>
                    <p className="text-gray-600 mb-4">{selectedProduct.attributes?.description?.[0]?.children?.[0]?.text || selectedProduct.description?.[0]?.children?.[0]?.text}</p>
                    <p className="text-2xl font-bold text-gray-800 mb-6">${selectedProduct.attributes?.price || selectedProduct.price}</p>
                  </div>
                  <button onClick={() => addToCart(selectedProduct)} className="w-full py-3 bg-black text-white rounded-xl hover:bg-blue-600 transition flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart - التصميم الأصلي */}
        {cartOpen && (
          <div className="fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white z-50 flex flex-col border-l shadow-lg">
            <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b">
              <h2 className="text-xl sm:text-2xl tracking-widest font-bold">CART</h2>
              <button onClick={() => setCartOpen(false)} className="text-2xl text-gray-600">×</button>
            </div>
            <div className="flex-1 overflow-auto px-4 sm:px-6">
              {cart.map((item) => {
                const p = item.attributes || item;
                const img = p.imag?.data?.[0]?.attributes?.url || p.imag?.[0]?.url;
                const fullImg = img ? (img.startsWith("http") ? img : API + img) : "/default-image.png";
                return (
                  <div key={item.id} className="flex gap-3 sm:gap-4 py-4 sm:py-6 border-b">
                    <img src={fullImg} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium uppercase truncate">{p.name}</p>
                      <p className="text-gray-500 mt-1">LE {p.price}</p>
                      <div className="flex items-center border w-fit mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1">-</button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1">+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 border-t">
                <button onClick={() => router.push("/checkout")} className="w-full bg-black text-white py-3 sm:py-4 tracking-widest rounded">
                  CHECKOUT · LE {total.toFixed(2)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}