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
import PHForm from "../../../../../components/form/PHForm";
import PHTextarea from "../../../../../components/form/PHTextArea";
import { educationValidationSchema } from "../../../../../schema/journey.validation.schema";

interface Params {
  id: string;
}

interface FormData {
  institution: string;
  qualification: string;
  duration: string;
  description: string;
}

export default function UpdateEducationPage({ params }: { params: Params }) {
  const { id } = params;
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch single education data
  const {
    data: singleEducation,
    isPending: isFetchingEducation,
    isSuccess: isEducationLoaded,
  } = useGetSingleJourney(id);

  // Update education mutation
  const {
    mutate: handleUpdateEducation,
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
        institution: formData.institution,
        qualification: formData.qualification,
        duration: formData.duration,
        description: formData.description,
      })
    );

    handleUpdateEducation({ id, journeyData: formDataObj });
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
      toast.success("Education updated successfully.");
      router.push("/dashboard/education");
    }
  }, [updateResponse, isUpdateSuccess, router, id]);

  if (isFetchingEducation) return <Loading />;
  if (!isEducationLoaded || !singleEducation)
    return <p className="text-red-500">Failed to load education details.</p>;

  return (
    <div className="flex h-[calc(100vh)] mt-7 flex-col items-center justify-center p-6">
      <h3 className="mb-4 text-2xl font-semibold text-gray-800">
        Update Education
      </h3>
      <hr className="border w-full mb-3" />
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <PHForm
          resolver={zodResolver(educationValidationSchema)}
          onSubmit={onSubmit}
          defaultValues={singleEducation?.data || {}} // Ensure defaultValues are valid
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <PHInput label="Institution" name="institution" size="sm" />
            </div>
            <div>
              <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
                Qualification
              </label>
              <PHInput label="Qualification" name="qualification" size="sm" />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
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
              Change Institution Logo
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
            {isUpdating ? "Updating..." : "Update Education"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
