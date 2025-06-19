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
} from "../../../../../hooks/journey.hook";
import Loading from "../../../../../components/Loading";
import PHInput from "../../../../../components/form/PHInput";
import { experienceValidationSchema } from "../../../../../schema/journey.validation.schema";
import PHForm from "../../../../../components/form/PHForm";
import PHTextarea from "../../../../../components/form/PHTextArea";

interface Params {
  id: string;
}

interface FormData {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export default function UpdateCategoryPage({ params }: { params: Params }) {
  const { id } = params;
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch single experience data
  const {
    data: singleExperience,
    isPending: isFetchingExperience,
    isSuccess: isExperienceLoaded,
  } = useGetSingleJourney(id);

  // Update experience mutation
  const {
    mutate: handleUpdateExperience,
    isPending: isUpdating,
    isSuccess: isUpdateSuccess,
    data: updateResponse,
  } = useUpdateJourney();

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const formDataObj = new FormData();
    if (imageFile) {
      formDataObj.append("file", imageFile);
    }
    formDataObj.append(
      "data",
      JSON.stringify({
        company: formData.company,
        position: formData.position,
        duration: formData.duration,
        description: formData.description,
      })
    );

    handleUpdateExperience({ id, journeyData: formDataObj });
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
      toast.success("Experience updated successfully.");
      router.push("/dashboard/experience");
    }
  }, [updateResponse, isUpdateSuccess, router, id]);

  if (isFetchingExperience) return <Loading />;
  if (!isExperienceLoaded || !singleExperience)
    return <p className="text-red-500">Failed to load experience details.</p>;

  return (
    <div className="flex h-[calc(100vh)] mt-7 flex-col items-center justify-center  p-6">
      <h3 className="mb-4 text-2xl font-semibold text-gray-800">
        Update Experience
      </h3>
      <hr className="border w-full mb-3" />
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <PHForm
          resolver={zodResolver(experienceValidationSchema)}
          onSubmit={onSubmit}
          defaultValues={singleExperience?.data || {}} // Ensure defaultValues are valid
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <PHInput   label="Company" name="company" size="sm" />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <PHInput   label="Position" name="position" size="sm" />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <PHInput  label="Duration" name="duration" size="sm" />
            </div>
            <PHTextarea label="Description" name="description" size="sm" />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="image"
            >
              Change Company Logo
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
            {isUpdating ? "Updating..." : "Update Experience"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
