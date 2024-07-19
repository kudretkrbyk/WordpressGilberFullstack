import { useState, useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdEditNote } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
export default function Education() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderSlides, setSliderSlides] = useState([]);
  const activeComponent = useSelector((state) => state.activeComponent);

  const [isEditing, setIsEditing] = useState(false);
  const [editedEducation, setEditedEducation] = useState({});

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

  const handleEditClick = (slide) => {
    setIsEditing(!isEditing);
    setEditedEducation(slide);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEducation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios
      .put(
        `http://localhost:3000/api/post/updateEducation/${editedEducation.id}`,
        editedEducation
      )
      .then(() => {
        setSliderSlides((prev) =>
          prev.map((education) =>
            education.id === editedEducation.id ? editedEducation : education
          )
        );
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating education:", error);
      });
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
          <div className="relative w-full h-[1000px] flex flex-col  overflow-hidden   ">
            {slides.map((slideGroup, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-transform duration-500   px-24 ${
                  index === currentSlide ? "translate-x-0" : "translate-x-full"
                }`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                {console.log("slidegroup", slideGroup)}
                {isEditing ? (
                  <div className="relative flex flex-col gap-4">
                    <div className=" flex   items-center justify-center gap-10 w-full h-48 border text-black   ">
                      <img
                        className="w-24 "
                        src={editedEducation.education_icon}
                        alt="education icon"
                      />

                      <textarea
                        className="w-48 h-full border"
                        name="education_icon"
                        value={editedEducation.education_icon}
                        onChange={handleChange}
                      ></textarea>

                      <input
                        name="education_year"
                        value={editedEducation.education_year}
                        onChange={handleChange}
                      ></input>
                      <input
                        className="w-24"
                        name="education_title"
                        value={editedEducation.education_title}
                        onChange={handleChange}
                      ></input>

                      <textarea
                        className="w-80 h-full"
                        name="education_comment"
                        value={editedEducation.education_comment}
                        onChange={handleChange}
                      ></textarea>

                      <div className=" top-0 -right-5 hover:cursor-pointer z-50"></div>
                    </div>
                    <button
                      onClick={handleSaveClick}
                      className="bg-blue-500 p-3 px-4 rounded-xl w-full"
                    >
                      Güncelle
                    </button>
                    <div className="absolute  top-0 -right-12 hover:cursor-pointer">
                      <RiCloseLargeFill
                        onClick={handleEditClick}
                        className="text-white size-10"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    {" "}
                    {slideGroup.map((slide) => (
                      <div
                        key={slide.id}
                        className=" flex flex-col items-center justify-center  z-40 gap-5  w-full  text-white"
                      >
                        <div className=" flex  xl:flex-row items-center justify-center gap-10 w-full border ">
                          <div className="w-full">
                            <img
                              src={slide.education_icon}
                              alt="education icon"
                            />
                          </div>
                          <div className="flex flex-col w-full">
                            <span>{slide.education_year}</span>
                            <span>{slide.education_title}</span>
                          </div>
                          <div className="w-full">
                            {slide.education_comment}
                          </div>
                          <div className=" top-0 -right-5 hover:cursor-pointer z-50">
                            <MdEditNote
                              onClick={() => handleEditClick(slide)}
                              className="text-white size-10"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
