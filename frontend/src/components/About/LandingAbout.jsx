import React from "react";
import { useTranslation } from "react-i18next";
import About from "../Home/About";
import video from "../../assets/video/video.mp4";

function Landing() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      
      <About />

      {/* Hero Section */}
      <div className="w-full h-[28vh] md:h-96  lg:h-[80vh] lg:mb-12 mb-6 ">
        {/* Video Background */}
        <div className="w-[90vw] lg:w-[62vw] lg:h-[530px] mx-auto overflow-hidden">
          <video
            className="lg:bg-bottom lg:w-full  lg:h-[75vh]"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>

    </div>
  );
}

export default Landing;