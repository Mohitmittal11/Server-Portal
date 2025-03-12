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
          <div className="flex-cols mobile:flex mobile:gap-8 justify-center m-auto max-w-fit max-h-fit p-10 bg-zinc-200  shadow-slate-300">
            <p className="text-gray-500 font-medium">
              Username{" "}
              <span className="block text-blue-500">{authData?.username}</span>
            </p>
            <p className="text-gray-500 font-medium">
              Email Id{" "}
              <span className="block text-blue-500">{authData?.email}</span>
            </p>
            <p className="text-gray-500 font-medium">
              Role <span className="block text-blue-500">{authData?.role}</span>
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
