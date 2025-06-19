"use client";
import { motion } from "framer-motion";

const RotatingShape = ({ content, direction, duration }) => {
  const rotationAnimation = {
    animate: {
      // rotate 360 degrees based on the direction
      rotate: direction === "right" ? 360 : direction === "left" ? -360 : 0,
      transition: {
        duration: duration, // duration of one full rotaion
        ease: "linear", // smooth rotaiton
        repeat: Infinity,
      },
    },
  };
  return (
    <motion.div variants={rotationAnimation} animate="animate">
      {content}
    </motion.div>
  );
};

export default RotatingShape;
