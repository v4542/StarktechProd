import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top-left of the page
  }, [pathname]); // Runs every time the pathname changes

  return null; // This component doesn't render anything
};

export default ScrollToTop;
