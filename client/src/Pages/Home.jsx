import { useEffect, useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import axios from "axios";

export default function Home() {
  const [scale, setScale] = useState({});
  const imageRefs = useRef([]);
  const [homeData, setHomeData] = useState([]);

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
            <div className="z-40"> {home.home_tittle} </div>
            <div className="flex items-end gap-2 z-40 text-xl">
              <div className="text-5xl">{home.home_name} </div>
              <div className="text-5xl text-red-500">.</div>
            </div>
            <div className="z-40">
              Working with client and community, we deliver masterplans that
              create vibrant new places and spaces, attract people, and
              encourage.
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
