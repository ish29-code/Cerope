import { useState } from "react";
import Navbar from "../components/Navbar";
import { imgs, avatars } from "../assets/assets"; // Adjust the path as necessary
import { Pencil } from "lucide-react"; // ✅ Pencil Icon from lucide-react

const Profile = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
  });

  const [profilePic, setProfilePic] = useState(imgs.default_setup_img);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false); // ✅ Track if saved

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.number ||
      !form.gender ||
      !form.dob.day ||
      !form.dob.month ||
      !form.dob.year
    ) {
      setError("⚠ Please fill in all required fields.");
      return;
    }
    setError("");
    setIsSaved(true); // ✅ Switch to "Edit"
    alert("✅ Profile saved successfully!");
  };

  const handleEdit = () => {
    setIsSaved(false); // ✅ Switch back to "Save"
  };

  return (
    <>
      <Navbar />
      <div className="w-full px-6 py-8 bg-gray-50 min-h-screen mt-16 sm:mt-20 lg:mt-28">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow p-6">
          {/* Title + Save/Edit Button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-left mb-4 sm:mb-0">
              Profile
            </h2>

            {/* ✅ Toggle Save / Edit */}
            {!isSaved ? (
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-black text-white rounded-md cursor-pointer hover:opacity-90 w-full sm:w-auto"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 w-full sm:w-auto"
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </button>
            )}
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ✅ Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4 order-1 lg:order-2">
              <img
                src={profilePic}
                alt="Profile"
                className="h-28 w-28 rounded-full border-4 border-yellow-200 object-cover"
              />

              <div className="w-full relative max-w-xs">
                <button
                  type="button"
                  className="w-full border rounded-md px-3 py-2 text-sm text-gray-600 flex justify-between items-center cursor-pointer"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  Change Profile Picture ▼
                </button>

                {showDropdown && (
                  <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg p-4 z-10">
                    <div className="grid grid-cols-5 gap-3">
                      {avatars.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Avatar ${i}`}
                          onClick={() => setProfilePic(src)}
                          className={`h-12 w-12 rounded-full cursor-pointer border ${
                            profilePic === src
                              ? "border-black"
                              : "border-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <button className="mt-4 w-full border rounded-md py-2 hover:bg-gray-100">
                      Select
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ✅ Form Section */}
            <div className="lg:col-span-2 space-y-6 bg-gray-50 rounded-xl p-6 order-2 lg:order-1">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Personal Details
              </h3>

              {/* First + Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="Enter first name"
                    required
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                    disabled={isSaved} // ✅ Disable on saved
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Enter last name"
                    required
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                    disabled={isSaved}
                  />
                </div>
              </div>

              {/* Email + Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter email"
                    required
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                    disabled={isSaved}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Number *
                  </label>
                  <input
                    type="text"
                    value={form.number}
                    onChange={(e) => handleChange("number", e.target.value)}
                    placeholder="Enter phone number"
                    required
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                    disabled={isSaved}
                  />
                </div>
              </div>

              {/* Gender + DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Gender *
                  </label>
                  <div className="flex items-center space-x-4">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center space-x-1">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={form.gender === g}
                          onChange={() => handleChange("gender", g)}
                          required
                          className="accent-black cursor-pointer"
                          disabled={isSaved}
                        />
                        <span className="text-sm">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    DOB *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={form.dob.day}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          dob: { ...prev.dob, day: e.target.value },
                        }))
                      }
                      placeholder="DD"
                      required
                      className="w-12 border rounded-md px-2 py-2 text-sm text-center"
                      disabled={isSaved}
                    />
                    <input
                      type="text"
                      value={form.dob.month}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          dob: { ...prev.dob, month: e.target.value },
                        }))
                      }
                      placeholder="MM"
                      required
                      className="w-12 border rounded-md px-2 py-2 text-sm text-center"
                      disabled={isSaved}
                    />
                    <input
                      type="text"
                      value={form.dob.year}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          dob: { ...prev.dob, year: e.target.value },
                        }))
                      }
                      placeholder="YYYY"
                      required
                      className="w-20 border rounded-md px-2 py-2 text-sm text-center"
                      disabled={isSaved}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
