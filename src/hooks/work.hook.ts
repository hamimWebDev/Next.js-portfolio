import { useMutation, useQuery } from "@tanstack/react-query";
import { createWork, deleteWork, getAllJWork, getWokkById, updateWork } from "../services/Work";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

export const useGetAllWork = () => {
    return useQuery<any, Error, any, string[]>({
      queryKey: ["GET_ALL_WORK"],
      queryFn: async () => await getAllJWork(),
    });
  };

  export const useCreateWork = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["CREATE_PROJECT"],
      mutationFn: async (data) => await createWork(data),
    });
  };

  export const useDeleteWork = () => {
    return useMutation<any, Error, string>({
      mutationKey: ["DELETE_PROJECT"],
      mutationFn: async (id) => await deleteWork(id),
      onSuccess: () => {
        toast.success("Project deleted successfully");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };
  

  export const useGetSingleWork = (id: string) => {
    return useQuery<any, Error, any, string[]>({
      queryKey: ["GET_SINGLE_PROJECT"],
      queryFn: async () => await getWokkById(id),
    });
  };

  export const useUpdateWork = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["UPDATE_PROJECT"],
      mutationFn: async ({ id, workData }) =>
        await updateWork(id, workData),
    });
  };
  