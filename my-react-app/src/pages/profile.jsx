import { useState } from "react";
import { FaUser, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  // Dummy user data
  const [user, setUser] = useState({
    name: "Juwono",
    email: "testtest@gmail.com",
    phone: "+62 812-3456-7890",
    memberSince: "March 2024",
    claims: 15,
    found: 42,
  });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const navigate = useNavigate();

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      name: form.name,
      phone: form.phone,
    }));
    setEditMode(false);
  };

  return (
    <div className="bg-[#F7F9FB] min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-1" style={{ color: "#030069" }}>
          Hello, {user.name} <span role="img" aria-label="wave">👋</span>
        </h1>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-8">
          <FaUser className="mr-1" /> User
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-2 flex flex-col">
            <div className="bg-white rounded-xl shadow p-8 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-semibold">Profile Information</div>
                <button
                  className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 text-sm font-medium hover:bg-gray-100"
                  onClick={() => {
                    setEditMode((v) => !v);
                    setForm({
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                    });
                  }}
                >
                  <FaRegEdit /> Edit
                </button>
              </div>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">
                  {user.name[0]}
                </div>
                <div>
                  <div className="text-lg font-semibold">{user.name}</div>
                  <div className="text-gray-500 text-sm">Member since {user.memberSince}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Full Name</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700"
                    value={form.name}
                    disabled={!editMode}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email Address</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700"
                    value={form.email}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Phone Number</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700"
                    value={form.phone}
                    disabled={!editMode}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Member Since</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700"
                    value={user.memberSince}
                    disabled
                  />
                </div>
              </div>
              {editMode && (
                <div className="flex justify-end mt-6">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Activity Summary */}
          <div className="flex flex-col">
            <div className="bg-white rounded-xl shadow p-8 flex flex-col h-full">
              <div className="text-xl font-semibold mb-6">Activity Summary</div>
              <div className="bg-blue-50 rounded-lg py-4 flex flex-col items-center mb-4">
                <span className="text-3xl font-bold text-blue-600">{user.claims}</span>
                <span className="text-gray-500 text-sm mt-1">Total Claims Made</span>
              </div>
              <div className="bg-green-50 rounded-lg py-4 flex flex-col items-center mb-8">
                <span className="text-3xl font-bold text-green-600">{user.found}</span>
                <span className="text-gray-500 text-sm mt-1">Items Reported Found</span>
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md mt-auto"
                onClick={() => navigate("/claim-history")}
              >
                View Claim History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}