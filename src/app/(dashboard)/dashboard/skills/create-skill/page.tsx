"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSkill } from "../../../../../hooks/journey.hook";
import { skillValidationSchema } from "../../../../../schema/journey.validation.schema";
import PHInput from "../../../../../components/form/PHInput";
import PHForm from "../../../../../components/form/PHForm";

export default function CreateSkillPage() {
  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File | null>(null);
  const {
    mutate: handleCreateSkill,
    isPending,
    isSuccess,
    data,
  } = useCreateSkill();

  const onSubmit: SubmitHandler<any> = (formData) => {
    if (!imageFiles) {
      toast.error("Please upload a skill image");
      return;
    }
    const data = new FormData();
    data.append("file", imageFiles);
    data.append(
      "data",
      JSON.stringify({
        type: "skill",
        name: formData.name,
        duration: formData.duration,
        description: formData.description,
      })
    );
    handleCreateSkill(data);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files![0];
    setImageFiles(files);
  };

  useEffect(() => {
    if (data && !data?.success) toast.error(data?.message as string);
    if (isSuccess && data?.success) {
      toast.success("Skill created successfully");
      router.push("/dashboard/skills");
    }
  }, [data, isSuccess, router]);

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-xl p-8 shadow-lg border">
        <h3 className="mb-2 text-3xl font-extrabold text-center">
          Create New Skill
        </h3>
        <p className="mb-6 text-center">
          Add a new skill with a name, duration, description, and icon.
        </p>

        <PHForm
          resolver={zodResolver(skillValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <PHInput label="Skill Name" name="name" size="sm" />
            <PHInput label="Duration" name="duration" size="sm" />
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <PHInput label="Description" name="description" size="sm" />
          </div>

          <div className="mb-6 mt-5">
            <label className="block text-sm font-medium" htmlFor="image">
              Upload Skill Icon
            </label>
            <div className="mt-2 flex items-center gap-4">
              <input
                className="hidden"
                id="image"
                type="file"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image"
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700"
              >
                Choose File
              </label>
              {imageFiles && (
                <span className="text-sm text-gray-700">{imageFiles.name}</span>
              )}
            </div>
          </div>

          <Button
            className="w-full rounded-lg bg-indigo-600 text-lg font-medium text-white hover:bg-indigo-700"
            isLoading={isPending}
            size="lg"
            type="submit"
          >
            {isPending ? "Creating..." : "Create Skill"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
