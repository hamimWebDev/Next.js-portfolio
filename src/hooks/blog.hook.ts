import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlogById,
  updateBlog,
} from "../services/Blog";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetAllBlog = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_BLOG"],
    queryFn: async () => await getAllBlogs(),
  });
};

export const useCreateBlog = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_BLOG"],
    mutationFn: async (data) => await createBlog(data),
  });
};

export const useGetSingleBlog = (blogId: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_SINGLE_BLOG"],
    queryFn: async () => await getSingleBlogById(blogId),
  });
};

export const useUpdateBlog = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_BLOG"],
    mutationFn: async ({ id, blogData }) => await updateBlog(id, blogData),
  });
};

export const useDeleteBlog = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: async (blogId) => await deleteBlog(blogId),
    onSuccess: () => {
      toast.success(" Deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
