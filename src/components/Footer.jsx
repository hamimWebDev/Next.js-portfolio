import Logo from "./Logo";
import Social from "./Social";
import { motion } from "framer-motion";

const gradientVariants = {
  initial: { backgroundPosition: "0% 50%" },
  animate: {
    backgroundPosition: "100% 50%",
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "linear",
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-16 pb-8 relative z-10 overflow-hidden group"
    >
      {/* Decorative SVG Wave */}
      <div className="absolute top-0 left-0 w-full -translate-y-full pointer-events-none select-none">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16">
          <path fill="url(#footer-wave)" d="M0,80 C360,120 1080,0 1440,80 L1440,0 L0,0 Z" />
          <defs>
            <linearGradient id="footer-wave" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6a82fb" />
              <stop offset="0.5" stopColor="#fc5c7d" />
              <stop offset="1" stopColor="#43e97b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Animated Gradient Glassmorphism Background */}
      <motion.div
        variants={gradientVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 -z-10 transition-all duration-500 group-hover:scale-105"
        style={{
          background:
            "linear-gradient(120deg, #6a82fb 0%, #fc5c7d 50%, #43e97b 100%)",
          backgroundSize: "200% 200%",
          filter: "blur(6px)",
          opacity: 0.85,
        }}
      />
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-md border-t border-white/20" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 xl:flex-row xl:justify-between xl:items-center">
          <div className="flex flex-col items-center xl:items-start gap-2">
            
            <span className="text-lg md:text-xl font-bold text-white drop-shadow-lg tracking-wide">
              Md. Hamim Howlader Asif
            </span>
            <span className="text-xs md:text-sm text-white/70 font-light tracking-wide">
              Creative Full Stack Developer
            </span>
          </div>
          <Social
            containerStyles="flex items-center gap-3 md:gap-4"
            iconStyles="transition-all duration-300 text-lg w-[40px] h-[40px] bg-gradient-to-tr from-primary to-pink-500 text-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 hover:from-pink-500 hover:to-green-400 hover:shadow-xl"
          />
        </div>
        <div className="w-full h-px bg-white/20 my-8 xl:hidden" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="text-center text-white/90 font-light text-sm md:text-base tracking-wide mt-4 drop-shadow"
        >
          Copyright &copy; 2025. All rights reserved
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
