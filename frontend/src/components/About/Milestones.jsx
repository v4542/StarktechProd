import React from "react";
import { ImFlag } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import { FaTractor } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTranslation } from 'react-i18next';
import mile1 from "../../assets/milestones/mile1.jpg"
import mile2 from "../../assets/milestones/mile2.jpg"
import mile3 from "../../assets/milestones/mile3.jpg"
import mile4 from "../../assets/milestones/mile4.jpg"

function Milestones() {
  const { t } = useTranslation();

  const milestones = [
    {
      date: t("milestones.steps.0.date"),
      icon: ImFlag,
      title: t("milestones.steps.0.title"),
      description: t("milestones.steps.0.description"),
      bgColor: "bg-blue-600",
      image: mile1// Replace with your image path
    },
    {
      date: t("milestones.steps.1.date"),
      icon: FaGear,
      title: t("milestones.steps.1.title"),
      description: t("milestones.steps.1.description"),
      bgColor: "bg-green-600",
      image: mile2 // Replace with your image path
    },
    {
      date: t("milestones.steps.2.date"),
      icon: FaTractor,
      title: t("milestones.steps.2.title"),
      description: t("milestones.steps.2.description"),
      bgColor: "bg-purple-600",
      image: mile3  // Replace with your image path
    },
    {
      date: t("milestones.steps.3.date"),
      icon: GiPartyPopper,
      title: t("milestones.steps.3.title"),
      description: t("milestones.steps.3.description"),
      bgColor: "bg-purple-600",
      image: mile4  // Replace with your image path
    },
  ];

  return (
    <div className="w-full bg-orange-300 rounded-t-2xl lg:pb-12 flex flex-col gap-6">
      <div className="w-full py-8 lg:py-10 md:px-10 px-4 lg:px-14 flex flex-col gap-4 border-b border-gray-700">
        <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#502380] tracking-tight font-bold uppercase">
          {t("milestones.title")}
        </h2>
        <p className="text-sm lg:text-lg md:text-base font-light capitalize text-gray-700 italic">
          {t("milestones.subtitle")}
        </p>
      </div>

      <div className="px-4 py-8 lg:px-14 md:px-16">
        <VerticalTimeline>
          {milestones.map((milestone, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work transform hover:scale-105 transition-transform duration-300"
              contentStyle={{
                background: "white",
                color: "black",
                borderRadius: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              contentArrowStyle={{
                borderRight: `7px solid ${milestone.bgColor}`,
              }}
              date={milestone.date}
              dateClassName="text-black"
              iconStyle={{
                background: 'rgb(80, 35, 128)',
                color: '#fff',
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              icon={<milestone.icon />}
            >
              <div className="space-y-4">
                <h3 className="text-xl mb-3 text-gray-800">
                  {milestone.title}
                </h3>
                <img
                  src={milestone.image}
                  alt={milestone.title}
                  className="w-full h-40 md:h-60 lg:h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-xs font-light text-gray-700 indent-12">{milestone.description}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Milestones;