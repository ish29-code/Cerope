import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { imgs } from "../assets/assets"; // Adjust path if needed
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid Email ID!";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      // ✅ Call backend login API
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = res.data;

      // ✅ Save token (persist login)
      if (formData.remember) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Optionally save user info
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect to profile
      navigate("/profile");
    } catch (err) {
      setErrors({
        api: err.response?.data?.message || "Login failed, try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-center flex-grow px-0 py-12 md:py-16 md:px-12 gap-10 mt-0 md:mt-28">
        {/* Image Section */}
        <div className="w-full md:w-1/4 flex justify-center order-1 md:order-2 relative">
          <img
            src={imgs.login_img}
            alt="Fashion Model"
            className="rounded-lg shadow-lg h-[420px] md:max-h-[420px] w-full object-cover transform scale-x-[-1] md:scale-x-100"
          />
        </div>

        {/* Form Section */}
        <div
          className="
            w-95 md:w-1/2 md:max-w-md bg-white p-5 rounded-xl shadow-lg 
            order-2 md:order-1
            -mt-50 md:mt-0   
            relative z-10
          "
        >
          <h2 className="text-2xl font-semibold text-center mb-2">
            Welcome Back to Cerope
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Your personalized fashion journey awaits.
          </p>

          {errors.api && (
            <p className="text-red-500 text-sm text-center mb-3">
              {errors.api}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full border rounded-md p-3 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full border rounded-md p-3 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) =>
                    setFormData({ ...formData, remember: e.target.checked })
                  }
                />
                <span>Remember me</span>
              </label>
              <a href="/forgot" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white rounded-md py-3 font-semibold hover:bg-gray-800 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                className="flex-1 border rounded-md py-2.5 flex items-center justify-center hover:bg-gray-100"
              >
                <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                className="flex-1 border rounded-md py-2.5 flex items-center justify-center hover:bg-gray-100"
              >
                <img src="/apple.svg" alt="Apple" className="w-5 h-5 mr-2" />
                Apple
              </button>
            </div>
          </form>

          {/* Sign Up Redirect */}
          <p className="text-center mt-5 text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Footer only visible on desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
