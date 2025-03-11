// import { getCookie } from "@/components/method/getCookies";
// import { Routes } from "@/constant/Routes";
// import useAuthStore from "@/stores/authStore";
// import useGlobalStore from "@/stores/globalStores";
// import globalStore from "@/stores/useGlobalStore";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export interface ErrorResponse {
  message: string;
  [key: string]: unknown;
}

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const isErrorResponse = (error: unknown): error is ErrorResponse => {
  return typeof error === "object" && error !== null && "message" in error;
};

// Helper to sanitize and encode headers
// const sanitizeHeader = (value: string): string => {
//   return encodeURIComponent(value.replace(/[^\x20-\x7E]/g, "")); // Remove non-ASCII characters
// };

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    timezone: timeZone,
    deviceType: "web",
  },
});

// Request interceptor to attach token and language to every request
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig): any => {
    if (config.headers) {
      const cookies = document.cookie.split("; ");
      const token = cookies
        .find((row) => row.startsWith("adminToken="))
        ?.split("=")[1];

      const userToken = cookies
        .find((row) => row.startsWith("userToken="))
        ?.split("=")[1];

      const role = cookies
        .find((row) => row.startsWith("role="))
        ?.split("=")[1];

      // const cookiesGuestToken = cookies
      //   .find((row) => row.startsWith("guestToken="))
      //   ?.split("=")[1];
      // const deviceToken = cookies
      //   .find((row) => row.startsWith("deviceToken="))
      //   ?.split("=")[1];

      //   const guestToken = useAuthStore.getState().guestData?.guestToken;

      // Get system or user-selected language
      //   let language =
      //     getCookie("NEXT_LOCALE") || globalStore.getState().language || "en";
      //   language = /^[a-z]{2}(-[A-Z]{2})?$/.test(language) ? language : "en"; // Validate format
      //   // Update global store if necessary
      //   if (globalStore.getState().language !== language) {
      //     globalStore.setState({ language });
      //   }

      // Sanitize and encode headers
      //   config.headers["language"] = sanitizeHeader(language);
      // config.headers["deviceToken"] = deviceToken;
      // config.headers["deviceType"] = sanitizeHeader("web");

      if (token || userToken) {
        config.headers["Authorization"] = `${token || userToken}`;
        // config.headers["role"] = sanitizeHeader(role || "");
      }

      // else {
      //   config.headers["Authorization"] = `${sanitizeHeader(
      //     cookiesGuestToken || guestToken || ""
      //   )}`;
      // }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error) => {
//     let errorMessage = "An unexpected error occurred";
//     if (axios.isAxiosError(error)) {
//       const errorData = error.response?.data as ErrorResponse;
//       errorMessage = errorData?.message || errorMessage;

//       if (error.response?.status === 401) {
//         // const checkSessionExpired =
//         //   useGlobalStore.getState().checkSessionExpired;
//         //   checkSessionExpired(true);
//         console.error("Unauthorized access - redirecting to login");
//       } else if (error.response?.status === 403) {
//         console.error("Forbidden - you do not have access to this resource");
//         return Promise.reject({
//           code: 403,
//           message: errorData?.message || "Forbidden",
//         });
//       } else if (error.response?.status === 400) {
//         console.error("Bad Request:", errorData?.message || "Unknown error");
//         return Promise.reject(errorData); // Reject the error data to be caught in the component
//       } else if (error.response?.status === 422) {
//         console.error(
//           "Unprocessable Entity:",
//           errorData?.message || "Unknown error"
//         );
//         return Promise.reject(errorData);
//       } else if (error.response?.status === 311) {
//         const role = error.response.data?.result?.role || "admin";
//         const jwtToken = error.response.data?.result?.jwtToken;
//         // const setAuthData = useAuthStore.getState().setAuthData;
//         // const authData = useAuthStore.getState().authData;
//         // setAuthData({
//         //   ...authData,
//         //   role: role,
//         // });
//         document.cookie = `role=${role}; path=/`;
//         document.cookie = `${role}_token=${jwtToken}; path=/`;
//       } else if (error.response?.status === 451) {
//         document.cookie.split(";").forEach((cookie) => {
//           const [name] = cookie.split("=");
//           document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
//         });
//         // window.location.href = Routes.Renter.en;
//       } else if (error.response?.status === 500) {
//         console.error("Server error - please try again later");
//       }
//     } else if (error instanceof Error) {
//       errorMessage = error.message || errorMessage;
//     }
//     console.error(errorMessage);
//     return Promise.reject(new Error(errorMessage));
//   }
// );

export default axiosInstance;
function sanitizeHeader(arg0: string): any {
  throw new Error("Function not implemented.");
}
