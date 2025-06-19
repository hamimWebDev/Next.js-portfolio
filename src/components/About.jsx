import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const infoItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut",
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <section className="relative pt-12 pb-24 overflow-hidden" id="about">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-accent/10 to-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </div>

      <motion.div
        className="container mx-auto h-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Image */}
        <div className="h-full flex items-center justify-center">
          <motion.div
            className="hidden xl:flex flex-1 pl-8"
            variants={imageVariants}
          >
            <div className="relative w-full max-w-[300px]">
              {/* Animated background shape */}
              <motion.div
                className="w-[160px] h-[160px] bg-gradient-to-br from-accent to-primary/80 absolute -left-5 -top-5 -z-10 rounded-lg"
                variants={shapeVariants}
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              />
              
              {/* Enhanced image container */}
              <motion.div
                className="rounded-tl-[8px] pb-10 rounded-tr-[120px] w-full bg-gradient-to-b from-[#e5f8f6] to-[#d1f2ef] min-h-[350px] flex items-end justify-center shadow-2xl"
                variants={imageVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  variants={floatingVariants}
                  animate="animate"
                >
                  <Image
                    src="/Hamim-img-2.png"
                    width={350}
                    height={478}
                    quality={100}
                    priority
                    alt="Md. Hamim Howlader Asif"
                    className="drop-shadow-lg"
                  />
                </motion.div>
              </motion.div>
              
              {/* Enhanced rotating shape with glow effect */}
              <motion.div
                className="absolute top-2/4 -right-[65px] flex items-center justify-center"
                variants={shapeVariants}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl" />
                  <Image
                    src="/assets/about/shape-1.svg"
                    width={160}
                    height={160}
                    alt=""
                    className="relative z-10 drop-shadow-lg"
                  />
                </motion.div>
                <motion.div
                  className="absolute text-center text-white z-20"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <div className="text-5xl font-bold leading-none bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    1+
                  </div>
                  <div className="leading-none text-center text-lg font-medium">
                    Years of <br /> Experience
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Enhanced text section */}
          <motion.div
            className="text-center xl:text-left w-full xl:w-1/2 mx-auto xl:mx-0 flex flex-col gap-8"
            variants={textVariants}
          >
            <motion.div
              variants={textVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <AnimatedText text="Md. Hamim Howlader Asif" textStyles="h2 mb-3" />
              <motion.p
                className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Full Stack Developer
              </motion.p>
            </motion.div>
            
            <motion.p
              className="max-w-[680px] mx-auto xl:mx-0 mb-4 text-gray-600 leading-relaxed"
              variants={textVariants}
              whileHover={{
                color: "#374151",
                transition: { duration: 0.3 },
              }}
            >
              I'm a MERN stack developer passionate about
              creating interactive applications and experiences on the web.
            </motion.p>
            
            {/* Enhanced info items */}
            <motion.div
              className="flex flex-col lg:flex-row gap-8 xl:gap-12 max-w-max mx-auto xl:max-0 items-center"
              variants={containerVariants}
            >
              {/* info item 1 */}
              <motion.div
                className="whitespace-nowrap group cursor-pointer"
                variants={infoItemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="uppercase font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                  Age
                </div>
                <div className="text-gray-700 font-medium">20 Years</div>
              </motion.div>

              {/* info item 2 */}
              <motion.div
                className="whitespace-nowrap group cursor-pointer"
                variants={infoItemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="uppercase font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                  Born in
                </div>
                <div className="text-gray-700 font-medium">Barisal, Bangladesh</div>
              </motion.div>

              {/* info item 3 */}
              <motion.div
                className="whitespace-nowrap group cursor-pointer"
                variants={infoItemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="uppercase font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                  Phone
                </div>
                <div className="text-gray-700 font-medium">+880 1768225158</div>
              </motion.div>

              {/* info item 4 */}
              <motion.div
                className="whitespace-nowrap group cursor-pointer"
                variants={infoItemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="uppercase font-bold text-primary mb-1 group-hover:text-accent transition-colors">
                  Email
                </div>
                <div className="text-gray-700 font-medium">mdhamimhowladerasif@gmail.com</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
