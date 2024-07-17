import { useState, useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdEditNote } from "react-icons/md";
export default function Education() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderSlides, setSliderSlides] = useState([]);
  const activeComponent = useSelector((state) => state.activeComponent);

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/education")
      .then((response) => {
        setSliderSlides(response.data);
      })
      .catch((error) => {
        console.error("Error fetching education:", error);
      });
  }, []);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const slides = chunkArray(sliderSlides, 3);

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
    <div className="w-full h-[1100px] xl:h-screen relative flex items-stretch justify-center bg-[#161616] overflow-hidden p-5 md:p-0">
      <div className="absolute hidden md:flex items-center justify-between w-full h-full p-14 xl:p-36">
        <div className="text-white cursor-pointer z-40" onClick={handlePrev}>
          <MdOutlineArrowBackIos className="size-10 z-40" />
        </div>
        <div className="text-white cursor-pointer z-40" onClick={handleNext}>
          <MdArrowForwardIos className="size-10" />
        </div>
      </div>
      <div className="flex flex-col w-full text-xl text-white xl:p-20 relative gap-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full px-20">
          <div className="text-6xl px-10">Education</div>
          <div>
            <button className="bg-red-500 p-3 px-4">DOWNLOAD RESUME</button>
          </div>
        </div>
        {activeComponent === "Education" ? (
          <div className="relative w-full h-[1000px] flex flex-col md:flex-row overflow-hidden border ">
            <div className="absolute top-0 right-0 hover:cursor-pointer z-50">
              <MdEditNote className="text-white size-10" />
            </div>
            {slides.map((slideGroup, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-transform duration-500   ${
                  index === currentSlide ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                {" "}
                {console.log("slidegroup", slideGroup)}
                {slideGroup.map((slide) => (
                  <div
                    key={slide.id}
                    className=" flex flex-col items-center justify-center md:p-0 md:px-28 z-40 gap-5   w-full  text-white"
                  >
                    <div className="flex flex-col xl:flex-row items-center justify-around gap-5 w-full">
                      <div className="w-full">
                        <img src={slide.education_icon} alt="education icon" />
                      </div>
                      <div className="flex flex-col w-full">
                        <span>{slide.education_year}</span>
                        <span>{slide.education_title}</span>
                      </div>
                      <div className="w-full">{slide.education_comment}</div>
                    </div>
                    <div className="w-full py-2">
                      <div className="bg-gray-500 w-full h-[2px]"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full h-[1000px] flex flex-col md:flex-row overflow-hidden ">
            {slides.map((slideGroup, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-transform duration-500   ${
                  index === currentSlide ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                {" "}
                {console.log("slidegroup", slideGroup)}
                {slideGroup.map((slide) => (
                  <div
                    key={slide.id}
                    className=" flex flex-col items-center justify-center md:p-0 md:px-28 z-40 gap-5   w-full  text-white"
                  >
                    <div className="flex flex-col xl:flex-row items-center justify-around gap-5 w-full">
                      <div className="w-full">
                        <img src={slide.education_icon} alt="education icon" />
                      </div>
                      <div className="flex flex-col w-full">
                        <span>{slide.education_year}</span>
                        <span>{slide.education_title}</span>
                      </div>
                      <div className="w-full">{slide.education_comment}</div>
                    </div>
                    <div className="w-full py-2">
                      <div className="bg-gray-500 w-full h-[2px]"></div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

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
