import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Carousel({ 
  children: slides, 
  reviews,
  autoSlide = false, 
  autoSlideInterval = 3000 
}) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  React.useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full h-54 lg:h-[40vw] overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex h-full transition-transform ease-out duration-500" 
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button 
          onClick={prev} 
          className="p-2 rounded-full shadow bg-white/70 text-gray-800 hover:bg-white"
        >
          <FiChevronLeft size={40} />
        </button>
        <button 
          onClick={next} 
          className="p-2 rounded-full shadow bg-white/70 text-gray-800 hover:bg-white"
        >
          <FiChevronRight size={40} />
        </button>
      </div>

      {/* Text Overlay */}
      {reviews && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 md:p-6">
          <h3 className="text-xl md:text-3xl font-bold mb-6 md:mb-4">{reviews[curr].name}</h3>
          <p className="text-xl italic lg:block hidden md:mb-5 ">{reviews[curr].text}</p>
        </div>
      )}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div 
              key={i}
              className={`
                transition-all w-3 h-3 bg-white rounded-full 
                ${curr === i ? "p-2" : "bg-opacity-50"}
              `} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}