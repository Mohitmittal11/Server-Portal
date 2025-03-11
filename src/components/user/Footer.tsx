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
    <div className="w-full bg-gray-600 text-white py-4 px-">
      {/* Social Icons */}
      <div className="flex justify-around ">
        <div className="flex items-center gap-8 mix-blend-multiply">
          {SocialIcon.map((item, index) => (
            <div key={index} className="w-12 h-8 cursor-pointer">
              <img className="w-full h-full" src={item.url} alt={item.label} />
            </div>
          ))}
        </div>
        <div className="flex gap-6">
          {footerData.map((item, index) => (
            <div className="cursor-pointer" key={index}>
              <p className="font-medium text-gray-200">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
