import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import  { imgs } from "../assets/assets"; // Adjust the path as necessary

const Navbar = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Pages with minimal navbar
  const minimalPages = ["/setup", "/login", "/register"];
  const isMinimal = minimalPages.includes(pathname);

  const isProfilePage = pathname === "/profile";

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50 shadow-sm rounded-b-[40px]">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={imgs.logo_cerope} alt="Logo" className="h-9 w-auto md:h-20" />
            <span className="hidden md:inline font-bold text-xl ">Cerope</span>
          </Link>

          {/* ✅ Explore More (ONLY on profile page & desktop, next to logo) */}
          {isProfilePage && (
            <div className="hidden md:block">
              <Link
                to="/explore"
                className="ml-3 px-5 py-2 text-sm font-semibold rounded-full 
                           bg-gradient-to-r from-purple-500 to-pink-500 
                           text-white shadow-md hover:opacity-90 transition"
              >
                Explore More ✨
              </Link>
            </div>
          )}
        </div>

        {/* ✅ Mobile Layout (Logo + Searchbar + Avatar) */}
        <div className="flex md:hidden flex-1 items-center justify-between px-0">
          {/* Searchbar */}
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 mx-3 px-3 py-1 text-sm border rounded-full shadow-sm outline-none"
          />

          {/* Avatar */}
          <img
            src={imgs.avtar_nav}
            alt="Profile"
            className="h-10 w-10 rounded-full border cursor-pointer"
          />
        </div>

        {/* ✅ Desktop Layout */}
        <div className="hidden md:flex items-center space-x-6">
          {isMinimal ? (
            <>
              {/* Explore More button */}
              <Link
                to="/explore"
                className="px-5 py-2 text-sm font-semibold rounded-full 
                           bg-gradient-to-r from-purple-500 to-pink-500 
                           text-white shadow-md hover:opacity-90 transition"
              >
                Explore More ✨
              </Link>

              {/* Profile Avatar */}
              <img
                src={imgs.avtar_nav}
                alt="Profile"
                className="h-10 w-10 rounded-full border cursor-pointer"
              />
            </>
          ) : (
            <>
              {/* Explore More (NOT on /profile, stays right side) */}
              {!isProfilePage && (
                <Link
                  to="/explore"
                  className="px-5 py-2 text-sm font-semibold rounded-full 
                             bg-gradient-to-r from-purple-500 to-pink-500 
                             text-white shadow-md hover:opacity-90 transition"
                >
                  Explore More ✨
                </Link>
              )}

              {/* Nav Links */}
              <Link
                to="/"
                className={`text-sm font-medium ${
                  pathname === "/" ? "text-blue-600 underline" : "text-black"
                }`}
              >
                Home
              </Link>

              <div className="relative group">
                <button className="text-sm font-medium text-black hover:text-blue-600">
                  Know My Vibe ▾
                </button>
                <div className="absolute hidden group-hover:block bg-white border rounded shadow-lg mt-2 w-44">
                  <Link to="/vibe1" className="block px-4 py-2 hover:bg-gray-50">
                    Vibe 1
                  </Link>
                  <Link to="/vibe2" className="block px-4 py-2 hover:bg-gray-50">
                    Vibe 2
                  </Link>
                </div>
              </div>

              <Link
                to="/wardrobe"
                className={`text-sm font-medium ${
                  pathname === "/wardrobe"
                    ? "text-blue-600 underline"
                    : "text-black"
                }`}
              >
                My Wardrobe
              </Link>
              <Link
                to="/ai-pal"
                className={`text-sm font-medium ${
                  pathname === "/ai-pal"
                    ? "text-blue-600 underline"
                    : "text-black"
                }`}
              >
                Ask AI Pal
              </Link>
              <Link
                to="/plan-outfit"
                className={`text-sm font-medium ${
                  pathname === "/plan-outfit"
                    ? "text-blue-600 underline"
                    : "text-black"
                }`}
              >
                Plan Outfit
              </Link>

              {/* Profile Avatar */}
              <img
                src={imgs.avtar_nav}
                alt="Profile"
                className="h-11 w-11 rounded-full border cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
