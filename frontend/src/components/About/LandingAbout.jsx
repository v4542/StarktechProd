import React from "react";
import { useTranslation } from "react-i18next";
import About from "../Home/About";
import video from "../../assets/video/video.mp4";

function Landing() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="w-full h-[350px] relative md:h-96  lg:h-[90vh] lg:mt-20 lg:mb-12 mb-6 mt-28">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="absolute min-w-full min-h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex items-end  lg:items-end lg:justify-end w-full h-[320px] md:h-[375px] lg:h-[80vh] lg:px-14 md:py-16 px-4 md:px-10">
          <div className="w-full lg:p-6 lg:max-w-[50vw] bg-black rounded-md opacity-75 p-4">
            <h1 className="uppercase text-white lg:text-xl text-base md:text-[80px] leading-none mb-3 ">
              "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness."
            </h1>
  
            <h1 className="uppercase text-right text-white lg:text-xl text-base md:text-[80px] leading-none">
              – Thomas Jefferson
            </h1>
          </div>
        </div>
      </div>

      <About />
    </div>
  );
}

export default Landing;