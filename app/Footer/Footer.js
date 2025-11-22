export default function Footer() {
  return (
    <footer className="w-full bg-[#0F0F0F] text-white pt-20 pb-10 px-6 md:px-20">
      {/* TOP GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

        {/* MAIN MENU */}
        <div>
          <h3 className="text-xs tracking-[0.25em] mb-6 text-gray-300">MAIN MENU</h3>

          <ul className="space-y-3 text-sm leading-6">
            <li className="hover:underline cursor-pointer">HOME</li>
            <li className="hover:underline cursor-pointer">SHOP ALL</li>
            <li className="hover:underline cursor-pointer">ORIGINAL CREATIONS</li>
            <li className="hover:underline cursor-pointer">FOR HIM</li>
            <li className="hover:underline cursor-pointer">FOR HER</li>
            <li className="hover:underline cursor-pointer">UNISEX</li>
            <li className="hover:underline cursor-pointer">BUNDLES</li>
            <li className="hover:underline cursor-pointer">BODY SPLASH</li>
            <li className="hover:underline cursor-pointer">BODY LOTION</li>
            <li className="hover:underline cursor-pointer">CONTACT US</li>
          </ul>
        </div>

        {/* MORE INFORMATION */}
        <div>
          <h3 className="text-xs tracking-[0.25em] mb-6 text-gray-300">MORE INFORMATION</h3>

          <ul className="space-y-3 text-sm leading-6">
            <li className="hover:underline cursor-pointer">SEARCH</li>
            <li className="hover:underline cursor-pointer">REFUND POLICY</li>
            <li className="hover:underline cursor-pointer">ABOUT US</li>
            <li className="hover:underline cursor-pointer">PRIVACY POLICY</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-xs tracking-[0.25em] mb-6 text-gray-300">NEWSLETTER</h3>

          <p className="text-sm text-gray-400 leading-6 mb-6">
            Sign up to our newsletter to receive<br />
            exclusive offers.
          </p>

          <input
            type="email"
            placeholder="E-mail"
            className="w-full bg-transparent border border-gray-600 px-4 py-3 text-sm mb-4 outline-none"
          />

          <button className="px-6 py-3 border border-white text-sm tracking-[0.25em] hover:bg-white hover:text-black transition">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto mt-20 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">

        <p>© 2025 — SIWA FRAGRANCES</p>

        {/* Payment Icons */}
        <div className="flex items-center gap-4 mt-6 md:mt-0">
          <img src="/mastercard.png" className="w-12" />
          <img src="/visa.png" className="w-12" />
        </div>
      </div>
    </footer>
  );
}
