export default function FooterComponent() {
  return (
    <div className="w-full p-10 border border-gray-200 shadow-3xl">

      <div className="flex flex-col md:flex-row justify-between gap-10">

        {/* LEFT */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center">
            <img
              src="../images/shoppi-icon.png"
              className="w-16 h-12"
              alt="Shoppi"
            />

            <h1 className="text-2xl md:text-3xl font-bold text-red-500">
              Shoppi
            </h1>
          </div>

          <h3 className="mt-2 text-sm text-gray-500">
            Order food online since 2026!
          </h3>

          <h3 className="mt-6 md:mt-10 text-sm text-gray-400">
            © 2026 Shoppi. All rights reserved.
          </h3>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">

          <div className="flex flex-col gap-2 text-center md:text-left">
            <a href="#" className="text-black hover:text-red-500">
              Help
            </a>

            <a href="#" className="text-gray-500 hover:text-red-500">
              FAQ
            </a>

            <a href="#" className="text-gray-500 hover:text-red-500">
              Home
            </a>

            <a href="#" className="text-gray-500 hover:text-red-500">
              Contact us
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}