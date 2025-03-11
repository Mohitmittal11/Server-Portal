"use client";
import useUserAuthStore from "@/stores/userAuthStore";
import React, { Fragment, useEffect, useState } from "react";

const Profile = () => {
  const { authData } = useUserAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (authData) {
      setIsLoading(false);
    }
  }, [authData]);
  return (
    <Fragment>
      {isLoading ? (
        <p className="text-2xl text-blue-500 mt-20 font-semibold text-center">
          Loading...
        </p>
      ) : (
        <div className="mt-28">
          <div className="flex justify-center gap-10 border max-w-fit p-10 bg-zinc-200 m-auto shadow-slate-300">
            <p className="text-gray-500 font-medium">
              Name
              <span className="block text-blue-500">
                {authData?.role == "admin" ? authData.name : authData?.username}
              </span>
            </p>
            <p className="text-gray-500 font-medium">
              Email Id{" "}
              <span className="block text-blue-500">{authData?.email}</span>
            </p>
            <p className="text-gray-500 font-medium">
              Role{" "}
              <span className="block text-blue-500">
                {authData?.role == "admin"
                  ? "Admin"
                  : authData?.role == "editor"
                  ? "Editor"
                  : "Viewer"}
              </span>
            </p>
          </div>
          {/* <h3>USer Home Page</h3> */}
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
