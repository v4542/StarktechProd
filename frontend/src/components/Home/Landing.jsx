import { motion } from "framer-motion";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import hero2 from "../../assets/hero/animated_logo.png";
import hero from "../../assets/hero/hero.png";
import { useTranslation } from "react-i18next";

function Landing() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-[330px] lg:h-[70vh]">
      {/* Hero Section */}
      <div className="w-full h-80 md:h-96 lg:mt-[160px] lg:h-[90vh] mt-28">
        <div
          className="textStructure relative bg-center w-full h-64 md:h-[375px] lg:h-[55vh] lg:px-14 md:py-16 px-4 md:px-10"
          style={{
            backgroundImage: `url(${hero})`,
          }}
        >
          {/* Overlay div */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
          
          {/* Content with higher z-index */}
          <div className="relative z-10 lg:pt-0 pt-8">
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
                      <h1 className="uppercase text-white lg:text-[90px] text-[45px] md:text-[80px] leading-none tracking-tighter font-semibold">
                        {item}
                      </h1>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="footer text-sm lg:h-[24vh] lg:py-auto md:text-base max-w-full md:justify-between lg:justify-between flex flex-col lg:flex-row md:flex-row gap-2 lg:gap-0 py-7 px-4 w-full h-30 border-t border-zinc-400 lg:px-10 lg:w-full md:px-10">
          <div className="flex flex-col lg:justify-evenly lg:items-center lg:text-lg lg:w-[66%] lg:flex-row gap-2">
            {[t("hero.from_ideas_to_better_farms"), t("hero.from_start_to_success")].map(
              (item, index) => (
                <p
                  key={index}
                  className="capitalize font-light tracking-tight"
                >
                  {item}
                </p>
              )
            )}
          </div>

          <div className="flex md:items-center lg:w-[33%] md:justify-center">
            <Link to="/products" className="hover:text-gray-700">
              <div className="start flex mt-4 md:mt-0 items-center lg:gap-4 gap-2 md:gap-2">
                <div className="border-[1px] border-zinc-400 rounded-full px-3 py-1 md:px-3 md:py-2 uppercase font-light md-text-sm lg:text-lg hover:bg-[#3b1a60] hover:text-white transition-colors">
                  {t("hero.discover_our_products")}
                </div>
                <div className="flex items-center justify-center md:w-11 md:h-11 h-[30px] w-[30px] lg:w-[46px] lg:h-[46px] text-xl md:text-2xl rounded-full border-[1px] border-zinc-400 hover:bg-[#3b1a60] hover:text-white transition-colors">
                  <GoArrowUpRight />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;