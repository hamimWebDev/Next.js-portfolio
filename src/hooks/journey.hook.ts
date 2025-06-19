import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createEducation,
  createExperience,
  createSkill,
  deleteJourney,
  getAllJourney,
  getSingleJourneyById,
  updateJourney,
} from "../services/Journey";
import { FieldValues } from "react-hook-form";

export const useGetAllJourney = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_JOURNEY"],
    queryFn: async () => await getAllJourney(),
  });
};

export const useCreateExperience = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_EXPERIENCE"],
    mutationFn: async (data) => await createExperience(data),
  });
};

export const useCreateEducation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_EDUCATION"],
    mutationFn: async (data) => await createEducation(data),
  });
};
export const useCreateSkill = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_SKILL"],
    mutationFn: async (data) => await createSkill(data),
  });
};

export const useGetSingleJourney = (journeyId: string) => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_SINGLE_JOURNEY"],
    queryFn: async () => await getSingleJourneyById(journeyId),
  });
};

export const useUpdateJourney = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_JOURNEY"],
    mutationFn: async ({ id, journeyData }) =>
      await updateJourney(id, journeyData),
  });
};

export const useDeleteJourney = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_JOURNEY"],
    mutationFn: async (journeyId) => await deleteJourney(journeyId),
    onSuccess: () => {
      toast.success(" Deleted successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
