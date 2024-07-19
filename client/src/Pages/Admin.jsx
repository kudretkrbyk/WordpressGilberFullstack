import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent } from "../redux/slices/activeComponentSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiCloseLargeLine } from "react-icons/ri";

// Diğer bileşenleri import edin
import Home from "./Home";
import About from "./About";
import Blog from "./Blog";
import Education from "./Education";
import Partners from "./Partners";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

export default function Admin() {
  const [menuWidthControl, setMenuWidthControl] = useState(false);
  const dispatch = useDispatch();
  const activeComponent = useSelector((state) => state.activeComponent);

  const handleMenuWControl = () => {
    setMenuWidthControl(!menuWidthControl);
  };

  const handleSetActiveComponent = (data) => {
    dispatch(setActiveComponent(data));
    setMenuWidthControl(false);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Home />;
      case "About":
        return <About />;
      case "Blog":
        return <Blog />;
      case "Education":
        return <Education />;
      case "Partners":
        return <Partners />;
      case "Projects":
        return <Projects />;
      case "Testimonial":
        return <Testimonials />;
      case "Contact":
        return <Contact />;
      default:
        return <div></div>;
    }
  };

  return (
    <div className=" flex w-full h-screen">
      <div className=" relative flex flex-col w-full h-full">
        <div
          className={` z-40 flex items-center justify-start gap-10 p-10  w-[600px] ${
            activeComponent || menuWidthControl ? "text-white" : "text-black"
          } `}
        >
          <div className="text-2xl">Sayfaları Düzenle</div>
          <div>
            <GiHamburgerMenu
              onClick={handleMenuWControl}
              className=" size-10  hover:cursor-pointer"
            />
          </div>
        </div>

        <div
          className={`flex absolute z-40 bg-[#161616] ${
            menuWidthControl ? "w-full" : "w-0"
          } h-screen overflow-hidden duration-1000`}
        >
          <div className="z-40 flex flex-col items-center justify-center gap-5 p-10 w-full text-white text-xl">
            <div className=" w-2/3 flex items-center justify-end  ">
              <RiCloseLargeLine
                className="size-10 hover:cursor-pointer"
                onClick={() => setMenuWidthControl(false)}
              />
            </div>

            <div
              className=" hover:cursor-pointer "
              onClick={() => handleSetActiveComponent("Home")}
            >
              Home
            </div>
            <div
              className=" hover:cursor-pointer "
              onClick={() => handleSetActiveComponent("About")}
            >
              About
            </div>
            <div
              className=" hover:cursor-pointer "
              onClick={() => handleSetActiveComponent("Blog")}
            >
              Blog
            </div>
            <div
              className=" hover:cursor-pointer "
              onClick={() => handleSetActiveComponent("Education")}
            >
              Education
            </div>
            <div
              className=" hover:cursor-pointer "
              onClick={() => handleSetActiveComponent("Partners")}
            >
              Partners
            </div>
            <div
              className=" hover:cursor-pointer "
              onClick={() => handleSetActiveComponent("Projects")}
            >
              Projects
            </div>
            <div
              className=" hover:cursor-pointer "
              onClick={() => handleSetActiveComponent("Testimonial")}
            >
              Testimonial
            </div>
            <div
              className=" hover:cursor-pointer "
              onClick={() => handleSetActiveComponent("Contact")}
            >
              Contact
            </div>
          </div>
        </div>
        <div className="absolute   z-30 w-full border border-red-500 ">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
