import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function SignIn() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!email.trim() || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // Update global state
        toast.success("Login successful!");
        navigate("/");
      } else {
        const data = await response.json();
        // Show error from backend or a generic message
        toast.error(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-2xl font-bold mb-6">Sign In to your account</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 px-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-blue-400 rounded-md px-3 py-2 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Password</label>
            <a
              href="/forgot-password"
              className="text-xs text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            className="w-full border border-blue-400 rounded-md px-3 py-2 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#0F172A] text-white py-2 rounded-md hover:opacity-90"
        >
          Sign In
        </button>
      </form>
      <p className="text-sm mt-4">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="text-blue-600 font-semibold hover:underline"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
}
