"use server";

import { FieldValues } from "react-hook-form";
import axiosInstance from "../../lib/AxiousInstance";

export const getAllJourney = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/journey", fetchOptions);
  return data;
};

export const createExperience = async (experinceData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/journey/experience", experinceData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};
export const createEducation = async (educationData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/journey/education", educationData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};
export const createSkill = async (skillData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/journey/skill", skillData);
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data;
  }
};

export const getSingleJourneyById = async (id: string) => {
  const { data } = await axiosInstance.get(`/journey/${id}`);
  return data;
};

export const updateJourney = async (
  journeyId: string,
  journeyData: FieldValues
) => {
  try {
    const { data } = await axiosInstance.put(
      `/journey/${journeyId}`,
      journeyData
    );
    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };
    return data; // Fallback error
  }
};

export const deleteJourney = async (id: string) => {
  const { data } = await axiosInstance.delete(`/journey/${id}`);
  return data;
};
