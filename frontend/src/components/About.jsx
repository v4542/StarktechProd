import React from 'react'
import Milestones from "./About/Milestones";
import Vision from "./About/Vision";
import Support from "./About/Support";
import Achievements from "./About/Achievements";
import LandingAbout from "./About/LandingAbout";


function About() {
  return (
    <div className="w-full mt-[95px] md:mt-[120px]">
     
      <LandingAbout/>
      <Milestones/>
      <Vision/>
      <Support/>
      <Achievements/> 
    </div>
  )
}

export default About