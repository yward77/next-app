"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  const total = cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);

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
      items: cart.map((item) => ({
        name: item.name,
        price: Number(item.price),
        quantity: item.quantity,
        image: item.imag?.[0]?.url
          ? "http://localhost:1337" + item.imag[0].url
          : null,
      })),
    };

    try {
      await fetch("http://localhost:1337/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: orderData }),
      });

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
    <div className="min-h-screen md:bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8"
      >
        {/* Left: Customer Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Full Name"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Phone Number"
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Address"
            className="w-full p-4 border border-gray-300 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Right: Order Summary */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Order 
          </h2>

          <div className="flex-1 overflow-y-auto max-h-[400px] space-y-3">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center">No products in cart</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-3 border rounded-xl bg-gray-50 hover:shadow-lg transition"
                >
                  <img
                    src={
                      item.imag?.[0]?.url
                        ? "http://localhost:1337" + item.imag[0].url
                        : "/default-image.png"
                    }
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gray-800 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "SUBMIT ORDER"}
          </button>
        </div>
      </form>
    </div>
  );
}
