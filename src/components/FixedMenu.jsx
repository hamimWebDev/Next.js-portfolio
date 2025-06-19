import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FiX } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import { FiMapPin, FiPhoneCall, FiMail } from "react-icons/fi";

// components
import Nav from "./Nav";
import Social from "./Social";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
};

const menuVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.4, type: "spring", bounce: 0.2 },
  },
  exit: { opacity: 0, y: 40, scale: 0.98, filter: "blur(8px)", transition: { duration: 0.3 } },
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const FixedMenu = () => {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false); //ensure mounted component

  const isMobile = useMediaQuery({
    query: "(max-width : 640px)",
  });

  //   set the component is mounted to prevent the mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const handleScroll = () => {
        setShowMenuButton(window.scrollY > 150); //show the button after scrolling 150 px
      };

      if (!isMobile) {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      } else {
        // always show the button on mobile;
        setShowMenuButton(true);
      }
    }
  }, [isMobile, isMounted]);
  console.log(showMenuButton);
  //   prevent rendering untill mounted
  if (!isMounted) return null;

  return (
    <div className="fixed w-full h-[400px] z-50 flex justify-center pointer-events-none bg-transparent">
      {/* Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 bg-black backdrop-blur-sm z-40 pointer-events-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={() => setShowMenu(false)}
          />
        )}
      </AnimatePresence>
      {/* menu */}
      <AnimatePresence>
        {showMenu && showMenuButton && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed max-w-md md:max-w-none h-[400px] bottom-[5.0rem] xl:bottom-[4.0rem] px-4 pointer-events-auto z-50"
          

           
          >
            <motion.div
              className="bg-white/60 backdrop-blur-2xl border border-white/30 shadow-2xl max-w-[1170px] mx-auto py-12 xl:py-12 px-8 xl:px-24 flex items-center gap-12 rounded-3xl glassmorphism"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="w-full md:w-auto">
                <Nav
                  containerStyle="md:border-r border-secondary/28 md:pr-12 w-full md:w-auto text-center md:text-left"
                  listStyles="flex flex-col justify-center gap-4"
                  linkStyles="font-primary text-4xl text-primary cursor-pointer transition-colors duration-200 hover:text-accent"
                  spy={true}
                />
              </motion.div>
              {/* info */}
              <motion.div variants={itemVariants} className="hidden md:flex mx-auto">
                <div>
                  <div className="flex gap-12 mb-12">
                    {/* Location */}
                    <div className="flex flex-col items-center group">
                      <div className="text-[28px] text-accent mb-2 group-hover:scale-110 transition-transform duration-200">
                        <FiMapPin />
                      </div>
                      <p className="font-semibold text-primary text-lg">Location</p>
                      <p className="text-secondary">Barisal, Bangladesh</p>
                    </div>
                    {/* Phone */}
                    <div className="flex flex-col items-center group">
                      <div className="text-[28px] text-accent mb-2 group-hover:scale-110 transition-transform duration-200">
                        <FiPhoneCall />
                      </div>
                      <p className="font-semibold text-primary text-lg">Phone</p>
                      <p className="text-secondary">+880 1768225158</p>
                    </div>
                    {/* Email */}
                    <div className="flex flex-col items-center group">
                      <div className="text-[28px] text-accent mb-2 group-hover:scale-110 transition-transform duration-200">
                        <FiMail />
                      </div>
                      <p className="font-semibold text-primary text-lg">Email</p>
                      <p className="text-secondary">mdhamimhowladerasif@gmail.com</p>
                    </div>
                  </div>
                  {/* socials */}
                  <motion.div variants={itemVariants}>
                    <Social
                      containerStyles="flex gap-2"
                      iconStyles="text-[20px] w-[32px] h-[32px] text-primary flex items-center justify-center rounded-full transition-all duration-200 hover:bg-accent hover:text-white shadow-md"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* menu button */}
      {/* render button without animatins on mobile */}
      {isMobile ? (
        <div className="fixed z-50 bottom-5">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-gradient-to-tr from-accent to-primary shadow-xl w-[54px] h-[54px] rounded-2xl cursor-pointer flex items-center justify-center select-none pointer-events-auto transition-transform duration-300 hover:scale-110"
            aria-label="Open menu"
          >
            <motion.div
              animate={{ rotate: showMenu ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {showMenu ? <FiX className="text-4xl text-white" /> : <CgMenuGridR className="text-4xl text-white" />}
            </motion.div>
          </button>
        </div>
      ) : (
        <AnimatePresence>
          {showMenuButton && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
              }}
              className="fixed z-50 bottom-16 pointer-events-auto"
            >
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-gradient-to-tr from-accent to-primary shadow-xl w-[54px] h-[54px] rounded-2xl cursor-pointer flex items-center justify-center select-none transition-transform duration-300 hover:scale-110"
                aria-label="Open menu"
              >
                <motion.div
                  animate={{ rotate: showMenu ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {showMenu ? <FiX className="text-4xl text-white" /> : <CgMenuGridR className="text-4xl text-white" />}
                </motion.div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default FixedMenu;
