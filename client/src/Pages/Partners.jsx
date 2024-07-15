import axios from "axios";
import { useState, useEffect } from "react";
export default function Partners() {
  const [partnerData, setPartnerData] = useState([]);

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/partner")
      .then((response) => {
        setPartnerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching partner:", error);
      });
  }, []);
  console.log("partner", partnerData);

  return (
    <div className="w-full md:h-screen flex items-center justify-center  relative p-1 md:p-20 ">
      <div className="w-full h-full bg-[#161616] absolute z-30 "></div>

      <div className="flex flex-col items-start justify-center gap-10 w-full h-full p-20  ">
        {" "}
        <div className="text-5xl text-white z-40  w-full">Partners</div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center justify-center place-items-center gap-1 md:gap-10 z-40 w-full   ">
          {partnerData.map((slide) => (
            <div
              key={slide.id}
              className="p-10 opacity-50 hover:opacity-100 duration-500 self-center  "
            >
              <img src={slide.partner_logo} alt={`Partner ${slide.id}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
