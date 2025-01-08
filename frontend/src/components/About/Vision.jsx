import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { GiSupersonicArrow } from "react-icons/gi";
import { useTranslation } from "react-i18next";

function Vision() {
  const { t } = useTranslation();
  const userLang = sessionStorage.getItem('currentLanguage') || 'en';
  const [isHovering, setHovering] = useState(false);

  const cardData = [
    {
      icon: FaEye,
      title: t("visionAndMission.vision_title"),
      description: t("visionAndMission.vision_description"),
      iconBgColor: "bg-orange-200",
      iconColor: "text-[#502380]",
    },
    {
      icon: GiSupersonicArrow,
      title: t("visionAndMission.mission_title"),
      description: t("visionAndMission.mission_description"),
      iconBgColor: "bg-orange-200",
      iconColor: "text-[#502380]",
    },
  ];

  // Function to render title based on language
  const renderTitle = (title) => {
    if (userLang === 'mr') {
      // For Marathi, render without animation
      return (
        <h3 className="uppercase font-semibold text-3xl lg:text-5xl tracking-tight text-center text-gray-800">
          {title}
        </h3>
      );
    }

    // For English and other languages, render with animation
    return (
      <h3 className="overflow-hidden uppercase font-semibold text-3xl lg:text-5xl tracking-tight text-center text-gray-800">
        {title.split("").map((item, index) => (
          <motion.span
            key={index}
            initial={{ y: "100%" }}
            animate={isHovering ? { y: "0" } : { y: "100%" }}
            transition={{
              ease: [0.22, 1, 0.36, 1],
              delay: index * 0.06,
            }}
            className="inline-block"
          >
            {item}
          </motion.span>
        ))}
      </h3>
    );
  };

  return (
    <div className="-mt-3 bg-white w-full flex flex-col rounded-2xl">
      {/* title Section */}
      <div className="w-full md:px-10 lg:px-14 py-8 md:py-12 px-4 flex flex-col gap-4 border-b border-gray-400">
        <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#502380] tracking-tight font-bold uppercase">
          {t("visionAndMission.vision_mission_title")}
        </h2>
      </div>

      {/* Cards Container */}
      <div className="cards w-full md:px-32 px-4 py-8 lg:py-16 lg:flex-row flex flex-col gap-8">
        {cardData.map((card, index) => (
          <div key={index} className="flex flex-col w-full px-4">
            <div className="pb-4 flex gap-2 items-center">
              <div className="w-4 h-4 bg-orange-400 border-black border-[1px] rounded-full"></div>
              <h1 className="text-xl md:text-2xl text-black">{card.title}</h1>
            </div>

            <div
              onMouseEnter={() => userLang !== 'mr' && setHovering(true)}
              onMouseLeave={() => userLang !== 'mr' && setHovering(false)}
              className="bg-white flex flex-col gap-2 justify-center items-center h-fit lg:h-72 p-6 rounded-xl shadow-lg transform hover:scale-95 transition-transform duration-300"
            >
              <div className={`${card.iconBgColor} w-16 h-16 rounded-full flex items-center justify-center`}>
                <card.icon className={`${card.iconColor} text-3xl`} />
              </div>
              {renderTitle(card.title)}
              <p className="text-gray-600 text-center md:text-base text-sm lg:text-lg font-light capitalize">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vision;