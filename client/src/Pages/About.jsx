import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdEditNote } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";

export default function About() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAbout, setEditedAbout] = useState({});
  const activeComponent = useSelector((state) => state.activeComponent);
  const [aboutData, setAboutData] = useState([]);
  const [skills, setSkills] = useState({
    skill_1: { width: 0, observerWidth: 0 },
    skill_2: { width: 0, observerWidth: 0 },
    skill_3: { width: 0, observerWidth: 0 },
  });

  // useRef'leri en üst düzeyde tanımlayın
  const skillRef1 = useRef(null);
  const skillRef2 = useRef(null);
  const skillRef3 = useRef(null);

  // useMemo ile skillRefs nesnesini oluşturun
  const skillRefs = useMemo(
    () => ({
      skill_1: skillRef1,
      skill_2: skillRef2,
      skill_3: skillRef3,
    }),
    []
  );

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/about")
      .then((response) => {
        const data = response.data[0];
        setAboutData(data); // Gelen verinin ilk öğesini al
        setSkills({
          skill_1: { width: data.about_skill_degree_1, observerWidth: 0 },
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
          const skillName = entry.target.dataset.skill;
          if (entry.isIntersecting) {
            setSkills((prevSkills) => ({
              ...prevSkills,
              [skillName]: {
                ...prevSkills[skillName],
                observerWidth: prevSkills[skillName].width,
              },
            }));
          } else {
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

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setEditedAbout(aboutData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAbout((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios
      .put(
        `http://localhost:3000/api/post/updateAbout/${aboutData.id}`,
        editedAbout
      )
      .then(() => {
        setAboutData(editedAbout);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating about:", error);
      });
  };

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
          isEditing ? (
            <div className="relative flex flex-col gap-3 items-start justify-center w-full h-full border border-white p-5">
              <textarea
                name="about_cover_title"
                value={editedAbout.about_cover_title || ""}
                onChange={handleChange}
                className=" text-2xl w-full h-full p-2"
              />
              <div className="flex flex-col gap-10 w-full">
                {["skill_1", "skill_2", "skill_3"].map((skillKey, index) => (
                  <div
                    key={skillKey}
                    ref={skillRefs[skillKey]}
                    data-skill={skillKey}
                    className="w-full flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <input
                          name={`about_skill_${index + 1}`}
                          value={editedAbout[`about_skill_${index + 1}`] || ""}
                          onChange={handleChange}
                          className=" w-60 p-2"
                        />
                      </div>
                      <div>
                        <input
                          name={`about_skill_degree_${index + 1}`}
                          value={
                            editedAbout[`about_skill_degree_${index + 1}`] || ""
                          }
                          onChange={handleChange}
                          className=" border-b w-10 p-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSaveClick}
                className="text-white bg-blue-500 w-full rounded-xl px-4 py-2"
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
            <div className="relative flex flex-col gap-5 items-start justify-center w-full h-full border border-white p-10">
              <div className=" absolute right-0 top-0    ">
                <div className="text-white">
                  <MdEditNote
                    className="size-10 hover:cursor-pointer"
                    onClick={handleEditClick}
                  />{" "}
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
                      <div className="absolute z-30 h-2 bg-white w-full rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
