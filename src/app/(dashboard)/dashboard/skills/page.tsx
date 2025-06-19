"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useGetAllJourney } from "../../../../hooks/journey.hook";
import SkillTable from "../../../../components/Dashboard/SkillTable";

const ManageSkill = () => {
  const { data, isPending } = useGetAllJourney();
  const [skill, setSkill] = useState<any[]>([]);
  console.log(skill);
  useEffect(() => {
    if (data?.data) {
      // Filter data where type is 'experience'
      const filteredExperience = data.data.filter(
        (item: any) => item.type === "skill"
      );
      setSkill(filteredExperience);
    }
  }, [data]);

  return (
    <div className="lg:ml-4">
      <h3 className="text-2xl font-bold mb-4 text-center">My Skills</h3>
      <Link
        className="flex justify-end"
        href="/dashboard/skills/create-skill"
      >
        <Button
          className="mb-4 border rounded-full bg-accent text-primary px-4 py-2"
          color="success"
        >
          Create Skills
        </Button>
      </Link>
      <SkillTable skills={skill} isLoading={isPending} setSkills={setSkill} />
    </div>
  );
};

export default ManageSkill;
