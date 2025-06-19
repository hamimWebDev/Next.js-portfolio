"use client";

import React, { useEffect } from "react";
     
import Services from "../components/Services";
import Work from "../components/Work/Work";
import Testimonials from "../components/Testimonial/Testimonials";
import Footer from "../components/Footer";
import About from "../components/About";
import Contact from "../components/Contact"
import FixedMenu from "../components/FixedMenu"
import Hero from "../components/Hero"
import Journey from "../components/Journey"
import Blogs from "../components/Blogs/Blogs";

const Home = () => {
  // implement locomotive scroll
  useEffect(() => {
    const LoadLocomotiveScroll = async () => {
      const LocoMotiveScroll = (await import("locomotive-scroll")).default;
      new LocoMotiveScroll();
    };
    LoadLocomotiveScroll();
  }, []);
  return (
    <div>
      <Hero />
      <FixedMenu />
      <Services />
      <About />
      <Journey />
      <Work />
      <Blogs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
