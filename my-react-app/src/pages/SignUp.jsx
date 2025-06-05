import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idCard: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Password rule: at least 6 chars, at least 1 uppercase, 1 lowercase, and (number or symbol)
  const isPasswordValid = (password) => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[\d\W]/.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing fields
    if (
      !formData.idCard.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Password rule check
    if (!isPasswordValid(formData.password)) {
      toast.error(
        "Password must be at least 6 characters, include uppercase, lowercase, and a number or symbol."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idCard: formData.idCard,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        toast.success("Registration successful! Please sign in.");
        navigate("/signin");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4"> 
      <h2 className="text-2xl font-bold mb-1">Register your account</h2>
      <p className="text-sm mb-6 text-gray-600">to claim the lost item</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 px-4"> 
        <div>
          <label className="block mb-1 text-sm font-medium">Your ID Card/Student ID:</label>
          <input
            type="text"
            name="idCard"
            value={formData.idCard}
            onChange={handleChange}
            className="w-full border border-blue-400 rounded-md px-3 py-2 focus:outline-none"
            placeholder="Enter your ID or Student ID"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-blue-400 rounded-md px-3 py-2 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-blue-400 rounded-md px-3 py-2 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="relative">
          <label className="block mb-1 text-sm font-medium">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-blue-400 rounded-md px-3 py-2 pr-10 focus:outline-none"
            placeholder="Enter your password"
          />
          <FaEyeSlash className="absolute right-3 top-[37px] text-gray-600 cursor-pointer" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border border-blue-400 rounded-md px-3 py-2 focus:outline-none"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0F172A] text-white py-2 rounded-md hover:opacity-90"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
