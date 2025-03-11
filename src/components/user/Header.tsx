/* eslint-disable @next/next/no-img-element */
"use client";

import React, { Fragment, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

import UserSidebar from "./Sidebar";
import Link from "next/link";

const Header = () => {
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useOutsideClick(() => setIsSidebarOpen(false));
  return (
    <Fragment>
      <div className="relative flex justify-end p-5 pr-10 gap-12 bg-gray-300 text-black font-medium text-base">
        <Link href={"/user"}>Home </Link>
        <p className="cursor-pointer">About Us</p>
        <p className="cursor-pointer">Contact Us</p>
        <div
          onClick={() => setIsSidebarOpen(!isSideBarOpen)}
          className="w-12 h-6 cursor-pointer"
        >
          <img
            className="w-full h-full "
            src="/images/hmburgerProfile.svg"
            alt="profileIcon"
          />
        </div>
      </div>
      <div
        ref={sidebarRef}
        className={`absolute right-1 top-18 ${
          isSideBarOpen ? "block" : "hidden"
        }`}
      >
        <UserSidebar />
      </div>
    </Fragment>
  );
};

export default Header;
