import { useState, useEffect, useRef } from "react";
import axios from "axios";
export default function About() {
  const [figmaWidth, setFigmaWidth] = useState(85);
  const [webDesignWidth, setWebDesignWidth] = useState(70);
  const [wordpressWidth, setWordpressWidth] = useState(90);

  const [figmaWidthObserver, setFigmaWidthObserver] = useState(0);
  const [webDesignWidthObserver, setWebDesignWidthObserver] = useState(0);
  const [wordpressWidthObserver, setWordpressWidthObserver] = useState(0);
  const skilBarsRef = useRef(null);

  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/about")
      .then((response) => {
        setAboutData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
      });
  }, []);
  console.log("about", aboutData);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFigmaWidthObserver(figmaWidth);
            setWebDesignWidthObserver(webDesignWidth);
            setWordpressWidthObserver(wordpressWidth);
          } else {
            setFigmaWidthObserver(0);
            setWebDesignWidthObserver(0);
            setWordpressWidthObserver(0);
          }
        });
      },
      { threshold: 0.5 } // Görüntülenme oranı (0.5 = %50)
    );

    if (skilBarsRef.current) {
      observer.observe(skilBarsRef.current);
    }

    return () => {
      if (skilBarsRef.current) {
        observer.unobserve(skilBarsRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col xl:flex-row items-center justify-around   w-full xl:h-screen h-full bg-[#161616] gap-14 p-5 md:p-20 ">
      <div className=" w-full h-[500px] flex items-center xl:justify-start justify-center md:px-20   ">
        <div className="flex flex-col items-center gap-4 justify-center border-l border-b border-t border-white w-[340px] h-full">
          <div className="flex z-40 items-end justify-center text-white w-full">
            <div className=" text-9xl ">9</div>
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
      <div className=" flex p-5 xl:px-20    w-full  h-[500px]">
        <div className="flex flex-col gap-10 items-start justify-center w-full h-full ">
          <div className="text-white text-2xl font-bold">Great Experience</div>
          <div className="text-white text-2xl">
            Fill appear won’t may make moveth signs. Fourth. Good own. Green
            you’re moveth us, lesser.
          </div>
          <div className="flex flex-col gap-16 w-full">
            {" "}
            <div
              ref={skilBarsRef}
              className="w-full  text-white flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div>WEB DESIGN</div>
                <div className="web-design"> {webDesignWidth}%</div>
              </div>
              <div className="w-full relative ">
                <div
                  className="absolute z-40  h-2 bg-red-500 rounded-full duration-[4000ms]"
                  style={{ width: `${webDesignWidthObserver}%` }}
                ></div>
                <div className=" absolute w-full h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div
              ref={skilBarsRef}
              className="w-full text-white flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div>FIGMA</div>
                <div className="figma">{figmaWidth}%</div>
              </div>
              <div className="w-full relative ">
                <div
                  className="absolute z-40  h-2 bg-red-500 rounded-full duration-[4000ms]"
                  style={{ width: `${figmaWidthObserver}%` }}
                ></div>
                <div className=" absolute w-full h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div
              ref={skilBarsRef}
              className="w-full text-white flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div>WORDPRESS</div>
                <div className="wordpress"> {wordpressWidth} %</div>
              </div>
              <div className="w-full relative ">
                <div
                  className="absolute z-40  h-2 bg-red-500 rounded-full duration-[4000ms]"
                  style={{ width: `${wordpressWidthObserver}%` }}
                ></div>
                <div className=" absolute w-full h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
