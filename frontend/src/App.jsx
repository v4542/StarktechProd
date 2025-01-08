import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Careers from "./components/Careers";
import Products from "./components/Products";
import ContactUs from "./components/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import { GoArrowUp } from "react-icons/go";
import About from "./components/About";
import logo from "./assets/logo/logo.png"
import LoadingScreen from "./components/Loading";
import WhatsAppButton from './components/Whatsapp';


function App() {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  
  // Use sessionStorage to track if it's the first load
  const [isInitialLoad, setIsInitialLoad] = useState(() => {
    return !sessionStorage.getItem('hasLoaded');
  });

  // Handle initial loading only on first visit
  useEffect(() => {
    if (isInitialLoad) {
      // Set the flag in sessionStorage
      sessionStorage.setItem('hasLoaded', 'true');
      
      // Remove loading screen after delay
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 1000); // Adjust timing as needed

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Show loading screen only on initial load
  if (isInitialLoad) {
    return <LoadingScreen logo={logo} />;
  }

  return (
    <Router>
      <ScrollToTop />
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </main>
        </div>
        <Footer />
        <WhatsAppButton phoneNumber="1234567890" />

        
        {/* Scroll to Top Button */}
        {showScrollTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed  md:bottom-8 bottom-[90px] right-5 md:right-28 bg-transparent border-black backdrop-blur-md flex items-center justify-center w-14 h-14 shadow-lg text-xl rounded-full border-[1px] hover:bg-[#3b1a60] hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <GoArrowUp size={20} />
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;