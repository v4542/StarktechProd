import React from 'react'
import img from '../../assets/hero/aboutus_logo.png'
import { useTranslation } from 'react-i18next';


function About() {
    const { t } = useTranslation();
  
  return (
    <div className='h-fit rounded-t-2xl'>
     <div className="w-full px-4 lg:px-14 md:px-10 lg:pb-8 border-b border-gray-400 md:pb-5 pb-4">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase">
          {t("about.about")}
        </h2>
      </div>
      <div className='w-full lg:px-14 lg:py-10 md:text-base grid grid-cols-1 lg:grid-cols-3 lg:place-items-center bg-white rounded-t-2xl text-black'>
      <div className='lg:px-12 p-6 indent-16 text-justify text-sm lg:text-lg lg:col-span-2'>
        <p>{t("about.companyInfo")}</p>
      </div>
      <div className='lg:pr-12  flex items-center justify-center'>
        <img 
          src={img} 
          className='lg:h-[100%] h-56 w-auto object-contain rounded-lg' 
          alt="Starktech Agritech Company" 
        />
      </div></div>
      
    </div>
  )
}

export default About