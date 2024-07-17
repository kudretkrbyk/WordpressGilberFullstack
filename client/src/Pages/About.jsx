import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { MdEditNote } from "react-icons/md";

export default function About() {
  const activeComponent = useSelector((state) => state.activeComponent);
  const [aboutData, setAboutData] = useState([]);
  const [skills, setSkills] = useState({
    skill_1: { width: 0, observerWidth: 0 },
    skill_2: { width: 0, observerWidth: 0 },
    skill_3: { width: 0, observerWidth: 0 },
  });

  const skillRefs = {
    skill_1: useRef(null),
    skill_2: useRef(null),
    skill_3: useRef(null),
  };

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/about")
      .then((response) => {
        const data = response.data[0];
        setAboutData(data); // Gelen verinin ilk öğesini al
        console.log("about", data);
        setSkills({
          skill_1: { width: data.about_skill_degree_11, observerWidth: 0 },
          skill_2: { width: data.about_skill_degree_2, observerWidth: 0 },
          skill_3: { width: data.about_skill_degree_3, observerWidth: 0 },
        });
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.dataset.skill;
            setSkills((prevSkills) => ({
              ...prevSkills,
              [skillName]: {
                ...prevSkills[skillName],
                observerWidth: prevSkills[skillName].width,
              },
            }));
          } else {
            const skillName = entry.target.dataset.skill;
            setSkills((prevSkills) => ({
              ...prevSkills,
              [skillName]: { ...prevSkills[skillName], observerWidth: 0 },
            }));
          }
        });
      },
      { threshold: 0.5 } // Görüntülenme oranı (0.5 = %50)
    );

    Object.values(skillRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(skillRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [skillRefs]);

  console.log("about skill:", skills);
  console.log("about tüm data", aboutData);

  return (
    <div className="flex flex-col xl:flex-row items-center justify-around w-full xl:h-screen h-full bg-[#161616] gap-14 p-5 md:p-20">
      <div className="w-full h-[500px] flex items-center xl:justify-start justify-center md:px-20">
        <div className="flex flex-col items-center gap-4 justify-center border-l border-b border-t border-white w-[340px] h-full">
          <div className="flex z-40 items-end justify-center text-white w-full">
            <div className="text-9xl">9</div>
            <div className="text-8xl text-red-500">.</div>
          </div>
          <div className="flex w-full items-end justify-center gap-5 text-white p-10">
            <div className="w-full h-[1px] bg-white"></div>
            <div className="w-full text-wrap text-2xl text-right">
              Years Experience Working
            </div>
          </div>
        </div>
      </div>
      <div className="flex p-5 xl:px-20 w-full h-[500px]">
        {activeComponent === "About" ? (
          <div className="relative flex flex-col gap-5 items-start justify-center w-full h-full border border-white p-10">
            <div className=" absolute right-0 top-0    ">
              <div className="text-white">
                <MdEditNote className="size-10 hover:cursor-pointer" />{" "}
              </div>
            </div>
            <div className="text-white text-2xl font-bold">
              Great Experience
            </div>
            <div className="text-white text-2xl">
              {aboutData.about_cover_title}
            </div>
            <div className="flex flex-col gap-16 w-full">
              {["skill_1", "skill_2", "skill_3"].map((skillKey, index) => (
                <div
                  key={skillKey}
                  ref={skillRefs[skillKey]}
                  data-skill={skillKey}
                  className="w-full text-white flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div>{aboutData[`about_skill_${index + 1}`]}</div>
                    <div>{skills[skillKey].width}%</div>
                  </div>
                  <div className="w-full relative">
                    <div
                      className="absolute z-40 h-2 bg-red-500 rounded-full duration-[4000ms]"
                      style={{ width: `${skills[skillKey].observerWidth}%` }}
                    ></div>
                    <div className="absolute w-full h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10 items-start justify-center w-full h-full">
            <div className="text-white text-2xl font-bold">
              Great Experience
            </div>
            <div className="text-white text-2xl">
              {aboutData.about_cover_title}
            </div>
            <div className="flex flex-col gap-16 w-full">
              {["skill_1", "skill_2", "skill_3"].map((skillKey, index) => (
                <div
                  key={skillKey}
                  ref={skillRefs[skillKey]}
                  data-skill={skillKey}
                  className="w-full text-white flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div>{aboutData[`about_skill_${index + 1}`]}</div>
                    <div>{skills[skillKey].width}%</div>
                  </div>
                  <div className="w-full relative">
                    <div
                      className="absolute z-40 h-2 bg-red-500 rounded-full duration-[4000ms]"
                      style={{ width: `${skills[skillKey].observerWidth}%` }}
                    ></div>
                    <div className="absolute w-full h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
