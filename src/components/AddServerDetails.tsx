import SelectCompo from "@/app/ui-kit/Dropdown";
import React, { Fragment } from "react";

interface ServerDetails {
  errors: any;
  selectedEnv: string;
  handleEnvironmentChange: (item: string) => void;
  register: any;
}

const AddServerDetails: React.FC<ServerDetails> = ({
  errors,
  selectedEnv,
  handleEnvironmentChange,
  register,
}) => {
  const serverDropdown = [
    { label: "Development", value: "Development" },
    { label: "Production", value: "Production" },
    { label: "Staging", value: "Staging" },
  ];
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <label className="block font-medium mb-1">Environment</label>
      </div>
      <SelectCompo
        name={"environment"}
        options={serverDropdown}
        onChange={(item: any) => handleEnvironmentChange(item)}
        placeholder="Select Environment"
      />
      {errors.environment && (
        <p className="text-red-500 text-sm mt-1">
          {/* {errors.environment.message} */}
        </p>
      )}

      {/* Conditional Fields */}
      {Number(selectedEnv.length) > 0 && (
        <>
          {/* Server Port */}
          <div>
            <label className="block font-medium mb-1">Server Port</label>
            <input
              type="number"
              {...register("server_port", {
                required: "Server Port is required",
              })}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter server port"
            />
            {errors.server_port && (
              <p className="text-red-500 text-sm mt-1">
                {/* {errors.server_port.message} */}
              </p>
            )}
          </div>

          {/* NPM Port */}
          <div>
            <label className="block font-medium mb-1">NPM Port</label>
            <input
              type="number"
              {...register("npm_port", { required: "NPM Port is required" })}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter npm port"
            />
            {errors.npm_port && (
              <p className="text-red-500 text-sm mt-1">
                {/* {errors.npm_port.message} */}
              </p>
            )}
          </div>

          {/* Server String */}
          <div>
            <label className="block font-medium mb-1">Server String</label>
            <input
              type="text"
              {...register("server_string", {
                required: "Server String is required",
              })}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter server string"
            />
            {errors.server_string && (
              <p className="text-red-500 text-sm mt-1">
                {/* {errors.server_string.message} */}
              </p>
            )}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default AddServerDetails;
