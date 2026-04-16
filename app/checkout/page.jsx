"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// الرابط الخاص بك
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

  // حساب الإجمالي بدقة مع تحويل النصوص لأرقام
  const total = cart.reduce((acc, cur) => {
    const price = cur.attributes?.price || cur.price || 0;
    return acc + Number(price) * (cur.quantity || 1);
  }, 0);

  // دالة ذكية لجلب رابط الصورة
  const getImageUrl = (item) => {
    const p = item.attributes || item;
    // نتأكد من اسم الحقل في Strapi (هل هو image أم imag؟)
    const imgData = p.image?.data?.[0]?.attributes || p.imag?.data?.[0]?.attributes || p.image?.[0] || p.imag?.[0];
    const url = imgData?.url;

    if (!url) return "/default-image.png"; // صورة افتراضية في حال عدم وجود صورة
    
    // إذا كان الرابط يبدأ بـ http (مثل Cloudinary) نستخدمه كما هو، وإلا نضيف رابط الـ API
    return url.startsWith("http") ? url : `${API}${url}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("سلتك فارغة ❌");
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
          image: getImageUrl(item),
        };
      }),
    };

    try {
      // 1. حفظ الطلب في Strapi
      const response = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: orderData }),
      });

      if (!response.ok) throw new Error("فشل حفظ الطلب في السيرفر");

      // 2. إرسال إشعار واتساب (اختياري حسب إعداداتك)
      await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      localStorage.removeItem("siwa_cart");
      alert("تم إرسال طلبك بنجاح ✅");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إرسال الطلب ❌");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId, newQty) => {
    const updatedCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: newQty } : item))
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("siwa_cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" dir="ltr">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-6 md:p-10 flex flex-col md:flex-row gap-10"
      >
        {/* القسم الأيسر: بيانات العميل */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 text-left">Checkout</h1>
          <div className="space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone Number"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition"
            />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Full Address"
              className="w-full p-4 border border-gray-200 rounded-xl h-32 resize-none focus:ring-2 focus:ring-black outline-none transition"
            />
          </div>
        </div>

        {/* القسم الأيمن: ملخص الطلب */}
        <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-left">Order Summary</h2>
          
          <div className="flex-1 max-h-[350px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {cart.map((item) => {
              const p = item.attributes || item;
              return (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                  <img
                    src={getImageUrl(item)}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{p.name}</p>
                    <p className="text-xs text-gray-500">${Number(p.price).toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button 
                        type="button" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                        className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center hover:bg-gray-50"
                      >-</button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        type="button" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                        className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center hover:bg-gray-50"
                      >+</button>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      ${(Number(p.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold text-gray-800">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black disabled:bg-gray-400 transition-all active:scale-95"
            >
              {loading ? "Processing..." : "SUBMIT ORDER"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}