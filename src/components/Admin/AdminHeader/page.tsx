/* eslint-disable @next/next/no-img-element */
"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import useUserAuthStore from "@/stores/userAuthStore";
import Link from "next/link";

const AdminHeader = () => {
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(false);
  const { setAuthData } = useUserAuthStore();
  const router = useRouter();
  const handleAdminSideBarOpen = () => {
    setSideBarOpen(!sidebarOpen);
  };

  const sidebarRef = useOutsideClick(() => {
    setSideBarOpen(false);
  });

  const handleAdminLogout = () => {
    handleLogout();
  };

  const handleLogout = () => {
    const isLogoutConfirm = window.confirm("Are You Sure want to logout ?");
    if (isLogoutConfirm) {
      document.cookie =
        "adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setAuthData(null);

      router.push("/");
    }
  };
  return (
    <Fragment>
      <div className="bg-blue-500 flex justify-end gap-8 items-center px-5 py-4 relative">
        <div className="">
          <Link
            href={"/"}
            className="text-white font-medium px-2 py-1 rounded-sm text-base font-sans"
          >
            Home
          </Link>
        </div>
        <div>
          <img
            onClick={() => {
              handleAdminSideBarOpen();
            }}
            src="/images/hmburgerProfile.svg"
            alt="hmburgProfile"
            className="cursor-pointer"
          />

          <div
            ref={sidebarRef}
            className={`absolute top-12 right-5 bg-white px-3 py-4 rounded-sm text-base text-gray-900 ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            <div>
              <ul className="flex flex-col gap-3">
                <Link
                  href={"/admin/profile"}
                  className="cursor-pointer hover:bg-blue-500 hover:text-white w-full  px-4 text-center py-1 hover:rounded-lg"
                >
                  My Profile
                </Link>
                <Link
                  href={"/admin/server"}
                  className="cursor-pointer hover:bg-blue-500 hover:text-white
                w-full text-center py-1 hover:rounded-lg"
                >
                  Server
                </Link>
                <li
                  onClick={() => handleAdminLogout()}
                  className="cursor-pointer hover:bg-blue-500 hover:text-white w-full text-center py-1 hover:rounded-lg"
                >
                  LogOut
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminHeader;
