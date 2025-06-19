"use server";

import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiousInstance";


export const getAllJWork = async () => {
    let fetchOptions = {};
    fetchOptions = {
      cache: "no-store",
    };
    const { data } = await axiosInstance.get("/work", fetchOptions);
    return data;
  };
  
  export const deleteWork = async (id: string) => {
    const { data } = await axiosInstance.delete(`/work/${id}`);
    return data;
  };
  
  export const createWork = async (workData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/work", workData);
      return data;
    } catch (error: any) {
      const data = {
        success: false,
        message: error?.response?.data?.message,
      };
      return data;
    }
  };

  export const getWokkById = async (id: string) => {
    const { data } = await axiosInstance.get(`/work/${id}`);
    return data;
  };

  export const updateWork = async (id: string, workData: FieldValues) => {
    try {
      const { data } = await axiosInstance.put(`/work/${id}`, workData);
      return data;
    } catch (error: any) {
      const data = {
        success: false,
        message: error?.response?.data?.message,
      };
      return data; // Fallback error
    }
  };