import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";
import { SiExpress, SiNextdotjs } from "react-icons/si";
import Card from "./Card";
import { useGetAllJourney } from "../../hooks/journey.hook";

const journey = [
  // experience
  {
    type: "experience",
    company: "Sheba Mart",
    logoUrl: "/assets/logo/shebamart.svg",
    position: "Frontend Developer",
    duration: "Oct 2023 - Nov 2024",
    description:
      "Built websites and web applications using React, Next.js and Tawlwind CSS. Worked on scalble, user-friendly solutions.",
  },
  {
    type: "experience",
    company: "Coality",
    logoUrl: "/assets/logo/coality.png",
    position: "Full Stack Developer",
    duration: "Oct 2024 - Present",
    description:
      "Built websites and web applications using Ract, Next.js and Node.js. Worked on scalable, user-friendly solutions.",
  },

  // education
  {
    type: "education",
    institution: "Bogura Polytechnic Institute",
    logoUrl: "/assets/logo/bpi.png",
    qualifiacation: "Computer Science and Technology",
    duration: "Jan 2022 - Present",
    description:
      "Learned about computer science and technology, algorithms, data structures, and more.",
  },
  {
    type: "education",
    institution: "Kutubpur High School",
    logoUrl: "/assets/logo/kutubpur.png",
    qualifiacation: "Secondary School Certificate",
    duration: "Jan 2017 - Dec 2021",
    description:
      "Gained knowledge about different subjects, including mathematics, physics, chemistry, and more.",
  },

  // skills
  {
    type: "skill",
    name: "HTML",
    icon: <FaHtml5 />,
    duration: "Learned in 2022",
    description:
      "Created web pages using HTML. Learned about the structure of web pages.",
  },
  {
    type: "skill",
    name: "CSS",
    icon: <FaCss3 />,
    duration: "Learned in 2022",
    description:
      "Styled web pages using CSS. Learned about the design of web pages.",
  },
  {
    type: "skill",
    name: "JavaScript",
    icon: <FaJs />,
    duration: "Learned in 2022",
    description:
      "Implemented interactive elements on web pages using JavaScript.",
  },
  {
    type: "skill",
    name: "React.JS",
    icon: <FaReact />,
    duration: "Learned in 2022",
    description:
      "Built user interfaces using React. Learned about reusable components.",
  },
  {
    type: "skill",
    name: "Next.js",
    icon: <SiNextdotjs />,
    duration: "Learned in 2023",
    description:
      "Built websites and web applications using Next.js. Learned about server-side rendering.",
  },
  {
    type: "skill",
    name: "Node.js",
    icon: <FaNodeJs />,
    duration: "Learned in 2024",
    description:
      "Built server-side applications using Node.js. Learned about APIs and databases.",
  },
  {
    type: "skill",
    name: "Express.js",
    icon: <SiExpress />,
    duration: "Learned in 2024",
    description:
      "Built server-side applications using Express.js. Learned about APIs and databases.",
  },
  {
    type: "skill",
    name: "Database",
    icon: <FaDatabase />,
    duration: "Learned in 2024",
    description:
      "sql and no-sql databases. Learned about databases and how to interact with them.",
  },
];

const Cards = () => {
  const { data, isPending } = useGetAllJourney();

  console.log(data?.data);
  return (
    <>
      <Tabs
        defaultValue="experience"
        className="w-full flex flex-col items-center"
      >
        <TabsList className="max-w-max mb-[30px]">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skill">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="w-full">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {data?.data
                .filter((item) => item.type === "experience")
                .map((card, index) => {
                  return <Card key={index} {...card} />;
                })}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="education" className="w-full">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {data?.data
                .filter((item) => item.type === "education")
                .map((card, index) => {
                  return <Card key={index} {...card} />;
                })}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
        <TabsContent value="skill" className="w-full">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {data?.data
                .filter((item) => item.type === "skill")
                .map((card, index) => {
                  return <Card key={index} {...card} />;
                })}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Cards;
