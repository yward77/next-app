"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:1337/api/products?populate=*")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        setFiltered(data.data);
        setLoading(false);
      });

    const savedCart = localStorage.getItem("siwa_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("siwa_cart", JSON.stringify(newCart));
   
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("siwa_cart", JSON.stringify(newCart));
  };

  const handleSearch = (value) => {
    setSearch(value);
    const result = products.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(result);
  };

  const handleSort = (type) => {
    setSortType(type);
    let sorted = [...filtered];

    if (type === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (type === "price-high") sorted.sort((a, b) => b.price - a.price);
    if (type === "new")
      sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    setFiltered(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-3 md:px-5 mt-30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            🛍️ Siwa Shop
          </h1>
          <div className="relative">
            <ShoppingCart
              className="w-8 h-8 cursor-pointer text-gray-800"
              onClick={() => setCartOpen(!cartOpen)}
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4  md:w-full">
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
            <option value="new">Newest</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-lg font-semibold">
            Loading products...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product) => {
              const images = product.imag || [];
              const img =
                images[0]?.formats?.medium?.url ||
                images[0]?.formats?.small?.url ||
                images[0]?.url;
              const fullImg = img
                ? "http://localhost:1337" + img
                : "/default-image.png";
              const desc =
                product.description?.[0]?.children?.[0]?.text || "";

              return (
                <div
                  key={product.id}
                  className="bg-tra  shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col"
                >
                  <div className="w-full h-30 md:h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={fullImg}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h2 className="text-lg md:text-xl font-semibold mb-1 truncate">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {desc}
                    </p>
                    <p className="text-xl font-bold text-gray-700 mb-3">
                      ${product.price}
                    </p>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 flex items-center justify-center py-2 bg-black text-white rounded-lg hover:bg-blue-700 transition gap-1 text-sm md:text-base"
                      >
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                        Add
                      </button>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 flex items-center justify-center py-2 bg-white text-black drop-shadow-md rounded-lg hover:bg-green-700 hover:text-white transition gap-1 text-sm md:text-base"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* مودال تفاصيل المنتج */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-2xl max-w-xl w-full relative overflow-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {selectedProduct.name}
            </h2>
            <p className="text-gray-600 mb-3">
              {selectedProduct.description?.[0]?.children?.[0]?.text}
            </p>
            <p className="text-xl md:text-2xl font-extrabold mb-4">
              ${selectedProduct.price}
            </p>
            {selectedProduct.imag?.[0]?.url && (
              <img
                src={`http://localhost:1337${selectedProduct.imag[0].url}`}
                alt={selectedProduct.name}
                className="w-full h-64 md:h-80 object-cover mb-4 rounded-lg"
              />
            )}
            <button
              onClick={() => addToCart(selectedProduct)}
              className="py-3 bg-black text-white w-full rounded-lg hover:bg-blue-700 transition"
            >
              <ShoppingCart className="inline w-5 h-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      )}

{/* سلة الشراء الاحترافية */}
{cartOpen && (
  <div className="fixed top-20 right-5 bg-white shadow-2xl rounded-2xl md:w-96 z-50 p-6 flex flex-col max-h-[80vh]">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">🛒 Your Cart</h2>
      <button
        onClick={() => setCartOpen(false)}
        className="text-gray-500 hover:text-black text-xl font-bold"
      >
        ×
      </button>
    </div>

    <div className="flex-1 overflow-auto">
      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
      ) : (
        cart.map((item, index) => {
          const img =
            item.imag?.[0]?.formats?.thumbnail?.url ||
            item.imag?.[0]?.formats?.small?.url ||
            item.imag?.[0]?.url;
          const fullImg = img ? "http://localhost:1337" + img : "/default-image.png";

          return (
            <div
              key={index}
              className="flex items-center justify-between mb-4 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img
                src={fullImg}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 ml-3">
                <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:text-red-700 font-bold text-xl ml-2"
              >
                ×
              </button>
            </div>
          );
        })
      )}
    </div>

    {cart.length > 0 && (
      <div className="mt-4">
        <p className="text-lg font-bold mb-4">
          Total: ${cart.reduce((acc, cur) => acc + cur.price, 0)}
        </p>
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold">
          Checkout
        </button>
      </div>
    )}
  </div>
)}

    </div>
  );
}
