import { useEffect, useState, useRef } from "react";
import { MdEditNote } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Home() {
  const [scale, setScale] = useState({});
  const imageRefs = useRef([]);
  const [homeData, setHomeData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedHome, setEditedHome] = useState({});

  const activeComponent = useSelector((state) => state.activeComponent);
  console.log("burası Home redux verisi", activeComponent);

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/home")
      .then((response) => {
        setHomeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home:", error);
      });
  }, []);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.dataset.id;
        if (entry.isIntersecting) {
          setScale((prevScale) => ({ ...prevScale, [id]: 1 }));
        } else {
          setScale((prevScale) => ({ ...prevScale, [id]: 1.25 }));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Görüntülenme oranı (0.5 = %50)
    });

    imageRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [homeData]);
  console.log("homeData", homeData);

  const handleEditClick = (home) => {
    setIsEditing(!isEditing);
    setEditedHome(home);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    axios
      .put(`http://localhost:3000/api/post/updateHome/${editedHome.id}`, {
        home_tittle: editedHome.home_tittle,
        home_name: editedHome.home_name,
        home_cover_title: editedHome.home_cover_title,
      })
      .then((response) => {
        console.log("Veri güncellendi:", response.data);
        setIsEditing(false); // Düzenleme modunu kapat
        setHomeData((prev) =>
          prev.map((home) => (home.id === editedHome.id ? editedHome : home))
        );
      })
      .catch((error) => {
        console.error("Güncelleme hatası:", error);
      });
  };

  return (
    <div className="w-full h-screen relative">
      {homeData.map((home, index) => (
        <div key={home.id}>
          {console.log(home)}
          <div className="z-0 absolute top-0 left-0 w-full h-screen overflow-hidden">
            <div
              ref={(el) => (imageRefs.current[index] = el)}
              data-id={home.id}
              style={{
                transform: `scale(${scale[home.id] || 1.25})`,
                transition: "transform 4s",
              }}
              className={`bg-cover bg-center w-full h-screen bg-[url('http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/home-mobile-640x1080.jpg')] md:bg-[url(${home.home_photo_link})]`}
            ></div>
          </div>

          <div className="z-40 flex flex-col text-white w-full md:w-8/12 xl:w-6/12 h-screen items-start justify-center border border-white p-10 md:p-32 xl:p-48 gap-10">
            <div className="z-40 relative flex items-center justify-center w-1/4 h-16 group">
              <div className="absolute border p-10 rounded-full group-hover:scale-125 duration-500"></div>
              <div className="absolute">
                <FaPlay className="size-10 group-hover:scale-110 duration-500" />
              </div>
            </div>

            {activeComponent === "Home" ? (
              isEditing ? (
                <div className="w-full h-[500px] border border-white relative text-black">
                  <div className="flex flex-col gap-5 z-40 w-full p-3">
                    <input
                      type="text"
                      name="home_tittle"
                      value={editedHome.home_tittle}
                      onChange={handleInputChange}
                      className="z-40"
                    />
                    <div className="flex items-end gap-2 z-40 text-xl ">
                      <input
                        type="text"
                        name="home_name"
                        value={editedHome.home_name}
                        onChange={handleInputChange}
                        className="text-5xl w-full"
                      />
                    </div>
                    <textarea
                      name="description"
                      value={editedHome.description}
                      onChange={handleInputChange}
                      className="z-40 w-full h-48"
                    >
                      Working with client and community, we deliver masterplans
                      that create vibrant new places and spaces, attract people,
                      and encourage.
                    </textarea>
                    <button
                      onClick={handleUpdateClick}
                      className="z-40 bg-blue-500 text-white p-2 rounded"
                    >
                      Güncelle
                    </button>
                  </div>
                  <div className="absolute  top-0 -right-12 hover:cursor-pointer">
                    <RiCloseLargeFill
                      onClick={handleEditClick}
                      className="text-white size-10"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full border border-white relative">
                  <div
                    className="absolute right-0 top-0 hover:cursor-pointer z-50 "
                    onClick={() => handleEditClick(home)}
                  >
                    <MdEditNote className="size-10" />
                  </div>
                  <div
                    className={` flex flex-col gap-10 z-40 w-full h-12 p-3 `}
                  >
                    <div className="z-40"> {home.home_tittle} </div>

                    <div className="flex items-end gap-2 z-40 text-xl">
                      <div className="text-5xl">{home.home_name} </div>
                      <div className="text-5xl text-red-500">.</div>
                    </div>
                    <div className="z-40">
                      Working with client and community, we deliver masterplans
                      that create vibrant new places and spaces, attract people,
                      and encourage.
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="w-full h-full">
                <div className={`flex flex-col gap-10 z-40 w-full h-12 p-3`}>
                  <div className="z-40"> {home.home_tittle} </div>

                  <div className="flex items-end gap-2 z-40 text-xl">
                    <div className="text-5xl">{home.home_name} </div>
                    <div className="text-5xl text-red-500">.</div>
                  </div>
                  <div className="z-40">
                    Working with client and community, we deliver masterplans
                    that create vibrant new places and spaces, attract people,
                    and encourage.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
