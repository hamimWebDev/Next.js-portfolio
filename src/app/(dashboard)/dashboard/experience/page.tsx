"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react"; 
import ExperienceTable from "../../../../components/Dashboard/ExperienceTable";
import { useGetAllJourney } from "../../../../hooks/journey.hook";

const MangeExperience = () => {
  const { data, isPending } = useGetAllJourney();
  const [experience, setExperience] = useState<any[]>([]);
console.log(experience)
  useEffect(() => {
    if (data?.data) {
      // Filter data where type is 'experience'
      const filteredExperience = data.data.filter((item: any) => item.type === 'experience');
      setExperience(filteredExperience);
    }
  }, [data]);

  return (
    <div className="lg:ml-4">
      <h3 className="text-2xl font-bold mb-4 text-center">My Experience</h3>
      <Link className="flex justify-end" href="/dashboard/experience/create-experience">
        <Button className="mb-4 border rounded-full bg-accent text-primary px-4 py-2" color="success">
          Create Experience
        </Button>
      </Link>
      <ExperienceTable
        experiences={experience}
        isLoading={isPending}
        setExperiences={setExperience}
      />
    </div>
  );
};

export default MangeExperience;
