import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { loginUser } from "../services/Auth";
export const useUserLogin = () => {
    return useMutation<any, Error, FieldValues>({
      mutationKey: ["LOGIN_USER"],
      mutationFn: async (userData) => await loginUser(userData),
      //     onSuccess : () => {
      //         toast.success("User Logged successfully")
      //    },
      //    onError : (error) => {
      //         toast.error(error.message)
      //    }
    });
  };