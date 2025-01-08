import React from "react";
import { useTranslation } from "react-i18next"; // Import translation hook
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";

// Social Media Links Array
const socialMediaLinks = [
  { href: "https://www.facebook.com/people/Starktech-Ventures-Pvt-Ltd/100088583647521/", icon: <FaFacebook size={28} />, color: "hover:text-blue-500" },
  { href: "https://www.twitter.com", icon: <FaTwitter size={28} />, color: "hover:text-blue-400" },
  { href: "https://www.linkedin.com/in/starktech-ventures-pvt-ltd-685b3b258/", icon: <FaLinkedin size={28} />, color: "hover:text-blue-600" },
  { href: "https://www.instagram.com/starktech_ventures", icon: <FaInstagram size={28} />, color: "hover:text-pink-500" },
  { href: "https://www.youtube.com/channel/UCoY7ZxyXttHsIXGtFI5nJ8w", icon: <FaYoutube size={28} />, color: "hover:text-red-500" },
];

function Footer() {
  const { t } = useTranslation(); // Initialize translation function
  // bg-gradient-to-r text-black from-white via-purple-300 to-orange-500
  return (
    <div className="w-full gap-8 border-t border-gray-400 rounded-t-2xl">
      {/* Left Section */}
      <div className="flex md:px-10 lg:py-8 lg:px-14 flex-col md:flex-row py-8 px-4 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2" >
          <div >
            <Link to="/" className="hover:text-gray-700">
                <img className="w-52 mb-8 lg:mb-6 md:w-72" src={logo} alt="Company Logo" />
            </Link>
            <h1 className="uppercase text-black text-5xl md:text-6xl lg:text-[90px] leading-none tracking-tighter font-semibold">{t("footer.we")}</h1>
            <h1 className="uppercase text-black text-5xl md:text-6xl lg:text-[90px] leading-none tracking-tighter font-semibold">{t("footer.innovate")}</h1>
            <h1 className="uppercase text-black text-5xl md:text-6xl lg:text-[90px] leading-none tracking-tighter font-semibold">{t("footer.revolutions")}</h1>
            <p className="mt-4 lg:w-[85%] md:mt-8 text-sm md:text-base lg:text-lg capitalize font-medium">
              {t("footer.companyDescription")}
            </p>
          </div>
        

        {/* Right Section */}
        <div className="w-full flex flex-col gap-6">
          {/* Address Section */}
       
            <h3 className="uppercase text-lg md:text-xl lg:text-2xl font-semibold lg:mt-5 ">{t("footer.contactDetails")}</h3>
            <div className="flex flex-col md:space-y-1 space-y-3">
              <div className="flex text-black items-center gap-4">
                <FaEnvelope className="text-lg" />
                <p className="text-sm md:text-base font-medium">{t("footer.email")}</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-lg text-black" />
                <p className="text-sm md:text-base capitalize font-medium">{t("footer.phone")}</p>
              </div>
              <div className="flex items-center lg:w-[600px] gap-4">
                <FaMapMarkerAlt className="md:text-5xl lg:text-2xl text-3xl text-black" />
                <p className="text-sm md:text-base capitalize font-medium">{t("footer.address")}</p>
              </div>
            </div>
         

          {/* Useful Links Section */}
          <div>
            <h3 className="uppercase text-lg md:text-xl font-semibold lg:text-2xl mb-4 md:mb-3 lg:mb-5">{t("footer.usefulLinks")}</h3>
            <ul className="space-y-2 md:space-y-0 text-sm md:text-base capitalize font-medium">
              <li>
                <Link to="/products" className="hover:text-gray-700">
                  {t("footer.products")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-700">
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-gray-700">
                  {t("footer.terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="uppercase text-lg md:text-xl font-semibold mb-4 lg:mb-5 md:mb-3 lg:text-2xl">{t("footer.getConnected")}</h3>
            <p className="text-sm md:text-base capitalize font-medium mb-4 md:mb-3">{t("footer.socialFollow")}</p>
            <div className="flex gap-4">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-black ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* Copyright Section */}
      <div className="p-4 border-t text-center border-gray-400 capitalize text-xs md:text-sm font-medium">
        {t("footer.copyright")}
      </div>
    </div>
  );
}

export default Footer;
