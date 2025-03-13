/* eslint-disable @next/next/no-img-element */
"use client";

import { adminLogin } from "@/lib/auth/auth";
import { toastifyError, toastifySuccess } from "@/shared/utils/toastify";
import { AdminLogin } from "@/ts/interfaces/Auth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/constants/route";
import { useState } from "react";
import Loader from "@/components/Loader";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const onSubmit = async (data: AdminLogin) => {
    try {
      setIsLoading(true);
      const res = await adminLogin(data);
      if (res.code == 200) {
        toastifySuccess(`Login Successfully`, new Date().getTime().toString());
        router.push(appRoutes.admin.list);
        setIsLoading(false);
        reset();
      }
    } catch (error: any) {
      setIsLoading(false);
      toastifyError(
        error?.response.data.message,
        new Date().getTime().toString()
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-2">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg relative">
        <div
          onClick={() => router.push("/")}
          className="absolute -top-6 left-0 cursor-pointer"
        >
          <img src="/images/leftArrow.svg" alt="leftArrow" className="w-5" />
        </div>
        <h2 className="mb-6 text-center mobile:text-2xl text-xl  font-bold text-gray-700">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block mobile:text-base text-xs font-medium text-gray-600">
              Email
            </label>
            <input
              onKeyDown={(e) => {
                if (e.code == "Space" && !e.currentTarget.value) {
                  e.preventDefault();
                }
              }}
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 mobile:placeholder:text-base placeholder:text-sm"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block mobile:text-sm text-xs font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                onKeyDown={(e) => {
                  if (e.code == "Space" && !e.currentTarget.value) {
                    e.preventDefault();
                  }
                }}
                type={isPasswordShow ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}$/,

                    message:
                      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
                  },
                })}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 mobile:placeholder:text-base placeholder:text-sm"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
              {watch("password") && (
                <div className="w-5 h-4 absolute right-4 top-4">
                  <img
                    alt="eyeSlash"
                    onClick={() => {
                      if (!watch("password")) return;
                      setIsPasswordShow(!isPasswordShow);
                    }}
                    src={
                      isPasswordShow
                        ? "/images/eye-slash.svg"
                        : "/images/eye.svg"
                    }
                    className={`w-full h-full cursor-pointer ${
                      !watch("password") ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 mobile:text-base text-sm"
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
