"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// الرابط الخاص بك على ريندر
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
    setCart(savedCart);
  }, []);

  const total = cart.reduce((acc, cur) => {
    const price = cur.attributes?.price || cur.price || 0;
    return acc + Number(price) * cur.quantity;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty ❌");
      return;
    }

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
          image: p.imag?.data?.[0]?.attributes?.url || p.imag?.[0]?.url 
            ? API + (p.imag?.data?.[0]?.attributes?.url || p.imag?.[0]?.url)
            : null,
        };
      }),
    };

    try {
      const response = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: orderData }),
      });

      if (!response.ok) throw new Error("Failed to save order in Strapi");

      await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      localStorage.removeItem("siwa_cart");
      alert("Order sent successfully ✅");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to send order ❌");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId, newQty) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQty } : item
    ).filter(item => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("siwa_cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-gray-50 md:bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-6 md:p-10 flex flex-col md:flex-row gap-10"
      >
        {/* Left: Customer Info */}
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone Number"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Full Address"
              className="w-full p-4 border border-gray-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="flex-1 flex flex-col bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order Summary</h2>

          {/* قائمة المنتجات المحسنة */}
          <div className="flex-1 overflow-y-auto max-h-[350px] pr-2 space-y-4 custom-scrollbar">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No products in cart</p>
            ) : (
              cart.map((item) => {
                const p = item.attributes || item;
                const imgUrl = p.imag?.data?.[0]?.attributes?.url || p.imag?.[0]?.url;
                const fullImg = imgUrl ? API + imgUrl : "/default-image.png";

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                  >
                    {/* الصورة */}
                    <img
                      src={fullImg}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-200"
                    />

                    {/* الاسم والسعر */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 truncate text-sm">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500">${p.price}</p>
                    </div>

                    {/* التحكم في الكمية والسعر الفرعي */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        ${((p.price || 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* الإجمالي والزر */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center text-xl font-bold text-gray-800">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all active:scale-[0.98] disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "SUBMIT ORDER"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}