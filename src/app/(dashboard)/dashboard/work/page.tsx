"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useGetAllJourney } from "../../../../hooks/journey.hook";
import SkillTable from "../../../../components/Dashboard/SkillTable";
import { useGetAllWork } from "../../../../hooks/work.hook";
import WorkTable from "../../../../components/Dashboard/WorkTable";

const ManageWork = () => {
  const { data, isPending } = useGetAllWork();
  const [work, setWork] = useState<any[]>([]);
  useEffect(() => {
    if (data?.data) {
      
      setWork(data?.data);
    }
  }, [data]);

  return (
    <div className="lg:ml-4">
      <h3 className="text-2xl font-bold mb-4 text-center">My Project</h3>
      <Link
        className="flex justify-end"
        href="/dashboard/work/create-work"
      >
        <Button
          className="mb-4 border rounded-full bg-accent text-primary px-4 py-2"
          color="success"
        >
          Create works
        </Button>
      </Link>
      <WorkTable works={work} isLoading={isPending} setWorks={setWork} />
    </div>
  );
};

export default ManageWork;
