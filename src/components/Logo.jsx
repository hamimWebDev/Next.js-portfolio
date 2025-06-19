import Link from "next/link";
import { motion } from "framer-motion";

const Logo = ({ light = false }) => {
  const colorClass = light ? "text-white" : "text-primary";
  return (
    <Link href="/" className="font-primary text-2xl tracking-[4px] group">
      <motion.span
        className={
          "inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_200%] bg-clip-text text-transparent transition-colors duration-300 group-hover:text-cyan-400 " +
          colorClass
        }
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        Md. Hamim Howlader Asif
      </motion.span>
    </Link>
  );
};

export default Logo;
