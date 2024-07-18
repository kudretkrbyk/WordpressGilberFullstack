import axios from "axios";
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { MdEditNote } from "react-icons/md";
export default function Partners() {
  const [partnerData, setPartnerData] = useState([]);
  const activeComponent = useSelector((state) => state.activeComponent);

  const [isEditing, setIsEditing] = useState(false);
  const [editedPartner, setEditedPartner] = useState({});

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

  const handleEditClick = (slide) => {
    setIsEditing(true);
    setEditedPartner(slide);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPartner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("edited partner", editedPartner);

  const handleSaveClick = () => {
    axios
      .put(
        `http://localhost:3000/api/post/updatePartner/${editedPartner.id}`,
        editedPartner
      )
      .then(() => {
        setPartnerData((prev) =>
          prev.map((data) =>
            data.id === editedPartner.id ? editedPartner : data
          )
        );
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating partner:", error);
      });
  };

  return (
    <div className="w-full md:h-screen flex items-center justify-center  relative p-1 md:p-20 ">
      <div className="w-full h-full bg-[#161616] absolute z-30 "></div>

      <div className="flex flex-col items-start justify-center gap-10 w-full h-full p-20  ">
        {" "}
        <div className="text-5xl text-white z-40  w-full">Partners</div>
        {activeComponent === "Partners" ? (
          isEditing ? (
            <div className="flex  justify-items-center justify-center items-center gap-10  z-40 w-full   ">
              <div key={editedPartner.id} className="p-10 flex gap-10 w-full">
                <img
                  src={editedPartner.partner_logo}
                  alt={`Partner ${editedPartner.id}`}
                />
                <input
                  className="w-full"
                  name="partner_logo"
                  value={editedPartner.partner_logo}
                  onChange={handleChange}
                ></input>
                <button
                  onClick={handleSaveClick}
                  className="bg-blue-500 p-3 px-4 rounded-xl w-48"
                >
                  Güncelle
                </button>
              </div>
            </div>
          ) : (
            <div className=" grid grid-cols-4 justify-items-center justify-center place-items-center gap-1  z-40 w-full   ">
              {partnerData.map((slide) => (
                <div key={slide.id} className="p-10 flex gap-5 ">
                  <img src={slide.partner_logo} alt={`Partner ${slide.id}`} />
                  <div className=" top-0 right-0 hover:cursor-pointer ">
                    <MdEditNote
                      onClick={() => handleEditClick(slide)}
                      className="size-10 text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
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
        )}
      </div>
    </div>
  );
}
