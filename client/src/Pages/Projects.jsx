import { useState, useEffect } from "react";
import axios from "axios";
import { MdArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";

import { MdEditNote } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";

export default function Projects() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const activeComponent = useSelector((state) => state.activeComponent);

  const [slides, setSlides] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({});

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/project")
      .then((response) => {
        setSlides(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  }, []);

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
    setEditedProject(slide);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios
      .put(
        `http://localhost:3000/api/post/updateProject/${editedProject.id}`,
        editedProject
      )
      .then(() => {
        setSlides((prev) =>
          prev.map((project) =>
            project.id === editedProject.id ? editedProject : project
          )
        );
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating Contact:", error);
      });
  };
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <div className="absolute left-0 top-1/2 hidden md:flex items-center justify-between w-full  p-24 z-40 ">
        <div className="text-white cursor-pointer" onClick={handlePrev}>
          <MdOutlineArrowBackIos className="size-10" />
        </div>
        <div className="text-white cursor-pointer" onClick={handleNext}>
          <MdArrowForwardIos className="size-10" />
        </div>
      </div>
      {activeComponent === "Projects" ? (
        isEditing ? (
          <div
            className={` relative   w-full flex flex-col gap-10  items-center justify-center  h-screen  p-20 bg-[#161616]
                `}
          >
            <div className={` flex gap-2   w-full h-48   `}>
              <div>
                {" "}
                <img
                  className="w-48 h-48"
                  src={editedProject.project_photo}
                ></img>
              </div>
              <input
                onChange={handleChange}
                name="project_photo"
                value={editedProject.project_photo}
                className="w-full z-40"
              ></input>
            </div>
            <div className="text-xl  w-full z-40">
              <input
                onChange={handleChange}
                className="text-black w-full"
                name="project_title"
                value={editedProject.project_title}
              ></input>
            </div>
            <div className="text-xl w-full z-40 ">
              <textarea
                onChange={handleChange}
                name="project_comment"
                value={editedProject.project_comment}
                className="text-black w-full"
              ></textarea>
            </div>
            <div className="w-full z-40">
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 p-3 px-4 rounded-xl w-full"
              >
                Güncelle
              </button>
            </div>
            <div className="z-50 absolute  top-40 left-10 hover:cursor-pointer ">
              <RiCloseLargeFill
                onClick={handleEditClick}
                className="text-white size-10 z-50"
              />
            </div>
          </div>
        ) : (
          <div>
            {" "}
            {slides.map((slide, index) => (
              <div
                className={`w-full flex border border-white items-start justify-start absolute h-screen transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100 z-30" : "opacity-0 z-20"
                }`}
                key={slide.id}
              >
                <div className="absolute z-50 top-1/4 left-0 p-10  ">
                  <MdEditNote
                    onClick={() => handleEditClick(slide)}
                    className="text-white size-10  hover:cursor-pointer "
                  />
                </div>{" "}
                <div
                  className={`absolute bg-cover bg-center w-full h-screen  duration-[2000ms]  ${
                    index === currentSlide
                      ? "opacity-90 scale-100"
                      : "opacity-100 scale-125"
                  }`}
                  style={{ backgroundImage: `url(${slide.project_photo})` }}
                ></div>
                <div
                  className={`absolute left-0 p-10 md:left-32 flex flex-col text-white gap-10 items-start justify-center h-screen w-full transition-all duration-700 ease-in-out ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <div className="text-8xl flex gap-1 font-bold">
                    <span className="text-white">{slide.project_title}</span>
                    <span className="text-red-500">.</span>
                  </div>
                  <div className="text-xl w-80 md:w-[450px]">
                    {slide.project_comment}
                  </div>
                  <div>
                    <button className="bg-red-500 p-3 px-4">SEE PROJECT</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div>
          {" "}
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
                style={{ backgroundImage: `url(${slide.project_photo})` }}
              ></div>
              <div
                className={`absolute left-0 p-10 md:left-32 flex flex-col text-white gap-10 items-start justify-center h-screen w-full transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="text-8xl flex gap-1 font-bold">
                  <span className="text-white">{slide.project_title}</span>
                  <span className="text-red-500">.</span>
                </div>
                <div className="text-xl w-80 md:w-[450px]">
                  {slide.project_comment}
                </div>
                <div>
                  <button className="bg-red-500 p-3 px-4">SEE PROJECT</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
