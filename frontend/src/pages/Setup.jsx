import { useState } from "react"; 
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { imgs, avatars } from "../assets/assets";

function Setup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "",
    dob: "",
    stylePreference: "",
    phoneNumber: "",
    country: "",
    city: "",
    profilePicture: "", 
  });

const [showAvatars, setShowAvatars] = useState(false);
const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const payload = {
      ...formData,             
      profilePic: profilePic,  
    };

    const res = await axios.post(
      "http://localhost:5000/api/profile",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Profile setup successful:", res.data);
    navigate("/profile"); // redirect to profile page
  } catch (err) {
    console.error("❌ Profile setup failed:", err.response?.data || err.message);
    alert("Failed to setup profile");
  }
};


  return (
    <>
      <Navbar />

      {/* Mobile Banner Image (only visible on phone) */}
      <div className="w-98 object-cover p-10 md:hidden">
        <img
          src={imgs.setup_img}
          alt="Profile Banner"
          className="w-98 object-cover"
        />
      </div>

      <div className="min-h-screen p-15 bg-gradient-to-b from-white to-gray-100 flex justify-center items-start px-0 py-0 md:py-14">
        <div className="w-full max-w-md md:max-w-6xl bg-white rounded-2xl shadow-md p-6 md:p-10 relative -mt-50 md:mt-12">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Side - Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-5 md:space-y-8"
            >
              <h2 className="text-lg md:text-2xl font-bold mb-2 md:mb-6 text-center md:text-left">
                Set up Your User Account
              </h2>

              {/* First Name */}
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">First Name *</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full border rounded-md p-2 border-gray-300"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Last Name *</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full border rounded-md p-2 border-gray-300"
                />
              </div>

              {/* Profile Picture */}
              <div className="flex flex-col space-y-2 items-center md:items-start">
                <label className="block text-sm font-medium self-start md:self-auto">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-3 w-full md:w-auto justify-center md:justify-start">
                  <img
                    src={formData.profilePicture || imgs.default_setup_img}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border border-gray-300 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAvatars(!showAvatars)}
                    className="flex-1 border rounded-md px-4 py-2 border-gray-300 bg-white flex items-center justify-between max-w-[200px]"
                  >
                    <span className="text-gray-500 w-60">Select your Avatar</span>
                    <span className="ml-2">▾</span>
                  </button>
                </div>

                {showAvatars && (
                  <div className="relative z-10 mt-3 bg-white border rounded-md shadow-lg p-3 grid grid-cols-3 sm:grid-cols-4 gap-3 w-full max-w-xs mx-auto md:mx-0">
                    {avatars.map((avatar, index) => (
                      <img
                        key={index}
                        src={avatar}
                        alt={`Avatar ${index + 1}`}
                        className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                          formData.profilePicture === avatar
                            ? "border-black"
                            : "border-transparent"
                        }`}
                        onClick={() => {
                          setFormData({ ...formData, profilePicture: avatar });
                          setShowAvatars(false);
                        }}
                      />
                    ))}
                    <div className="col-span-3 sm:col-span-4 text-center">
                      <button
                        type="button"
                        onClick={() => setShowAvatars(false)}
                        className="mt-2 bg-black text-white rounded-md px-4 py-1 text-sm"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className="w-full border rounded-md p-2 border-gray-300"
                />
              </div>

              {/* Style Preference */}
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Style Preference *</label>
                <div className="flex space-x-6">
                  <label>
                    <input
                      type="radio"
                      name="style"
                      value="Men"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stylePreference: e.target.value,
                        })
                      }
                    />{" "}
                    Men
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="style"
                      value="Women"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stylePreference: e.target.value,
                        })
                      }
                    />{" "}
                    Women
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="style"
                      value="Both"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stylePreference: e.target.value,
                        })
                      }
                    />{" "}
                    Both
                  </label>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col space-y-2">
                <label className="block text-sm font-medium">Phone Number</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full border rounded-md p-2 border-gray-300"
                />
              </div>

              {/* Country (Mobile only) */}
              <div className="flex flex-col space-y-2 md:hidden">
                <label className="block text-sm font-medium">Country *</label>
                <input
                  type="text"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full border rounded-md p-2 border-gray-300"
                />
              </div>

              {/* City (Mobile only) */}
              <div className="flex flex-col space-y-2 md:hidden">
                <label className="block text-sm font-medium">City *</label>
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full border rounded-md p-2 border-gray-300 bg-white"
                >
                  <option value="">Select location</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="New York">New York</option>
                </select>
              </div>
            </form>

            {/* Right Side - Image & Country/City (Desktop only) */}
            <div className="hidden md:flex flex-col space-y-4 items-center">
              <img
                src={imgs.setup_img}
                alt="Fashion Model"
                className="rounded-2xl shadow-lg w-[300px] h-[480px] object-cover"
              />

              {/* Country */}
              <div className="w-full flex flex-col space-y-3">
                <label className="block text-sm font-medium">Country *</label>
                <input
                  type="text"
                  placeholder="Enter country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full border rounded-md p-2 border-gray-300"
                />
              </div>

              {/* City */}
              <div className="w-full flex flex-col space-y-1">
                <label className="block text-sm font-medium">City *</label>
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full border rounded-md p-2 border-gray-300 bg-white"
                >
                  <option value="">Select location</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="New York">New York</option>
                </select>
              </div>
            </div>
          </div>

          {/* Continue Button - Centered Outside Both Columns */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-black text-white rounded-md w-full md:w-auto px-12 md:px-40 py-3 font-semibold hover:bg-gray-800"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setup;
























