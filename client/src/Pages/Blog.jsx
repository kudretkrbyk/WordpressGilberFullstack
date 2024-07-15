import AnimationBorder from "../Components/AnimationBorder";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Blog() {
  const [recentNewsData, setRecentNewsData] = useState([]);

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/recentnews")
      .then((response) => {
        setRecentNewsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recentnews:", error);
      });
  }, []);
  console.log("recent", recentNewsData);
  return (
    <div className=" w-full xl:h-screen flex items-center justify-center text-white bg-[#161616] ">
      <div className=" flex flex-col gap-10 w-full p-5 md:p-32 xl:p-48  items-start justify-center">
        <div className="text-xl">Recent news</div>
        <div className="flex flex-col xl:flex-row w-full h-full gap-10">
          {recentNewsData.map((data, index) => (
            <div key={data.id} className="group w-full relative">
              <div className=" w-full">
                <AnimationBorder></AnimationBorder>
              </div>
              <div
                className={`bg-cover w-full h-[400px] bg-center bg-[url(${data.recent_photo})]`}
              ></div>
              <div className=" top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 duration-500 ">
                <div className=" top-0 left-0   w-full h-[400px] absolute bg-[#161616] p-5 px-10 flex flex-col gap-14">
                  <div>{data.recent_date} </div>
                  <div className="text-2xl font-bold">{data.recent_title}</div>
                  <div className="flex flex-col gap-20">
                    {" "}
                    <div>{data.recent_comment}</div>
                    <div>Read More</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
