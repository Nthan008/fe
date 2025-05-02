import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage"; // Import HomePage
import LostItems from "./pages/LostItems"; // Import lostitem
import RequestMeeting from "./pages/request-meeting";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Set HomePage as the default route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/lostitem" element={<LostItems />} />
        <Route path="/request-meeting" element={<RequestMeeting />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}
