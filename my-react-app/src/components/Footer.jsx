import { FaGithub, FaInstagram, FaGlobe } from "react-icons/fa";
import logo from "../assets/logo.png"; // Import the logo image

export default function Footer() {
  return (
    <footer className="bg-[#001F40] text-white py-6 mt-0">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-6 h-6" /> {/* Replace FaSearch with logo */}
          <span>Lost & Found</span>
        </div>
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:underline">Lost Items</a>
          <a href="#" className="hover:underline">Our Team</a>
        </div>
        <div className="flex space-x-4 text-lg">
          <FaInstagram />
          <FaGithub />
          <FaGlobe />
        </div>
        <p className="text-xs mt-2 text-center">Lost and Found v1.0<br />Copyright©2025</p>
      </div>
    </footer>
  );
}
