"use client";
import { TypeAnimation } from "react-type-animation";
import { Link as ScrollLink } from "react-scroll";
import Image from "next/image";
import RotatingShape from "./RotatingShape";
import Header from "./Header";
import Stats from "./Stats/Stats";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="h-[800px] relative bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] to-[#fff] overflow-hidden" id="home">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-gradient-to-br from-[#a5b4fc]/30 via-[#c4b5fd]/30 to-[#fff]/0 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.18, 0.22, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-tl from-[#c4b5fd]/20 via-[#a5b4fc]/20 to-[#fff]/0 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      {/* header */}
      <Header />

      <div className="container mx-auto h-full">
        <div className="relative z-20 h-full w-full xl:max-w-[768px] flex flex-col items-center xl:items-start justify-center text-center xl:text-left pt-10">
          <motion.h1
            className="h1 mb-2 max-w-[350px] xl:max-w-none bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] bg-clip-text text-transparent drop-shadow-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#1e293b]">I Build And</span> Design Powerfull
            <TypeAnimation
              preRenderFirstString={true}
              sequence={[
                "Frontend",
                200,
                "Backend",
                200,
                "Full-Stack",
                200,
                "Applications",
                200,
              ]}
              speed={30}
              repeat={Infinity}
              wrapper="span"
              cursor={false}
              className="ml-2 xl:ml-4"
            />
          </motion.h1>
          <motion.p
            className="lead max-w-[476px] mb-7 text-[#334155]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Delivering powerfull, custom websites that blend aeshtetics with performance
          </motion.p>
          <ScrollLink to="contact" smooth>
            <motion.button
              className="btn btn-accent bg-[#6366f1] hover:bg-[#4f46e5] mb-8 shadow-md px-8 py-3 rounded-full text-lg font-semibold text-white transition-all duration-300"
              whileHover={{ scale: 1.07, backgroundColor: "#4f46e5" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              Contact Me
            </motion.button>
          </ScrollLink>
          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <Stats />
          </motion.div>
        </div>
        {/* image */}
        <div className="hidden xl:flex w-[55vw] h-[800px] absolute top-0 right-0 bg-[#ede9fe]">
          <motion.div
            className="absolute w-[658px] h-[742px] -bottom-5 z-40 left-[6.5vw]"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <Image
              src="/Hamim-img-1.png"
              fill
              quality={100}
              priority
              className="object-contain drop-shadow-2xl"
              alt="Md. Hamim Howlader Asif"
            />
          </motion.div>
          {/* arrow shape */}
          <motion.div
            className="hidden xl:flex absolute top-60 left-[4vw]"
            data-scroll
            data-scroll-speed="0.05"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            <Image
              src="/assets/hero/arrow.svg"
              width={160}
              height={160}
              alt="Md. Hamim Howlader Asif arrow"
            />
          </motion.div>
          {/* shape 1 */}
          <motion.div
            className="absolute top-[600px] left-[3vw]"
            data-scroll
            data-scroll-speed="0.2"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <RotatingShape
              content={
                <Image
                  src="/assets/hero/shape-1.svg"
                  width={38}
                  height={38}
                  alt="shape 1"
                />
              }
              direction="left"
              duration={6}
            />
          </motion.div>

          {/* shape 2 */}
          <motion.div
            className="absolute top-[240px] xl:left-[30vw]"
            data-scroll
            data-scroll-speed="0.1"
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <RotatingShape
              content={
                <Image
                  src="/assets/hero/shape-2.svg"
                  width={34}
                  height={34}
                  alt="shape 2"
                />
              }
              direction="right"
              duration={5}
            />
          </motion.div>

          {/* shape 3 */}
          <motion.div
            className="absolute top-[400px] xl:left-[40vw]"
            data-scroll
            data-scroll-speed="0.08"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <RotatingShape
              content={
                <Image
                  src="/assets/hero/shape-3.svg"
                  width={36}
                  height={36}
                  alt="shape 3"
                />
              }
              direction="left"
              duration={7}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
