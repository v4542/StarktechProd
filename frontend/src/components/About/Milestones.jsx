import React from "react";
import { ImFlag } from "react-icons/im";
import { FaGear } from "react-icons/fa6";
import { FaTractor } from "react-icons/fa";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useTranslation } from 'react-i18next';

function Milestones() {
  const { t } = useTranslation();

  const milestones = [
    {
      date: t("milestones.steps.0.date"),
      icon: ImFlag,
      title: t("milestones.steps.0.title"),
      description: t("milestones.steps.0.description"),
      bgColor: "bg-blue-600",
    },
    {
      date: t("milestones.steps.1.date"),
      icon: FaGear,
      title: t("milestones.steps.1.title"),
      description: t("milestones.steps.1.description"),
      bgColor: "bg-green-600",
    },
    {
      date: t("milestones.steps.2.date"),
      icon: FaTractor,
      title: t("milestones.steps.2.title"),
      description: t("milestones.steps.2.description"),
      bgColor: "bg-purple-600",
    },
  ];

  return (
    <div className="w-full  bg-orange-300 rounded-t-2xl lg:pb-12 flex flex-col gap-6">
      {/* Title Section */}
      <div className="w-full py-8 lg:py-10  md:px-10 px-4 lg:px-14 flex flex-col gap-4 border-b border-gray-700 ">
        <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#502380] tracking-tight font-bold uppercase ">
          {t("milestones.title")}
        </h2>
        <p className="text-sm lg:text-lg md:text-base font-light capitalize text-gray-700 italic ">
          {t("milestones.subtitle")}
        </p>
      </div>
     
      {/* Timeline Container */}
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
              dateClassName="text-gray-600 font-medium"
              iconStyle={{
                background: 'rgb(80, 35, 128)', color: '#fff',
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              icon={<milestone.icon />}
            >
              <div>
                <h3 className=" text-xl  mb-3 text-gray-800">
                  {milestone.title}
                </h3>
                <p className=" text-xs font-light text-gray-700">{milestone.description}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Milestones;
