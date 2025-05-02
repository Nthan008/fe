import { useContext, useRef, useState, useEffect } from "react";
import { FaSearch, FaUserCircle, FaSignOutAlt, FaHistory, FaTachometerAlt, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import imgProfile from "../assets/ImgProfile.png";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";

export default function Navbar() {
  const { isLoggedIn, userName, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
          <span className="navbar-title">Lost & Found</span>
        </div>
        <div className="flex items-center space-x-6">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="/lostitem" className="hover:underline text-sm font-bold" style={{ color: "#00137F" }}>
              Lost Items
            </a>
            <a href="#" className="hover:underline text-sm font-bold" style={{ color: "#00137F" }}>
              Our Team
            </a>
          </div>

          {isLoggedIn ? (
            <div className="profile-dropdown" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                <img
                  src={imgProfile}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-red-500 cursor-pointer"
                />
              </button>
              {dropdownOpen && (
                <div className="profile-dropdown-menu">
                  <a
                    href="/"
                    className="flex items-center px-4 py-2 text-sm font-bold hover:bg-gray-100"
                    style={{ color: "#00137F" }}
                  >
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </a>
                  <a
                    href="/claim-history"
                    className="flex items-center px-4 py-2 text-sm font-bold hover:bg-gray-100"
                    style={{ color: "#00137F" }}
                  >
                    <FaHistory className="mr-2" /> Claim History
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm font-bold text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/signin">
              <button className="bg-[#3674B5] text-[#D1FAE5] px-5 py-2 rounded-full hover:opacity-90 text-sm">
                Sign In
              </button>
            </a>
          )}

          {/* Mobile Menu */}
          <div className="mobile-menu md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-button">
              <FaBars />
            </button>
            {menuOpen && (
              <div className="mobile-menu-dropdown">
                <a href="/lostitem">
                  <FaTachometerAlt className="mr-2" /> Lost Items
                </a>
                <a href="#">
                  <FaHistory className="mr-2" /> Our Team
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
