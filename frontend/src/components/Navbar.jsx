import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo/logo.png";

function Navbar() {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation();
  
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    const savedLanguage = sessionStorage.getItem("currentLanguage");
    return savedLanguage || "en";
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      
      setVisible(isScrollingUp || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem("currentLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "mr" : "en";
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    sessionStorage.setItem("currentLanguage", newLang);
    window.location.reload();
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    };    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t("navbar.home"), path: "/" },
    { name: t("navbar.ourProducts"), path: "/products" },
    { name: "Our Services", path: "/services" },
    { name: t("navbar.aboutUs"), path: "/about" },
    { name: t("navbar.careers"), path: "/careers" },
    { name: "BHM", path: "https://bhm.starktechventures.com/" },
    { name: t("navbar.contactUs"), path: "/contact" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const menuItemVariants = {
    closed: { y: -20, opacity: 0 },
    open: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const navbarVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 }
  };

  return (
    <motion.nav
      animate={visible ? "visible" : "hidden"}
      variants={navbarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${isOpen ? 'bg-white rounded-b-2xl' : 'bg-transparent rounded-none'} backdrop-blur-sm border-b border-gray-400 fixed w-full px-4 lg:px-14 sm:px-8 md:px-10 md:py-6 py-4 lg:py-3 flex flex-col lg:flex-row justify-between items-center z-[999]`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="w-44 md:w-60 lg:w-64">
          <Link to="/">
            <img src={logo} alt="logo" className="w-full" />
          </Link>
        </div>
        <button
          onClick={toggleLanguage}
          className="bg-[#502380] text-white px-6 py-2 rounded-full lg:mr-14"
        >
          {language === "en" ? t("navbar.switchToMarathi") : t("navbar.switchToEnglish")}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex flex-col gap-2 md:gap-3"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? (isMediumScreen ? 23 : 15) : 0,
            }}
            className="w-8 md:w-12 h-1 bg-black block"
          />
          <motion.span
            animate={{
              opacity: isOpen ? 0 : 1,
            }}
            className="w-8 md:w-12 h-1 bg-black block"
          />
          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -8 : 0,
            }}
            className="w-8 md:w-12 h-1 bg-black block"
          />
        </button>
      </div>

      <div className="hidden lg:flex lg:items-center lg:gap-12">
        {navLinks.map((item, index) => (
          <div key={index} className="whitespace-nowrap">
            <Link
              to={item.path}
              className="lg:text-xl md:text-base text-[#502380] capitalize relative"
            >
              {item.name}
              {location.pathname === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-[#502380]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                />
              )}
            </Link>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="lg:hidden w-full overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div 
              className="flex flex-col items-center gap-6 py-6 bg-blend-normal"
            >
              {navLinks.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={menuItemVariants}
                  className="relative"
                >
                  <Link
                    to={item.path}
                    className="text-lg capitalize font-medium text-[#502380] transition-colors relative"
                  >
                    {item.name}
                    {location.pathname === item.path && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-[1px] bg-[#502380]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;