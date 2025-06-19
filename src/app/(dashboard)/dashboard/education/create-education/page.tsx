"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateEducation } from "../../../../../hooks/journey.hook";

import PHInput from "../../../../../components/form/PHInput";
import PHForm from "../../../../../components/form/PHForm";
import { educationValidationSchema } from "../../../../../schema/journey.validation.schema";
import PHTextarea from "../../../../../components/form/PHTextArea";

export default function CreateEducationPage() {
  const router = useRouter();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const {
    mutate: handleCreateEducation,
    isPending,
    isSuccess,
    data,
  } = useCreateEducation();

  const onSubmit: SubmitHandler<any> = (formData) => {
    if (!logoFile) {
      toast.error("Please upload the institution logo.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("file", logoFile);
    formDataObj.append(
      "data",
      JSON.stringify({
        type: "education",
        institution: formData.institution,
        qualification: formData.qualification,
        duration: formData.duration,
        description: formData.description,
      })
    );

    handleCreateEducation(formDataObj);
  };

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setLogoFile(file || null);
  };

  useEffect(() => {
    if (data && !data?.success) toast.error(data?.message as string);
    if (isSuccess && data?.success) {
      toast.success("Education created successfully");
      router.push("/dashboard/education");
    }
  }, [data, isSuccess, router]);

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-xl p-8 shadow-lg border">
        <h3 className="mb-2 text-3xl font-extrabold text-center">
          Add New Education
        </h3>
        <p className="mb-6 text-center">
          Provide details about the education, including the institution, qualification, and duration.
        </p>

        <PHForm
          resolver={zodResolver(educationValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PHInput label="Institution" name="institution" size="sm" />
            <PHInput label="Qualification" name="qualification" size="sm" />
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6 mb-3">
            <PHInput label="Duration" name="duration" size="sm" />
          </div>

          <PHTextarea
            label="Description"
            name="description"
            size="sm"
            
          />

          <div className="mb-6 mt-5">
            <label className="block text-sm font-medium" htmlFor="logo">
              Upload Institution Logo
            </label>
            <div className="mt-2 flex items-center gap-4">
              <input
                className="hidden"
                id="logo"
                type="file"
                onChange={handleLogoChange}
              />
              <label
                htmlFor="logo"
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700"
              >
                Choose File
              </label>
              {logoFile && (
                <span className="text-sm text-gray-700">{logoFile.name}</span>
              )}
            </div>
          </div>

          <Button
            className="w-full rounded-lg bg-indigo-600 text-lg font-medium text-white hover:bg-indigo-700"
            isLoading={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? "Creating..." : "Add Education"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
