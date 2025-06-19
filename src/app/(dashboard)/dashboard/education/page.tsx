"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react"; 
import { useGetAllJourney } from "../../../../hooks/journey.hook";
import EducationTable from "../../../../components/Dashboard/EducationTable";

const ManageEducation = () => {
  const { data, isPending } = useGetAllJourney();
  const [education, setEducation] = useState<any[]>([]);
console.log(education)
  useEffect(() => {
    if (data?.data) {
      // Filter data where type is 'experience'
      const filteredExperience = data.data.filter((item: any) => item.type === 'education');
      setEducation(filteredExperience);
    }
  }, [data]);

  return (
    <div className="lg:ml-4">
      <h3 className="text-2xl font-bold mb-4 text-center">My Education</h3>
      <Link className="flex justify-end" href="/dashboard/education/create-education">
        <Button className="mb-4 border rounded-full bg-accent text-primary px-4 py-2" color="success">
          Create Education
        </Button>
      </Link>
      <EducationTable
        educations={education}
        isLoading={isPending}
        setEducations={setEducation}
      />
    </div>
  );
};

export default ManageEducation;
