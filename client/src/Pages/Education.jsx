import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import slides from "../Constant/EducationSlides.jsx";

import { useEffect } from "react";

export default function Education() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderSlides, setSliderSlides] = useState([]);

  useEffect(() => {
    if (slides !== null) {
      setSliderSlides(slides);
    }
  }, [slides]);

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
    <div className="w-full h-[1100px] xl:h-screen relative flex items-stretch justify-center bg-[#161616] overflow-hidden p-5">
      <div className=" absolute hidden md:flex items-center justify-between w-full h-full p-20 xl:p-36">
        <div className="text-white cursor-pointer z-40" onClick={handlePrev}>
          <MdOutlineArrowBackIos className="size-10 z-40" />
        </div>
        <div className="text-white cursor-pointer z-40" onClick={handleNext}>
          <MdArrowForwardIos className="size-10" />
        </div>
      </div>
      <div className="flex flex-col  w-full   text-xl text-white xl:p-20   ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full px-20">
          <div className="text-6xl px-10">Education</div>
          <div>
            <button className="bg-red-500 p-3 px-4">DOWNLOAD RESUME</button>
          </div>
        </div>
        <div className="relative w-full h-[1000px] flex flex-col md:flex-row  ">
          {sliderSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute w-full h-full transition-transform duration-500  ${
                index === currentSlide ? "translate-x-0" : "translate-x-[-150%]"
              } ${
                index === (currentSlide + slides.length - 1) % slides.length
                  ? "translate-x-[-200%]"
                  : ""
              }`}
            >
              {slide.content}
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 p-5 flex md:hidden gap-2 z-40">
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
    </div>
  );
}
