import { motion } from "framer-motion";
import React from "react";
import hero2 from "../../assets/hero/chicken_processed.png";
import hero from "../../assets/hero/hero.png";
import { useTranslation } from "react-i18next";

function Landing() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-[220px] md:h-[300px] mt-28 md:mt-[100px] lg:mt-36 lg:h-[70vh]">
      {/* Hero Section */}
        <div
          className="textStructure relative bg-center w-full h-64 md:h-[375px] lg:h-[70vh] lg:px-14 md:py-8 lg:py-24 px-4 md:px-10"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        >
          {/* Overlay div */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
          
          {/* Content with higher z-index */}
          <div className="relative z-10 lg:pt-0 md:pt-0 pt-8">
            {[t("hero.we_revolutionize"), t("hero.poultry"), t("hero.farming")].map(
              (item, index) => {
                return (
                  <div className="masker" key={index}>
                    <div className="w-full flex items-center">
                      {index === 1 && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "20%" }}
                          transition={{
                            ease: [0.76, 0, 0.24, 1],
                            duration: 2,
                          }}
                          className="h-12 md:h-14 lg:h-20 min-w-[0px] lg:max-w-[140px] md:max-w-[100px] bg-cover bg-center rounded-lg mr-4 lg:mr-6"
                          style={{
                            backgroundImage: `url(${hero2})`,
                          }}
                        ></motion.div>
                      )}
                      <h1 className="uppercase text-white lg:text-[100px] text-[45px] md:text-[80px] leading-none tracking-tighter font-semibold">
                        {item}
                      </h1>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
    </div>
  );
}

export default Landing;