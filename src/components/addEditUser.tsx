/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { userData } from "@/ts/interfaces/Auth";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export type FormDataType = {
  username: string;
  email: string;
  role: string;
};

interface AddEditModalInterface {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  CreateUser: (data: FormDataType) => void;
  updateUser: (data: FormDataType, id: string) => void;
  isLoading: boolean;
  details?: userData | null;
  setDetails?: (data: userData | null) => void;
  // resetData: boolean;
}

const AddEditModal: React.FC<AddEditModalInterface> = ({
  isOpen,
  setIsOpen,
  CreateUser,
  updateUser,
  isLoading,
  details,
  setDetails,
  // resetData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormDataType>();

  const onSubmit = (data: any) => {
    if (!details) {
      CreateUser(data);
    } else if (details) {
      updateUser(data, details._id);
    }
  };

  useEffect(() => {
    if (details && details?.username) {
      setValue("username", details?.username);
      setValue("email", details?.email);
      setValue("role", details?.role);
    } else if (!details) {
      reset();
    }
  }, [details, isOpen]);

  const handleDetailsData = () => {
    if (details?.username) {
      setDetails?.(null);
      reset();
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-2">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="mobile:text-xl text-base font-semibold mb-4 ">
          User Form
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mobile:text-sm text-xs font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.code === "Space" && !e.currentTarget.value) {
                  e.preventDefault();
                }
              }}
              {...register("username", { required: "Username is required" })}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mobile:placeholder:text-sm placeholder:text-xs"
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-500 mobile:text-sm text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700 mobile:text-sm text-xs">
              Email
            </label>
            <input
              type="email"
              onKeyDown={(e) => {
                if (e.code === "Space" && !e.currentTarget.value) {
                  e.preventDefault();
                }
              }}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mobile:placeholder:text-sm placeholder:text-xs"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 mobile:text-sm text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium text-gray-700 mobile:text-sm text-xs">
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="mobile:text-sm text-xs mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 mobile:text-sm text-xs mt-1">
                {errors.role.message}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 font-medium"
              onClick={() => handleDetailsData()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-medium"
            >
              {/* {isLoading ? "Submitting" : "Submit"} */}
              {details && !isLoading
                ? "Update"
                : details && isLoading
                ? "Updating"
                : !details && isLoading
                ? "Submittng"
                : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;
