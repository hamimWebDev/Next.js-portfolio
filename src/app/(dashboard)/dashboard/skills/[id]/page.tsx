"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetSingleJourney,
  useUpdateJourney,
} from "../../../../../hooks/journey.hook"; // Modify this import to get skill data if needed
import Loading from "../../../../../components/Loading";
import PHInput from "../../../../../components/form/PHInput";

import PHForm from "../../../../../components/form/PHForm";
import PHTextarea from "../../../../../components/form/PHTextArea";
import { skillValidationSchema } from "../../../../../schema/journey.validation.schema";

interface Params {
  id: string;
}

interface FormData {
  name: string;  // Skill name field
  duration: string;  // Duration field
  description: string;  // Description field
}

export default function UpdateSkillPage({ params }: { params: Params }) {
  const { id } = params;
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch single skill data
  const {
    data: singleSkill,
    isPending: isFetchingSkill,
    isSuccess: isSkillLoaded,
  } = useGetSingleJourney(id);  // Modify hook to fetch skill data

  // Update skill mutation
  const {
    mutate: handleUpdateSkill,
    isPending: isUpdating,
    isSuccess: isUpdateSuccess,
    data: updateResponse,
  } = useUpdateJourney();  // Modify mutation to update skill data

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const formDataObj = new FormData();
    if (imageFile) {
      formDataObj.append("file", imageFile);
    }
    formDataObj.append(
      "data",
      JSON.stringify({
        name: formData.name, // Handle skill name
        duration: formData.duration, // Handle skill duration
        description: formData.description, // Handle skill description
      })
    );

    handleUpdateSkill({ id, journeyData: formDataObj });  // Modify this line to update skill
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (updateResponse && !updateResponse.success) {
      toast.error(updateResponse.message as string);
    }
    if (isUpdateSuccess && updateResponse.success) {
      toast.success("Skill updated successfully.");
      router.push("/dashboard/skills");  // Redirect after success
    }
  }, [updateResponse, isUpdateSuccess, router, id]);

  if (isFetchingSkill) return <Loading />;
  if (!isSkillLoaded || !singleSkill)
    return <p className="text-red-500">Failed to load skill details.</p>;

  return (
    <div className="flex h-[calc(100vh)] mt-7 flex-col items-center justify-center p-6">
      <h3 className="mb-4 text-2xl font-semibold text-gray-800">
        Update Skill
      </h3>
      <hr className="border w-full mb-3" />
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <PHForm
          resolver={zodResolver(skillValidationSchema)} // Modify to use skill schema if different
          onSubmit={onSubmit}
          defaultValues={singleSkill?.data || {}} // Ensure default values for skill data
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Skill Name
              </label>
              <PHInput label="Skill Name" name="name" size="sm" />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <PHInput label="Duration" name="duration" size="sm" />
            </div>
            <PHTextarea label="Description" name="description" size="sm" />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Change Skill Image
            </label>
            <input
              className="mt-2 block w-full rounded border-gray-300 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              id="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <Button
            className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700"
            isLoading={isUpdating}
            size="lg"
            type="submit"
          >
            {isUpdating ? "Updating..." : "Update Skill"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
