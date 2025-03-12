/* eslint-disable @next/next/no-img-element */
"use client";

import React, { Fragment, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import UserSidebar from "./Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useOutsideClick(() => setIsSidebarOpen(false));
  const pathname = usePathname();

  const headerData = [
    { label: "Home", path: "/user" },
    { label: "About Us", path: "#" },
    { label: "Contact Us", path: "#" },
  ];

  return (
    <Fragment>
      <div className="flex justify-end p-5 mobile:pr-10 pr-3  mobile:gap-12 gap-4 bg-gray-300">
        {headerData.map((item, index: number) => {
          return (
            <Link
              className={`text-black font-medium mobile:text-base text-sm cursor-pointer ${
                item.path == pathname &&
                "bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md"
              }`}
              key={index}
              href={item.path}
            >
              {item.label}
            </Link>
          );
        })}

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
