"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import Loading from "../../../../../components/Loading";
import PHInput from "../../../../../components/form/PHInput";
import PHForm from "../../../../../components/form/PHForm";
import PHTextarea from "../../../../../components/form/PHTextArea";
import { blogSchema } from "../../../../../schema/blog.validation.schema";
import {
  useGetSingleBlog,
  useUpdateBlog,
} from "../../../../../hooks/blog.hook";

interface Params {
  id: string;
}

interface FormData {
  title: string;
  content: string;
  author: string;
  tags: string[];
}

export default function UpdateCategoryPage({ params }: { params: Params }) {
  const { id } = params;
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    data: singleBlog,
    isPending: isFetchingBlog,
    isSuccess: isBlogLoaded,
  } = useGetSingleBlog(id);

  const {
    mutate: handleUpdateBlog,
    isPending: isUpdating,
    isSuccess: isUpdateSuccess,
    data: updateResponse,
  } = useUpdateBlog();

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const formDataObj = new FormData();
    if (imageFile) formDataObj.append("file", imageFile);
    formDataObj.append(
      "data",
      JSON.stringify({
        title: formData.title,
        content: formData.content,
        author: formData.author,
        tags: formData.tags,
      })
    );

    handleUpdateBlog({ id, blogData: formDataObj });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    if (updateResponse && !updateResponse.success) {
      toast.error(updateResponse.message as string);
    }
    if (isUpdateSuccess && updateResponse.success) {
      toast.success("Blog updated successfully.");
      router.push("/dashboard/blogs");
    }
  }, [updateResponse, isUpdateSuccess, router, id]);

  if (isFetchingBlog) return <Loading />;
  if (!isBlogLoaded || !singleBlog)
    return <p className="text-red-500">Failed to load blog details.</p>;

  return (
    <div className="flex h-screen mt-7 flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-2xl font-semibold text-gray-800">
          Update Blog
        </h3>
        <PHForm
          resolver={zodResolver(blogSchema)}
          onSubmit={onSubmit}
          defaultValues={singleBlog?.data || {}}
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <PHInput label="Title" name="title" size="sm" />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Content
              </label>
              <PHTextarea label="Content" name="content" size="sm" />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author
              </label>
              <PHInput label="Author" name="author" size="sm" />
            </div>

            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags (comma-separated)
              </label>
              <PHInput label="Tags" name="tags" size="sm" />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Change Blog Image
              </label>
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full rounded border-gray-300 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <Button
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
            isLoading={isUpdating}
            size="lg"
            type="submit"
          >
            {isUpdating ? "Updating..." : "Update Blog"}
          </Button>
        </PHForm>
      </div>
    </div>
  );
}
