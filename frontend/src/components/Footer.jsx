import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaBoxOpen,
  FaFileAlt 
} from "react-icons/fa";
import { RiContactsBookFill } from "react-icons/ri";


import { PiXLogo } from "react-icons/pi";

import { Link } from "react-router-dom";
import logo from "../assets/logo/logo.png";

const socialMediaLinks = [
  {
    href: "https://www.facebook.com/people/Starktech-Ventures-Pvt-Ltd/100088583647521/",
    icon: <FaFacebook size={28} />,
    color: "hover:text-blue-500",
  },
  {
    href: "https://www.x.com",
    icon: <PiXLogo size={28} />,
    color: "hover:text-blue-400",
  },
  {
    href: "https://www.linkedin.com/in/starktech-ventures-pvt-ltd-685b3b258/",
    icon: <FaLinkedin size={28} />,
    color: "hover:text-blue-600",
  },
  {
    href: "https://www.instagram.com/starktech_ventures",
    icon: <FaInstagram size={28} />,
    color: "hover:text-pink-500",
  },
  {
    href: "https://www.youtube.com/channel/UCoY7ZxyXttHsIXGtFI5nJ8w",
    icon: <FaYoutube size={28} />,
    color: "hover:text-red-500",
  },
];

function Footer() {
  const { t } = useTranslation();

  return (
    <div className="w-full gap-8 border-t border-gray-400 rounded-t-2xl">
      <div className="md:px-10 lg:py-8 lg:px-14 py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
          <div>
            <Link to="/" className="hover:text-gray-700">
              <img
                className="w-52 mb-8 lg:mb-6 md:w-72"
                src={logo}
                alt="Company Logo"
              />
            </Link>
            <h1 className="uppercase text-black text-5xl md:text-5xl lg:text-[70px] leading-none tracking-tighter font-semibold">
              {t("footer.we")}
            </h1>
            <h1 className="uppercase text-black text-5xl md:text-5xl lg:text-[70px] leading-none tracking-tighter font-semibold">
              {t("footer.innovate")}
            </h1>
            <h1 className="uppercase text-black text-5xl md:text-5xl lg:text-[70px] leading-none tracking-tighter font-semibold">
              {t("footer.revolutions")}
            </h1>
            <p className="mt-4 lg:w-[85%] md:mt-8 text-sm md:text-base lg:text-lg capitalize font-medium">
              {t("footer.companyDescription")}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="uppercase text-lg md:text-xl lg:text-2xl font-semibold lg:mt-5 mb-5 lg:mb-5">
                {t("footer.contactDetails")}
              </h3>
              <div className="flex flex-col md:space-y-1 space-y-3">
                

                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-lg text-black" />
                  <p className="text-sm md:text-base capitalize text-[#502380] hover:underline font-medium">
                    <a href="tel:7620864615">{t("footer.phone")}</a>
                  </p>
                </div>
                <div className="flex items-center lg:w-[600px] gap-4">
                  <FaMapMarkerAlt className="md:text-3xl lg:text-xl text-3xl text-black" />
                  <p className="text-sm md:text-base capitalize font-medium">
                    <a
                      href="https://www.google.com/maps/place/Starktech+Ventures+Pvt.+Ltd./@17.0602692,74.2809961,17.93z/data=!4m6!3m5!1s0x3bc1753c4e06b1bb:0x52d0e209197483ae!8m2!3d17.0602964!4d74.2809905!16s%2Fg%2F11rpdhft85?hl=en&entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-[#502380]"
                    >
                      {t("footer.address")}
                    </a>
                  </p>
                </div>
                <div className="flex text-black items-center gap-4">
                  <FaEnvelope className="text-lg" />
                  <p className="text-sm md:text-base hover:underline text-[#502380] font-medium">
                    <a href="mailto:director@starktechventures.com">
                      {t("footer.email")}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="uppercase text-lg md:text-xl font-semibold lg:text-2xl mb-4 md:mb-3 lg:mb-5">
                {t("footer.usefulLinks")}
              </h3>
              <ul className="space-y-2 md:space-y-2 text-sm md:text-base capitalize font-medium">
              <li>
                  <Link
                    to="/contact"
                    className="text-[#502380] flex gap-4 hover:underline"
                  >
                    <RiContactsBookFill className="text-xl text-black" /> 

                    {t("footer.contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-[#502380] flex gap-4 hover:underline "
                  >                  <FaBoxOpen  className="text-xl text-black" />

                    {t("footer.products")}
                  </Link>
                </li>
               
                <li>
                  <Link to="/terms" className="text-[#502380] flex gap-4 hover:underline">
                  <FaFileAlt  className="text-xl text-black" />

                    {t("footer.terms")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="uppercase text-lg md:text-xl font-semibold mb-4 lg:mb-5 md:mb-3 lg:text-2xl">
                {t("footer.getConnected")}
              </h3>
              <p className="text-sm md:text-base capitalize font-medium mb-4 md:mb-3">
                {t("footer.socialFollow")}
              </p>
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

      <div className="p-4 border-t text-center border-gray-400 flex flex-col lg:px-14">
        <span className=" capitalize text-xs md:text-sm font-medium">
          {t("footer.copyright")}
        </span>
        <span className="text-xs">
          Designed and Developed by{" "}
          <a
            href="https://darkcodetech.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#502380] hover:underline"
          >
            DarkCodeTech
          </a>
        </span>
      </div>
    </div>
  );
}

export default Footer;
