/* eslint-disable @next/next/no-img-element */
"use client";
import { resetPassword } from "@/lib/auth/auth";
import { toastifyError, toastifySuccess } from "@/shared/utils/toastify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/constants/route";

export interface ResetPasswordInterface {
  email: string;
  password: string;
  confirm_password: string;
}

const ResetPassword: React.FC = () => {
  const router = useRouter();

  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isConfirmPasswordShow, setIsConfirmPasswordShow] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInterface>();

  const onSubmit = async (data: ResetPasswordInterface) => {
    try {
      const response = await resetPassword(data);
      if (response.code == 200) {
        toastifySuccess(
          "Password Updated Successfully",
          new Date().getTime().toString()
        );
        router.push(appRoutes.user.userLogin);
      }
    } catch (error: any) {
      toastifyError(
        error?.response.data.message,
        new Date().getTime().toString()
      );
      console.log("Error is", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
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
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
              {watch("password") && (
                <div className="w-5 h-4 absolute right-4 top-4">
                  <img
                    alt="passwordslash"
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
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={isConfirmPasswordShow ? "text" : "password"}
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
              {watch("confirm_password") && (
                <div className="w-5 h-4 absolute right-4 top-4">
                  <img
                    alt="eyeSlash"
                    onClick={() => {
                      if (!watch("confirm_password")) return;
                      setIsConfirmPasswordShow(!isConfirmPasswordShow);
                    }}
                    src={
                      isConfirmPasswordShow
                        ? "/images/eye-slash.svg"
                        : "/images/eye.svg"
                    }
                    className={`w-full h-full cursor-pointer ${
                      !watch("confirm_password")
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  />
                </div>
              )}
              {errors.confirm_password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
