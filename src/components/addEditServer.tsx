/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import SelectCompo from "@/app/ui-kit/Dropdown";
import { AddServer } from "@/lib/server";
import { toastifySuccess } from "@/shared/utils/toastify";
import { serverList } from "@/ts/interfaces/Server";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AddEditServerInterface {
  isAddServerOpen: boolean;
  setISAddServerOpen: (isOpen: boolean) => void;
  handleServerSubmit: (body: any) => void;
  serverDetails?: serverList | null;
  setServerDetails: (body: serverList | null) => void;
  handleUpdate: (id: string, bodyData: any) => void;
  isLoading: boolean;
}

const AddEditServer: React.FC<AddEditServerInterface> = ({
  isAddServerOpen,
  setISAddServerOpen,
  handleServerSubmit,
  serverDetails,
  setServerDetails,
  handleUpdate,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedEnv, setSelectedEnv] = useState({
    label: "",
    value: "",
  });
  const serverDropdown = [
    { label: "Development", value: "development" },
    { label: "Production", value: "production" },
    { label: "Staging", value: "staging" },
  ];

  const handleEnvironmentChange = (item: any) => {
    setSelectedEnv({
      label: item.label,
      value: item.value,
    });
  };

  const onSubmit = (data: any) => {
    const bodyData = {
      project_name: data.project_name,
      type: selectedEnv.value,
      serverName: selectedEnv.label,
      npmPort: data.npmPort,
      serverPort: data.serverPort,
      serverString: data.serverString,
    };
    if (serverDetails) {
      handleUpdate(serverDetails._id, bodyData);
    } else {
      handleServerSubmit(bodyData);
    }
  };

  useEffect(() => {
    if (serverDetails && isAddServerOpen) {
      setValue("project_name", serverDetails.project_name);
      setValue("npmPort", serverDetails.npmPort);
      setValue("serverPort", serverDetails.serverPort);
      setValue("serverString", serverDetails.serverString);
      setSelectedEnv({
        label: serverDetails.serverName,
        value: serverDetails.type,
      });
    } else if (isAddServerOpen && !serverDetails) {
      reset();
    }
  }, [isAddServerOpen, serverDetails]);
  const handleCancelButton = () => {
    setISAddServerOpen(false);
    setServerDetails(null);
  };

  return (
    <div
      className={`max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md ${
        isAddServerOpen ? "block" : "hidden"
      }`}
    >
      <h2 className="md:text-2xl text-xl font-semibold mb-4">
        Add Server Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <label className=" md:text-base text-sm block font-medium mb-1">
            Project Name
          </label>
          <input
            onKeyDown={(e) => {
              if (e.code == "Space" && !e.currentTarget.value) {
                e.preventDefault();
              }
            }}
            type="text"
            {...register("project_name", {
              required: "Project Name is required",
            })}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 md:placeholder:text-base placeholder:text-sm"
            placeholder="Enter project name"
          />
          {errors.project_name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.project_name.message?.toString() || ""}
            </p>
          )}
        </div>

        <SelectCompo
          name={"environment"}
          options={serverDropdown}
          onChange={(item: any) => handleEnvironmentChange(item)}
          placeholder="Select Environment"
          value={selectedEnv.label ? selectedEnv : 0}
          lblTextLeft="Environment"
        />
        {errors.environment && (
          <p className="text-red-500 text-xs mt-1">
            {errors.environment.message?.toString() || ""}
          </p>
        )}

        {/* Conditional Fields */}
        {selectedEnv.value && (
          <>
            {/* Server Port */}
            <div>
              <label className="block font-medium mb-1 md:text-base text-sm">
                Server Port
              </label>
              <input
                type="number"
                {...register("serverPort", {
                  required: "Server Port is required",
                })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 md:placeholder:text-base placeholder:text-sm"
                placeholder="Enter server port"
              />
              {errors.serverPort && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.serverPort.message?.toString() || ""}
                </p>
              )}
            </div>

            {/* NPM Port */}
            <div>
              <label className="block font-medium mb-1 md:text-base text-sm">
                NPM Port
              </label>
              <input
                type="number"
                {...register("npmPort", { required: "NPM Port is required" })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 md:placeholder:text-base placeholder:text-sm"
                placeholder="Enter npm port"
              />
              {errors.npmPort && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.npmPort?.message?.toString() || ""}
                </p>
              )}
            </div>

            {/* Server String */}
            <div>
              <label className="block font-medium mb-1 md:text-base text-sm">
                Server String
              </label>
              <input
                onKeyDown={(e) => {
                  if (e.code == "Space" && !e.currentTarget.value) {
                    e.preventDefault();
                  }
                }}
                type="text"
                {...register("serverString", {
                  required: "Server String is required",
                })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 md:placeholder:text-base placeholder:text-sm"
                placeholder="Enter server string"
              />
              {errors.serverString && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.serverString.message?.toString() || ""}
                </p>
              )}
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="grid grid-cols-2 gap-8">
          <button
            onClick={() => handleCancelButton()}
            type="button"
            className="w-full bg-white text-black border border-blue-500 md:py-2 font-semibold py-2 rounded-lg hover:bg-blue-500 hover:text-white md:text-base text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold md:py-2 rounded-lg hover:bg-blue-700 md:text-base text-sm "
          >
            {serverDetails && isLoading
              ? "Updating"
              : serverDetails && !isLoading
              ? "Update"
              : !serverDetails && isLoading
              ? "Submitting"
              : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditServer;
