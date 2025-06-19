import Image from "next/image";
import { motion } from "framer-motion";

// Animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { y: -10 }
};

const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, rotate: 5 }
};

const services = [
  {
    icon: "/assets/services/icon-1.svg",
    title: "UI UX Design",
    description: "Design compelling engaging user experiences.",
  },
  {
    icon: "/assets/services/icon-2.svg",
    title: "Web Development",
    description:
      "Developing fast, responsive websites that look great on all devices.",
  },
  {
    icon: "/assets/services/icon-3.svg",
    title: "E-commerce Solutions",
    description: "Building custom e-commerce solutions that drive sales.",
  },
  {
    icon: "/assets/services/icon-4.svg",
    title: "Care & Support",
    description: "Providing updates, maintenance and support for your website.",
  },
];

const Services = () => {
  return (
    <section className="relative z-40">
      <div className="container mx-auto">
        <ul className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[20px] -top-12 place-items-center lg:place-items-stretch">
        {services.map((service, index) => (
            <motion.li 
              key={index} 
              className="group relative bg-white/80 backdrop-blur-sm shadow-custom p-8 max-w-[350px] md:max-w-none rounded-2xl border border-white/20 hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl transform translate-x-16 -translate-y-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-2xl transform -translate-x-12 translate-y-12" />
              </div>

              <div className="relative z-10">
                {/* Icon with animation */}
                <motion.div
                  className="mb-6 inline-block p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl group-hover:from-accent/20 group-hover:to-accent/10 transition-all duration-500"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={50}
                    height={50}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </motion.div>

                {/* Title with enhanced typography */}
                <h3 className="text-[22px] text-primary font-bold mb-4 group-hover:text-accent transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>

                {/* Description with improved readability */}
                <p className="text-[16px] text-secondary leading-relaxed group-hover:text-primary/80 transition-colors duration-300">
                  {service.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 w-12 h-1 bg-gradient-to-r from-accent to-accent/60 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Services;
