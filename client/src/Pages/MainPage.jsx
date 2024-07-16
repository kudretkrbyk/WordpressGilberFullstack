import LeftNav from "../Components/LeftNav";
import Navbar from "../Components/Navbar";
import About from "../Pages/About";
import Home from "../Pages/Home";
import Projects from "../Pages/Projects";
import Partners from "../Pages/Partners";
import Blog from "../Pages/Blog";
import Contact from "../Pages/Contact";
import Education from "../Pages/Education";
import Testimonials from "../Pages/Testimonials";

import { Element } from "react-scroll";

export default function MainPage() {
  return (
    <div className="">
      <Navbar />
      <LeftNav />
      <Element name="home">
        <Home />
      </Element>
      <Element name="about">
        <About />
      </Element>
      <Element name="projects">
        <Projects />
      </Element>
      <Element name="education">
        <Education />
      </Element>
      <Element name="testimonials">
        <Testimonials />
      </Element>
      <Element name="partners">
        <Partners />
      </Element>
      <Element name="blog">
        <Blog />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
    </div>
  );
}
