"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/constants/route";

const LoginSelection: React.FC = () => {
  const router = useRouter();
  //   const [role, setRole] = useState<"user" | "admin" | null>(null);

  const handleSelection = (selectedRole: "user" | "admin") => {
    if (selectedRole === "user") {
      document.cookie = `role=user;path=/`;
      router.push(appRoutes.user.userLogin);
    } else {
      document.cookie = `role=admin;path=/`;
      router.push(appRoutes.admin.adminLogin);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-xl font-semibold mb-4">Select Login Type</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleSelection("user")}
            className="w-full px-4 py-2 rounded-md transition bg-blue-300 text-gray hover:bg-blue-600 hover:text-white"
          >
            Login as User
          </button>
          <button
            onClick={() => handleSelection("admin")}
            className="w-full px-4 py-2 rounded-md transition bg-blue-300 text-gray hover:bg-blue-600 hover:text-white"
            // className={`w-full px-4 py-2 rounded-md transition ${
            //   role === "admin"
            //     ? "bg-blue-600 text-white"
            //     : "bg-gray-200 hover:bg-gray-300"
            // }`}
          >
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
