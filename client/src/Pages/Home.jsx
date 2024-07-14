import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRef } from "react";

export default function Home() {
  const [scale, setScale] = useState("scale-125");
  const imageRef = useRef(null);

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
  return (
    <div className="w-full h-screen relative">
      <div className="z-0 absolute top-0 left-0 w-full h-screen overflow-hidden">
        <div
          ref={imageRef}
          className={`bg-cover bg-center w-full h-screen bg-[url(http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/home-mobile-640x1080.jpg)] md:bg-[url(http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/home.jpg)] transition-transform duration-[4000ms] ${scale}`}
        ></div>
      </div>

      <div className="z-40 flex flex-col text-white w-full md:w-8/12 xl:w-6/12 h-screen items-start  justify-center border border-white p-10 md:p-32 xl:p-48 gap-10">
        <div className="z-40 relative flex items-center justify-center w-1/4 h-16 group">
          <div className="absolute border p-10 rounded-full group-hover:scale-125 duration-500"></div>
          <div className="absolute">
            <FaPlay className="size-10 group-hover:scale-110 duration-500" />
          </div>
        </div>
        <div className="z-40">Product Designer</div>
        <div className="flex items-end gap-2 z-40 text-xl">
          <div className="text-5xl">Gilber</div>
          <div className="text-5xl text-red-500">.</div>
        </div>
        <div className="z-40">
          Working with client and community, we deliver masterplans that create
          vibrant new places and spaces, attract people, and encourage.
        </div>
      </div>
    </div>
  );
}
