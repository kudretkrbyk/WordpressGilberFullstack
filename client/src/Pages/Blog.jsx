import AnimationBorder from "../Components/AnimationBorder";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdEditNote } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri"; // Corrected import

export default function Blog() {
  const [recentNewsData, setRecentNewsData] = useState([]);
  const activeComponent = useSelector((state) => state.activeComponent);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({});

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/recentnews")
      .then((response) => {
        setRecentNewsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recent news:", error);
      });
  }, []);

  const handleEditClick = (data) => {
    setIsEditing(!isEditing);
    setEditedBlog(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios
      .put(
        `http://localhost:3000/api/post/updateBlog/${editedBlog.id}`,
        editedBlog
      )
      .then(() => {
        setRecentNewsData((prev) =>
          prev.map((data) => (data.id === editedBlog.id ? editedBlog : data))
        );
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating Blog:", error);
      });
  };

  return (
    <div className="w-full xl:h-screen flex items-center justify-center text-white bg-[#161616]">
      <div className="flex flex-col gap-10 w-full p-5 md:p-32 xl:p-48 items-start justify-center">
        <div className="text-xl">Recent news</div>
        {activeComponent === "Blog" ? (
          <div className="relative w-full h-[400px]">
            {isEditing ? (
              <div className="relative flex w-full h-[400px]   border border-white">
                <div className="absolute z-50 top-0 -right-10">
                  <RiCloseLine
                    onClick={() => setIsEditing(false)}
                    className="text-white size-10 z-40 hover:cursor-pointer"
                  />
                </div>

                <div className=" w-full h-full  ">
                  <div className="top-0 left-0 w-full h-full absolute bg-[#161616] flex gap-14 p-5">
                    <div
                      className={`bg-cover w-full h-full bg-center bg-[url(${editedBlog.recent_photo})]`}
                    ></div>
                    <div className="flex flex-col items-center justify-around w-full  gap-3">
                      <input
                        name="recent_title"
                        value={editedBlog.recent_title || ""}
                        onChange={handleChange}
                        className="w-full text-black p-2"
                      ></input>
                      <textarea
                        name="recent_comment"
                        value={editedBlog.recent_comment || ""}
                        onChange={handleChange}
                        className="w-full text-black p-2"
                      ></textarea>
                      <textarea
                        name="recent_photo"
                        value={editedBlog.recent_photo || ""}
                        onChange={handleChange}
                        className="w-full text-black p-2"
                      ></textarea>
                      <button
                        onClick={handleSaveClick}
                        className="w-full bg-blue-500 p-2 rounded-xl text-xl"
                      >
                        Güncelle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative flex flex-row w-full h-full gap-10  ">
                {recentNewsData.map((data) => (
                  <div
                    key={data.id}
                    className="group w-full h-full relative border"
                  >
                    <div className="absolute z-50 top-0 -right-10">
                      <MdEditNote
                        onClick={() => handleEditClick(data)}
                        className="text-white size-10 z-40 hover:cursor-pointer"
                      />
                    </div>

                    <div
                      className={`bg-cover w-full h-full bg-center bg-[url(${data.recent_photo})]`}
                    ></div>
                    <div className="top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 duration-500">
                      <div className="top-0 left-0 w-full h-full absolute bg-[#161616] p-5 px-10 flex flex-col gap-14">
                        <div>{data.recent_date}</div>
                        <div className="text-2xl font-bold">
                          {data.recent_title}
                        </div>
                        <div className="flex flex-col gap-20">
                          <div>{data.recent_comment}</div>
                          <div>Read More</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row w-full h-full gap-10">
            {recentNewsData.map((data) => (
              <div key={data.id} className="group w-full relative">
                <div className="w-full">
                  <AnimationBorder />
                </div>
                <div
                  className={`bg-cover w-full h-[400px] bg-center bg-[url(${data.recent_photo})]`}
                ></div>
                <div className="top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 duration-500">
                  <div className="top-0 left-0 w-full h-[400px] absolute bg-[#161616] p-5 px-10 flex flex-col gap-14">
                    <div>{data.recent_date}</div>
                    <div className="text-2xl font-bold">
                      {data.recent_title}
                    </div>
                    <div className="flex flex-col gap-20">
                      <div>{data.recent_comment}</div>
                      <div>Read More</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
