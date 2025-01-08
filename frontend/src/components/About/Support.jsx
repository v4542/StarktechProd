import React from 'react';
// Import all images here
import dippLogo from "../../assets/spons/1.png";
import dstNidhiLogo from "../../assets/spons/2.png";
import startupIndiaLogo from "../../assets/spons/3.png";
import bhauLogo from "../../assets/spons/4.png";
import sarthiLogo from "../../assets/spons/5.png";
import niamLogo from "../../assets/spons/6.png";
import nabiLogo from "../../assets/spons/7.png";
import vignanLogo from "../../assets/spons/8.png";
import anbitLogo from "../../assets/spons/9.png";
import businessLogo from "../../assets/spons/10.png";
import ele from "../../assets/spons/11.png";
import twe from "../../assets/spons/12.png";
import { useTranslation } from "react-i18next"; // Import translation hook

// Image data array
const logos = [
  { id: 1, src: dippLogo, alt: "DPIIT" },
  { id: 2, src: dstNidhiLogo, alt: "DST NIDHI" },
  { id: 3, src: startupIndiaLogo, alt: "Startup India" },
  { id: 4, src: bhauLogo, alt: "Bhau Institute" },
  { id: 5, src: sarthiLogo, alt: "Sarthi" },
  { id: 6, src: niamLogo, alt: "NIAM" },
  { id: 7, src: nabiLogo, alt: "NABI" },
  { id: 8, src: vignanLogo, alt: "Vignan Incubator" },
  { id: 9, src: anbitLogo, alt: "ANBIT" },
  { id: 10, src: businessLogo, alt: "Business Incubator" },
  { id: 11, src: ele, alt: "Business Incubator" },
  { id: 12, src: twe, alt: "Business Incubator" },
];

function Support() {
    const { t } = useTranslation(); // Initialize translation function
  
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Title Section */}
      <div className="w-full py-8 md:px-10 px-4 flex lg:px-14 flex-col gap-4 border-b border-gray-400">
        <h2 className="text-4xl lg:text-7xl md:text-5xl text-[#502380] tracking-tight font-bold uppercase ">
          {t("support.supported_by_title")}
        </h2>
        <p className="text-sm md:text-base lg:text-lg font-light capitalize text-gray-700 italic ">
          {t("support.support_description")}
        </p>
      </div>
      <div className="grid pt-3 pb-8 lg-pb-0 w-full  lg:py-14 px-8 md:px-20 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 mx-auto place-items-center ">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="bg-white p-4 rounded-lg shadow-md hover:scale-125 transform hover:shadow-lg transition-shadow lg:transition-transform lg:duration-500 duration-300"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-24 h-24 lg:w-32 lg:h-32"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Support;
