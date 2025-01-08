import React from "react";
import Carousel from "./Carousel";
import { useTranslation } from 'react-i18next';

// Image Imports
import z1 from "../../assets/awards/z1.jpg";
import z2 from "../../assets/awards/z2.jpg";
import award6 from "../../assets/awards/award6.jpg";
import director from "../../assets/awards/Director Maam.jpg";
import a6 from "../../assets/awards/6.jpg";
import a5 from "../../assets/awards/5.jpg";
import a3 from "../../assets/awards/3.jpg";
import new1 from "../../assets/awards/1new.jpeg";

// Data Array


function Achievements() {
  const { t } = useTranslation();
  const reviews = [
    { id: 1, name: t("awards.0.name"), text: t("awards.0.text"), image: new1 },
    { id: 2, name: t("awards.1.name"), text: t("awards.1.text"), image: a3 },
    { id: 3, name: t("awards.2.name"), text: t("awards.2.text"), image: a5 },
    { id: 4, name: t("awards.3.name"), text: t("awards.3.text"), image: a6 },
    { id: 5, name: t("awards.4.name"), text: t("awards.4.text"), image: director },
    { id: 6, name: t("awards.5.name"), text: t("awards.5.text"), image: award6 },
    { id: 7, name: t("awards.6.name"), text: t("awards.6.text"), image: z1 },
    { id: 8, name: t("awards.7.name"), text: t("awards.7.text"), image: z2 },
  ];
  return (
    <div className="w-full flex flex-col justify-center items-center bg-orange-300 rounded-2xl mt-8">
      {/* Title Section */}
      <div className="w-full py-8 lg:py-14 md:py-12 md:px-10 lg:px-14 px-4 border-b border-gray-700">
        <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#502380] tracking-tight font-bold uppercase">
          {t("achievements.title")}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="w-[90vw] lg:w-[90vw] lg:h-[45vw] md:py-10 lg:py-12 md:mb-14 md:pb-20 pb-5">
        <div className="w-[90vw] lg:w-[90vw] lg:h-[40vw] lg:mt-0 mt-8 shadow-xl rounded-2xl overflow-hidden">
          <Carousel reviews={reviews}>
            {reviews.map((review, index) => (
              <div key={review.id} className="flex-shrink-0 w-full flex justify-center items-start">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-[100vw] md:w-[90vw] object-fit"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
