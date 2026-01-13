import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-light dark:bg-[#0b1220] flex items-center justify-center z-[9999] transition-opacity duration-500">
      <div className="w-[100px] h-[100px] relative">
        <div className="w-full h-full rounded-full relative animate-loader-rotate">
          {[0, 72, 144, 216, 288].map((rotation, index) => (
            <div
              key={index}
              className="absolute w-full h-full overflow-hidden"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-primary animate-loader-spin" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
