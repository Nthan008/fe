// src/layouts/PageTransitionWrapper.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FullPageSpinner from "../components/FullPageSpinner";

export default function PageTransitionWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 400); // adjust delay if needed
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <FullPageSpinner />}
      {children}
    </>
  );
}
