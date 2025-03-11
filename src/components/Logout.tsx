"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useUserAuthStore from "@/stores/userAuthStore";

const Logout = () => {
  const router = useRouter();
  const { setAuthData } = useUserAuthStore();
  const handleLogout = () => {
    const isLogoutConfirm = window.confirm("Are You Sure want to logout ?");
    if (isLogoutConfirm) {
      // Clear cookies
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
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-end items-center">
        {/* <h1 className="text-xl font-bold">Admin Dashboard</h1> */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Logout;
