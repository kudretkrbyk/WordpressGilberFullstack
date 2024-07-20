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

const components = [
  { name: "Home", component: <Home /> },
  { name: "About", component: <About /> },
  { name: "Blog", component: <Blog /> },
  { name: "Education", component: <Education /> },
  { name: "Partners", component: <Partners /> },
  { name: "Projects", component: <Projects /> },
  { name: "Testimonial", component: <Testimonials /> },
  { name: "Contact", component: <Contact /> },
];

const suggestions = {
  Blog: [
    "Blog Post Ekle",
    "Blog Post Sil",
    " Blog Başlık Düzenle",
    "Blog Yazı Sil",
  ],
  Home: [
    "Home Post Ekle",
    "Home Post Sil",
    " Home Başlık Düzenle",
    "Home Yazı Sil",
  ],
  About: [
    "About Post Ekle",
    "About Post Sil",
    " About Başlık Düzenle",
    "About Yazı Sil",
  ],

  // Diğer bileşenler için öneriler ekleyin
};

export default function Admin() {
  const [menuWidthControl, setMenuWidthControl] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const activeComponent = useSelector((state) => state.activeComponent);

  const handleMenuWControl = () => {
    setMenuWidthControl(!menuWidthControl);
  };

  const handleSetActiveComponent = (data) => {
    dispatch(setActiveComponent(data));
    setMenuWidthControl(false);
    setShowSuggestions(false);
  };

  const renderComponent = () => {
    const active = components.find(
      (component) => component.name === activeComponent
    );
    return active ? active.component : <div></div>;
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filtered = Object.entries(suggestions).flatMap(([key, value]) =>
        value
          .filter((suggestion) =>
            suggestion.toLowerCase().includes(term.toLowerCase())
          )
          .map((suggestion) => ({ key, suggestion }))
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="relative flex flex-col w-full h-full">
        <div
          className={`z-40 flex items-center justify-start gap-10 p-10 w-[600px] ${
            activeComponent || menuWidthControl ? "text-white" : "text-black"
          }`}
        >
          <div className="text-2xl">Sayfaları Düzenle</div>
          <div>
            <GiHamburgerMenu
              onClick={handleMenuWControl}
              className="size-10 hover:cursor-pointer"
            />
          </div>
        </div>

        <div
          className={`flex absolute z-40 bg-[#161616] ${
            menuWidthControl ? "w-full" : "w-0"
          } h-screen overflow-hidden duration-1000`}
        >
          <div className="z-40 flex flex-col items-center justify-center gap-5 p-10 w-full text-white text-xl">
            <div className="w-2/3 flex items-center justify-end">
              <RiCloseLargeLine
                className="size-10 hover:cursor-pointer"
                onClick={() => setMenuWidthControl(false)}
              />
            </div>
            <div className="w-80 relative">
              <div>
                {" "}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Ara..."
                  className="p-2 rounded-md text-black w-80"
                />
              </div>
              <div>
                {" "}
                {showSuggestions && (
                  <div className="absolute w-full bg-gray-200 top-12 p-2 rounded-md shadow-md text-black">
                    {filteredSuggestions.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(item)}
                        className="hover:bg-gray-200 p-2 rounded-md cursor-pointer"
                      >
                        {item.suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>{" "}
            </div>

            {/* Menü bileşenleri */}
            {components.map((component) => (
              <div
                key={component.name}
                className="hover:cursor-pointer"
                onClick={() => handleSetActiveComponent(component.name)}
              >
                {component.name}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute z-30 w-full border border-red-500">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
