import { Link } from "react-scroll";
import { RiCloseLargeFill } from "react-icons/ri";

export default function MobileNavbar({ handleMobileMenuControl }) {
  return (
    <div className="  w-full  h-screen items-center justify-center p-10 text-white fixed z-50 bg-[#161616] ">
      <div className="flex flex-col items-center justify-center">
        <div className="z-50 flex items-center justify-end w-full">
          <RiCloseLargeFill
            onClick={handleMobileMenuControl}
            className="size-10"
          />
        </div>

        <div className="z-50 flex items-center justify-center gap-16 w-full">
          <div className="flex  flex-col items-center justify-center gap-10 w-full">
            <div className="flex items-end justify-center gap-1">
              <div className="text-4xl">Gilber </div>
              <div className="text-4xl text-red-700">.</div>
            </div>
            <div className="hover:text-red-500 duration-500 hover:cursor-pointer">
              <Link to="home" smooth={true} onClick={handleMobileMenuControl}>
                HOME
              </Link>
            </div>
            <div className="hover:text-red-500 duration-500 hover:cursor-pointer">
              <Link to="about" smooth={true} onClick={handleMobileMenuControl}>
                ABOUT
              </Link>
            </div>
            <div className="hover:text-red-500 duration-500 hover:cursor-pointer">
              <Link
                to="projects"
                smooth={true}
                onClick={handleMobileMenuControl}
              >
                PROJECTS
              </Link>
            </div>
            <div className="hover:text-red-500 duration-500 hover:cursor-pointer">
              <Link
                to="education"
                smooth={true}
                onClick={handleMobileMenuControl}
              >
                EDUCATION
              </Link>
            </div>
            <div className="hover:text-red-500 duration-500 hover:cursor-pointer">
              <Link
                to="testimonials"
                smooth={true}
                onClick={handleMobileMenuControl}
              >
                TESTIMONIALS
              </Link>
            </div>
            <div className="hover:text-red-500 duration-500 hover:cursor-pointer">
              <Link
                to="partners"
                smooth={true}
                onClick={handleMobileMenuControl}
              >
                PARTNERS
              </Link>
            </div>
            <div className="hover:text-red-500 duration-500 hover:cursor-pointer">
              <Link to="blog" smooth={true} onClick={handleMobileMenuControl}>
                BLOG
              </Link>
            </div>
            <div className="hover:text-red-500 duration-500 bg-red-500 hover:cursor-pointer">
              <Link
                to="contact"
                smooth={true}
                onClick={handleMobileMenuControl}
              >
                CONTACT
              </Link>
            </div>
            <div>+7 (212) 674-25-10</div>
          </div>
        </div>
      </div>
    </div>
  );
}
