"use server";
import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiousInstance";

export const getAllBlogs = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/blog", fetchOptions);
  return data;
};

export const createBlog = async (blogData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/blog", blogData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

export const getSingleBlogById = async (id: string) => {
  const { data } = await axiosInstance.get(`/blog/${id}`);
  return data;
};

export const updateBlog = async (blogId: string, blogData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(`/blog/${blogId}`, blogData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data; // Fallback error
  }
};

export const deleteBlog = async (id: string) => {
  const { data } = await axiosInstance.delete(`/blog/${id}`);
  return data;
};
