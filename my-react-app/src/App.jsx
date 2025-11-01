// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LostItems from "./pages/LostItems";
import RequestMeeting from "./pages/request-meeting";
import ClaimHistory from "./pages/ClaimHistory";
import UserDashboard from "./pages/user-dashboard";
import Profile from "./pages/profile";
import { Toaster } from "react-hot-toast";
import PageTransitionWrapper from "./layouts/PageTransitionWrapper";

function AppRoutes() {
  return (
    <PageTransitionWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/lostitem" element={<LostItems />} />
        <Route path="/request-meeting" element={<RequestMeeting />} />
        <Route path="/claim-history" element={<ClaimHistory />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </PageTransitionWrapper>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Footer />
      <Toaster />
    </Router>
  );
}
