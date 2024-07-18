import { useState, useEffect } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import { MdEditNote } from "react-icons/md";

export default function Contact() {
  const [contactData, setContactData] = useState([]);
  const [editedContact, setEditedContact] = useState({});
  const activeComponent = useSelector((state) => state.activeComponent);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Verileri getir
    axios
      .get("http://localhost:3000/contact")
      .then((response) => {
        setContactData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching contact:", error);
      });
  }, []);

  const handleEditClick = (contact) => {
    setIsEditing(true);
    setEditedContact(contact);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios
      .put(
        `http://localhost:3000/api/post/updateContact/${editedContact.id}`,
        editedContact
      )
      .then(() => {
        setContactData((prev) =>
          prev.map((contact) =>
            contact.id === editedContact.id ? editedContact : contact
          )
        );
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating Contact:", error);
      });
  };

  console.log("contact data", contactData);
  console.log("contact edit data", editedContact);

  return (
    <div className="w-full xl:h-screen h-[1000px] md:h-[850px] relative">
      <div className="z-30 absolute bg-cover bg-center w-full h-full bg-[url(http://paul-themes.com/wordpress/gilber/wp-content/uploads/2020/12/contact.jpg)]"></div>
      <div className="absolute z-40 flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-20 w-full h-full text-white p-10 md:p-40">
        {activeComponent === "Contact" ? (
          isEditing ? (
            <div className="w-full h-full">
              <div className="p-10 z-40 flex flex-col gap-5 items-start justify-around w-full h-full border">
                <div className="text-5xl">Contact edit</div>
                <input
                  name="contact_title"
                  value={editedContact.contact_title || ""}
                  onChange={handleChange}
                  className="w-full text-black p-2"
                />
                <input
                  name="contact_address"
                  value={editedContact.contact_address || ""}
                  onChange={handleChange}
                  className="w-full text-black p-2"
                />
                <input
                  name="contact_phone_number"
                  value={editedContact.contact_phone_number || ""}
                  onChange={handleChange}
                  className="w-full text-black p-2"
                />
                <input
                  name="contact_mail"
                  value={editedContact.contact_mail || ""}
                  onChange={handleChange}
                  className="w-full text-black p-2"
                />
                <button
                  onClick={handleSaveClick}
                  className="w-full bg-blue-500 p-2 rounded-xl text-xl"
                >
                  Güncelle
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full h-full">
              {contactData.map((data) => (
                <div
                  key={data.id}
                  className="relative z-40 flex flex-col gap-5 items-start justify-around w-full h-full border"
                >
                  <div className="absolute text-white top-0 right-0">
                    <MdEditNote
                      onClick={() => handleEditClick(data)}
                      className="size-10 hover:cursor-pointer"
                    />
                  </div>
                  <div className="text-5xl">Contact</div>
                  <div className="text-zinc-400 w-full">
                    {data.contact_title}
                  </div>
                  <div className="text-4xl">{data.contact_address}</div>
                  <div className="text-3xl">{data.contact_phone_number}</div>
                  <div className="text-zinc-400">{data.contact_mail}</div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="w-full h-full">
            {contactData.map((data) => (
              <div
                key={data.id}
                className="z-40 flex flex-col gap-5 items-start justify-around w-full h-full"
              >
                <div className="text-5xl">Contact</div>
                <div className="text-zinc-400 w-full">{data.contact_title}</div>
                <div className="text-4xl">{data.contact_address}</div>
                <div className="text-3xl">{data.contact_phone_number}</div>
                <div className="text-zinc-400">{data.contact_mail}</div>
              </div>
            ))}
          </div>
        )}
        <div className="w-full h-full text-white">
          <form className="flex flex-col gap-5">
            <div className="flex gap-3">
              <p>
                <span className="text-white text-3xl">
                  Let's grab a coffee and jump on conversation
                </span>
                ,<span className="text-red-500 text-3xl"> chat with me.</span>
              </p>
            </div>
            <label>
              <span className="border-b border-gray-500 focus-within:border-white p-2 flex items-start justify-start">
                <input
                  className="z-10 bg-transparent focus:border-teal focus:outline-none p-2"
                  placeholder="Your Name"
                />
              </span>
            </label>
            <label>
              <span className="border-b border-gray-500 focus-within:border-white p-2 flex items-start justify-start">
                <input
                  className="z-10 bg-transparent focus:outline-none p-2"
                  placeholder="Your Email"
                />
              </span>
            </label>
            <label>
              <span className="border-b border-gray-500 focus-within:border-white p-2 flex items-start justify-start">
                <textarea
                  className="h-32 xl:h-48 w-full bg-transparent focus:outline-none p-2"
                  placeholder="Message"
                />
              </span>
            </label>
            <button className="bg-red-600 text-white p-3 px-4 w-1/3">
              CONTACT ME
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
