/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

const footerData = [
  { label: "Copyright@user-admin", url: "/copyright" },
  { label: "Terms and Conditions", url: "/termsUrl" },
  { label: "Privacy Policy", url: "/privacy" },
];
const SocialIcon = [
  { label: "instagram", url: "/images/instagram.jpeg" },
  { label: "facebook", url: "/images/facebook.png" },
  { label: "twitter", url: "/images/twitter.png" },
  { label: "youtube", url: "/images/youtube.png" },
];

const Footer = () => {
  return (
    <div className="w-full bg-gray-500 py-4 px-6">
      <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
        <div className="flex items-center gap-6 mix-blend-multiply">
          {SocialIcon.map((item, index) => (
            <div
              key={index}
              className="w-8 h-8 cursor-pointer hover:scale-105 duration-300 transition-all ease-in-out"
            >
              <img className="w-full h-full" src={item.url} alt={item.label} />
            </div>
          ))}
        </div>
        <div className="flex sm:flex-row flex-col items-center sm-gap-6 gap-3">
          {footerData.map((item, index) => (
            <div className="cursor-pointer" key={index}>
              <p className="font-medium text-white text-base hover:text-black transition-all duration-300 ease-in-out">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
