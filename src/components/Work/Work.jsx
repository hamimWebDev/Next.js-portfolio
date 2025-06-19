"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useEffect, useState } from "react";
import AnimatedText from "../AnimatedText";
import WorkItems from "./WorkItems";
import { useGetAllWork } from "../../hooks/work.hook";

// const data = [
//   {
//     href: "",
//     category: "frontend",
//     image: "/assets/work/thumb-3.png",
//     title: "Velox App",
//   },
//   {
//     href: "",
//     category: "frontend",
//     image: "/assets/work/thumb-4.png",
//     title: "Quantam Portfolio",
//   },
//   {
//     href: "",
//     category: "frontend",
//     image: "/assets/work/thumb-5.png",
//     title: "Synargy Landing Page",
//   },
//   {
//     href: "",
//     category: "fullstack",
//     image: "/assets/work/thumb-6.png",
//     title: "Apollo Travel",
//   },
//   {
//     href: "",
//     category: "fullstack",
//     image: "/assets/work/thumb-7.png",
//     title: "Horizon App",
//   },
//   {
//     href: "",
//     category: "frontend",
//     image: "/assets/work/thumb-4.png",
//     title: "Quantam Portfolio",
//   },
//   {
//     href: "",
//     category: "frontend",
//     image: "/assets/work/thumb-5.png",
//     title: "Synargy Landing Page",
//   },
//   {
//     href: "",
//     category: "fullstack",
//     image: "/assets/work/thumb-6.png",
//     title: "Apollo Travel",
//   },
//   {
//     href: "",
//     category: "fullstack",
//     image: "/assets/work/thumb-7.png",
//     title: "Horizon App",
//   },
//   {
//     href: "",
//     category: "fullstack",
//     image: "/assets/work/thumb-6.png",
//     title: "Apollo Travel",
//   },
//   {
//     href: "",
//     category: "fullstack",
//     image: "/assets/work/thumb-7.png",
//     title: "Horizon App",
//   },
//   {
//     href: "",
//     category: "frontend",
//     image: "/assets/work/thumb-4.png",
//     title: "Quantam Portfolio",
//   },
//   {
//     href: "",
//     category: "frontend",
//     image: "/assets/work/thumb-5.png",
//     title: "Synargy Landing Page",
//   },
//   {
//     href: "",
//     category: "fullstack",
//     image: "/assets/work/thumb-6.png",
//     title: "Apollo Travel",
//   },
//   {
//     href: "",
//     category: "fullstack",
//     image: "/assets/work/thumb-7.png",
//     title: "Horizon App",
//   },
// ];


const Work = () => {

  const { data, isPending } = useGetAllWork();
  const [work, setWork] = useState([]);
  useEffect(() => {
    if (data?.data) {

      setWork(data?.data);
    }
  }, [data]);


  //  extract unique categories
  const uniqueCategories = Array.from(
    new Set(work.map((item) => item.category))
  );

  // create tab with all categories and unique categories
  const tabData = [
    { category: "all" },
    ...uniqueCategories.map((category) => ({ category })),
  ];

  // state to manage the currently selected tab
  const [tabValue, setTabValue] = useState("all");
  // number of item to show initially
  const [visibleItems, setVisibleItems] = useState(6);

  // filter data based on selected tab
  const filterWork =
    tabValue === "all"
      ? work.filter((item) => item.category !== "all")
      : work.filter((item) => item.category === tabValue);

  // handle load more button click
  const loadMoreItem = () => {
    setVisibleItems(visibleItems + 3);
  };
  return (
    <section className="pt-16 sm:pt-20 md:pt-24 min-h-screen px-4 sm:px-6 lg:px-8" id="work">
      <div className="container mx-auto max-w-7xl">
        <Tabs defaultValue="all" className="w-full flex flex-col">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-12 lg:mb-16">
            <AnimatedText
              text="My Latest Work"
              textStyles="h2 mb-6 sm:mb-8 lg:mb-10"
            />
            {/* render for trigger */}
            <TabsList className="max-w-max mb-[30px]">
              {tabData.map((item, index) => (


                <TabsTrigger
                  key={index}
                  value={item.category}
                  className="uppercase text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-6 py-2 sm:py-3 min-w-fit flex-1 sm:flex-none"
                  onClick={() => setTabValue(item.category)}
                >
                  {item.category}
                </TabsTrigger>

              ))}
            </TabsList>


          </div>
          {/* render content for the selected tab */}
          <TabsContent value={tabValue} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <AnimatePresence>
                {filterWork.slice(0, visibleItems).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <WorkItems {...item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {/* Load more button */}
            {visibleItems < filterWork.length && (
              <div className="flex justify-center mt-8 sm:mt-12 lg:mt-16">
                <button
                  onClick={loadMoreItem}
                  className="btn btn-accent px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full hover:scale-105 transition-all duration-300"
                >
                  Load More
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Work;
