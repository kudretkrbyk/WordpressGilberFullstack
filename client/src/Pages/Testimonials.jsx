import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderSlides, setSliderSlides] = useState([]);
  const [scale, setScale] = useState("scale-125");
  const imageRef = useRef(null);

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/testimonial")
      .then((response) => {
        setSliderSlides(response.data);
      })
      .catch((error) => {
        console.error("Error fetching testimonial:", error);
      });
  }, []);

  console.log("testimonial", sliderSlides);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScale("scale-100");
          } else {
            setScale("scale-125");
          }
        });
      },
      { threshold: 0.5 } // Görüntülenme oranı (0.5 = %50)
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === sliderSlides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? sliderSlides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="w-full h-screen relative flex items-center justify-center p-5 md:p-20 overflow-hidden">
      <div
        ref={imageRef}
        className={`absolute bg-center bg-cover w-full h-screen bg-[url('http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/testimonials.jpg')] duration-[4000ms] ${scale} `}
      ></div>
      <div className="w-full h-[700px] flex flex-col xl:flex-row xl:items-end justify-between gap-1 xl:gap-32 xl:p-20 z-40">
        <div className="w-full xl:w-1/2 h-[500px] flex flex-col items-start justify-center xl:justify-between gap-10 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#ef4444"
            viewBox="0 0 75 75"
            style={{ height: "75px" }}
          >
            <defs></defs>
            <path
              fill="#ef4444"
              d="M25 0C16.9271 0 10.7422 2.14844 6.44531 6.44531 2.14844 10.7422 0 16.9271 0 25v50h31.25V25H12.5c0-4.4271.9766-7.6172 2.9297-9.5703C17.3828 13.4766 20.5729 12.5 25 12.5V0zm43.75 0c-8.0729 0-14.2578 2.14844-18.5547 6.44531C45.8984 10.7422 43.75 16.9271 43.75 25v50H75V25H56.25c0-4.4271.9766-7.6172 2.9297-9.5703C61.1328 13.4766 64.3229 12.5 68.75 12.5V0z"
            ></path>
          </svg>
          <div className="text-4xl text-white w-full ">
            Creative & dedicated is things that gilber studio brings for your
            business.
          </div>
        </div>
        <div className="text-white flex flex-col gap-10 w-full xl:w-1/2 h-[600px] xl:h-[500px] relative overflow-hidden ">
          {sliderSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute  p-10 left-0 w-full h-full transition-transform duration-500 ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                  ? "-translate-x-full"
                  : "translate-x-full"
              }`}
            >
              {slide.content}
              <div className="w-full flex flex-col gap-10 full">
                <div>{slide.testimonial_ref_title}</div>
                <div className="flex flex-col gap-8 text-xl">
                  <div className="font-bold">{slide.testimonial_ref_name} </div>
                  <div>{slide.testimonial_ref_status} </div>
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-0 z-50 flex items-center justify-start w-full gap-10 p-">
            <div
              className="text-white cursor-pointer border border-white p-2"
              onClick={handlePrev}
            >
              <MdOutlineArrowBackIos className="size-10" />
            </div>
            <div
              className="text-white cursor-pointer border border-white p-2"
              onClick={handleNext}
            >
              <MdArrowForwardIos className="size-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
