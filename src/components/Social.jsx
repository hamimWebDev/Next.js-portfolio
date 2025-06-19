import Link from "next/link";
import {
  FaLinkedin,
  FaFacebookF,
  FaGithub,
  FaBriefcase,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { motion } from "framer-motion";

const socials = [
  {
    icon: <FaGithub />,
    path: "https://github.com/hamimWebDev",
    gradient: "from-gray-700 via-gray-900 to-black",
    glow: "shadow-[0_0_16px_#333]",
  },
  {
    icon: <FaFacebookF />,
    path: "https://www.facebook.com/Hamim.webDevloper",
    gradient: "from-blue-400 via-blue-600 to-blue-800",
    glow: "shadow-[0_0_16px_#1877f2]",
  },
  {
    icon: <RiInstagramFill />,
    path: "https://www.instagram.com/md.hamimhowladerasif",
    gradient: "from-pink-500 via-red-500 to-yellow-500",
    glow: "shadow-[0_0_16px_#e1306c]",
  },
  {
    icon: <FaLinkedin />,
    path: "https://www.linkedin.com/in/md-hamim-howlader-asif",
    gradient: "from-blue-500 via-cyan-500 to-blue-700",
    glow: "shadow-[0_0_16px_#0a66c2]",
  },
  {
    icon: <FaBriefcase />,
    path: "https://hamim-portfolio.vercel.app",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    glow: "shadow-[0_0_16px_#a21caf]",
  },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className=" transition-shadow duration-300"
          >
            <Link
              href={item.path}
              className={`bg-gradient-to-br ${item.gradient} text-white hover:opacity-90 ${iconStyles} flex items-center justify-center rounded-full w-[40px] h-[40px] text-xl shadow-lg`}

              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Social;
