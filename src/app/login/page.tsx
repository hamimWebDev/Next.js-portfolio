"use client";
 
 
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "../../context/user.provider";
import { useUserLogin } from "../../hooks/auth.hook";
import Loading from "../../components/Loading";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import loginValidationSchema from "../../schema/login.schema";

function Login() {
  const { setIsLoading: userLoading } = useUser();
  const router = useRouter();
  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    data,
  } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data?.message);
    } else if (!isPending && isSuccess) {
      toast.success("User Logged successfully");
      if (isSuccess) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess,  router, data]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Md. Hamim Howlader Asif</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="md:w-[45%]">
          <PHForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <PHInput label="Email" name="email" type="email"  />
            </div>
            <div className="py-3">
              <PHInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md px-5 py-2 bg-accent  font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </PHForm>
          
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
}
