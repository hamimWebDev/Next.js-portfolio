import StatsItem from "./StatsItem";

const statsData = [
  {
    endCountNum: 1,
    endCountText: "+",
    text: "Yrs. of Experience",
  },
  {
    endCountNum: 20,
    endCountText: "+",
    text: "Websites Developed",
  },
  {
    endCountNum: 90,
    endCountText: "%",
    text: "Client Satifidaction",
  },
];
const Stats = () => {
  return (
    <section className="flex justify-center xl:justify-normal mx-auto xl:mx-0 xl:w-[380px] gap-4 xl:gap-0  ">
      {statsData.map((data, index) => {
        return (
          <StatsItem
            endCountNum={data.endCountNum}
            endCountText={data.endCountText}
            text={data.text}
            key={index}
          />
        );
      })}
    </section>
  );
};

export default Stats;
