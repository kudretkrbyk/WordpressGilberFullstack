import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GoDotFill } from "react-icons/go";

import slides from "../Constant/ProjectSlides.jsx";

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute hidden md:flex items-center justify-between w-full h-screen p-24 z-40">
        <div className="text-white cursor-pointer" onClick={handlePrev}>
          <MdOutlineArrowBackIos className="size-10" />
        </div>
        <div className="text-white cursor-pointer" onClick={handleNext}>
          <MdArrowForwardIos className="size-10" />
        </div>
      </div>

      {slides.map((slide, index) => (
        <div
          className={`w-full flex items-start justify-start absolute h-screen transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-30" : "opacity-0 z-20"
          }`}
          key={slide.id}
        >
          {" "}
          <div
            className={`absolute bg-cover bg-center w-full h-screen  duration-[2000ms]  ${
              index === currentSlide
                ? "opacity-90 scale-100"
                : "opacity-100 scale-125"
            }`}
            style={{ backgroundImage: slide.backgroundImage }}
          ></div>
          <div
            className={`absolute left-0 p-10 md:left-32 flex flex-col text-white gap-10 items-start justify-center h-screen w-full transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-8xl flex gap-1 font-bold">
              <span className="text-white">{slide.title}</span>
              <span className="text-red-500">.</span>
            </div>
            <div className="text-xl w-80 md:w-[450px]">{slide.description}</div>
            <div>
              <button className="bg-red-500 p-3 px-4">SEE PROJECT</button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-0 left-0 p-10 flex md:hidden gap-2 z-40">
        {slides.map((_, dotIndex) => (
          <GoDotFill
            key={dotIndex}
            className={`cursor-pointer size-10 ${
              dotIndex === currentSlide ? "text-red-500" : "text-white"
            }`}
            onClick={() => setCurrentSlide(dotIndex)}
          />
        ))}
      </div>
    </div>
  );
}
