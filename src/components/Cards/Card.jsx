import Image from "next/image";
import { motion } from "framer-motion";

const Card = ({
  type,
  logoUrl,
  position,
  duration,
  description,
  company,
  institution,
  qualification,
  name,
  icon,
}) => {
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.1
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.2
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className="w-full h-[300px] overflow-hidden flex items-center sticky top-12"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="w-full h-[270px] relative group">
        {/* Background with gradient and shadow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-xl border border-blue-100/50 shadow-lg group-hover:shadow-xl transition-all duration-300"></div>

        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative flex flex-col h-full">
          {/* Header Section */}
          <motion.div
            className="h-[80px] xl:h-[68px] bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm flex flex-col xl:flex-row justify-center xl:justify-between items-center px-6 md:px-[84px] rounded-t-xl border-b border-blue-200/30"
            variants={headerVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex gap-3 items-center">
              <motion.div
                variants={iconVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="relative"
              >
                <Image
                  src="/assets/journey/shape.svg"
                  width={18}
                  height={18}
                  alt=""
                  className="text-blue-600"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-400 rounded-full blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </motion.div>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {type === "experience"
                  ? position
                  : type === "education"
                    ? qualification
                    : duration}
              </h3>
            </div>
            <motion.p
              className="text-sm font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full border border-blue-200/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {type !== "experience" && type !== "education" ? null : duration}
            </motion.p>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="flex-1 flex items-center justify-center xl:justify-start md:py-8 md:px-16"
            variants={contentVariants}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-6 text-center xl:text-left xl:gap-12 px-4 xl:px-0">
              {type === "skill" ? (
                // Render icon for skills with enhanced styling
                <motion.div
                  className="w-max xl:w-[300px] h-full relative flex items-center justify-center"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <div className="relative w-[72px] h-[72px]">
                    <Image
                      src={icon}
                      fill
                      alt=""
                      className="object-contain filter drop-shadow-lg group-hover/logo:drop-shadow-xl transition-all duration-300"
                    />
                    {/* Glow effect for skill icons */}
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </motion.div>
              ) : (
                // Render logo for experience and education with enhanced styling
                <motion.div
                  className="relative w-[300px] h-[30px] xl:h-[84px] group/logo"
                  variants={iconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <Image
                    src={logoUrl}
                    fill
                    alt=""
                    className="object-contain filter drop-shadow-lg group-hover/logo:drop-shadow-xl transition-all duration-300"
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-white/20 rounded-lg blur-sm opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              )}

              <div className="xl:border-l xl:border-blue-200/50 xl:pl-12 w-full relative">
                {/* Decorative line */}
                <div className="hidden xl:block absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-300/50 to-transparent"></div>

                <motion.h3
                  className="text-xl xl:text-2xl font-bold mb-3 xl:mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {type === "experience"
                    ? company
                    : type === "education"
                      ? institution
                      : type === "skill"
                        ? name
                        : null}
                </motion.h3>
                <motion.p
                  className="text-base text-gray-600 leading-relaxed max-w-[660px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  {description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
