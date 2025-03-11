"use client";
import React, { useRef } from "react";
import Link from "next/link";
import useUserAuthStore from "@/stores/userAuthStore";
import { useRouter } from "next/navigation";
import path from "path";

const UserSidebar = () => {
  const { setAuthData } = useUserAuthStore();
  const router = useRouter();
  const SidebarData = [
    { label: "My Profile", path: "/user/profile" },
    { label: "Logout", path: "/logout" },
  ];

  const handleSideBar = (path: string) => {
    if (path === "/logout") {
      handleLogout();
    }
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

      // Redirect to login
      router.push("/");
    }
  };
  return (
    <div className="w-48 h-fit bg-white shadow-md border-r p-4">
      <ul className="space-y-4">
        {SidebarData.map((item, index) => (
          <li key={index}>
            {item.path !== "/logout" ? (
              <Link
                href={item.path}
                className="block text-gray-700 text-sm font-medium px-4 py-2 hover:bg-gray-200 rounded-md transition"
              >
                {item.label}
              </Link>
            ) : (
              <div
                onClick={() => handleSideBar(item.path)}
                className="cursor-pointer block text-gray-700 text-sm font-medium px-4 py-2 hover:bg-gray-200 rounded-md transition"
              >
                {item.label}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSidebar;
