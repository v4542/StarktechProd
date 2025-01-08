import React from 'react';

const LoadingScreen = ({ logo }) => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="animate-scale">
        {logo ? (
          <img 
            src={logo} 
            alt="Website Logo" 
            className="w-32 h-32 object-contain"
          />
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">LOGO</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;