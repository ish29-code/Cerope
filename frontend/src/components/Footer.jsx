import { imgs } from "../assets/assets";
const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-30 px-8 pt-30 " >
      <div className="grid md:grid-cols-4 gap-20 max-w-6xl mx-auto">
        {/* Logo + Tagline */}
        <div>
          <div className="flex items-center space-x-0 ">
            <img
              src={imgs.footer_logo} // replace with your logo path
              alt="Cerope Logo"
              className="w-20 h-15 object-contain"
            />

            {/* Brand Name */}
            <h2 className="text-white font-bold text-5xl font-sf">Cerope</h2>
          </div>

          <p className="max-w-md text-center p-3 mt-4">
               Revolutionizing fashion with AI-powered styling solutions.
          </p>

        </div>  

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Contact Us</li>
            <li>About</li>
            <li>Features</li>
            <li>FAQ's</li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="font-semibold text-white mb-3">Products</h3>
          <ul className="space-y-2">
            <li>User Styling ~ Launching Soon</li>
            <li>Price Comparison</li>
            <li>Creator Space</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="font-semibold text-white mb-3">Policies</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Copyright Policy</li>
            <li>Cookie Policy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        ©2025 Cerope. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
