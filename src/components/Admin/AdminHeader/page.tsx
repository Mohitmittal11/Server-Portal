/* eslint-disable @next/next/no-img-element */
"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import useUserAuthStore from "@/stores/userAuthStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminHeader = () => {
  const [sidebarOpen, setSideBarOpen] = useState<boolean>(false);
  const pathname = usePathname();
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

  const headerData = [{ label: "Home", path: "/admin/user" }];

  const AdminSidebarData = [
    { label: "My Profile", path: "/admin/profile" },
    { label: "Server", path: "/admin/server" },
  ];

  return (
    <Fragment>
      <div className="bg-blue-500 flex justify-end gap-8 items-center px-5 py-4 relative">
        {headerData.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.path}
              className={`font-medium px-2 rounded-md mobile:text-base text-sm font-sans ${
                item.path === pathname
                  ? "text-gray-500 bg-gray-100 py-0.5"
                  : "text-white"
              }`}
            >
              Home
            </Link>
          );
        })}
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
                {AdminSidebarData.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      href={item.path}
                      className={`cursor-pointer
                    w-full text-center py-1 px-5 mobile:text-base text-sm  ${
                      pathname === item.path
                        ? "bg-blue-500 text-white font-medium rounded-lg  "
                        : "hover:text-blue-500"
                    }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                {/* <Link
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
                </Link> */}
                <li
                  onClick={() => handleAdminLogout()}
                  className="cursor-pointer hover:text-blue-500 w-full text-center py-1 mobile:text-base text-sm "
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
