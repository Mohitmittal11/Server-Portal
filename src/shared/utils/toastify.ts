import { toast } from "react-toastify";

export const toastifyWarning = (message: string, id: string | number) => {
  toast.warning(message, {
    toastId: id,
    className: "text-lightPrimary bg-lightSecondBackground",
    progressClassName: "bg-lightPrimary",
    icon: false,
    draggable: false,
  });
  return;
};
export const toastifySuccess = (message: string, id: string | number) => {
  toast.success(message, {
    toastId: id,
    className: "bg-green-500 text-black",
    progressClassName: "bg-green-500",
    icon: false,
    draggable: false,
  });
  return;
};

export const toastifyError = (message: string, id: string | number) => {
  toast.error(message, {
    toastId: id,
    className: "bg-red-500 text-white",
    progressClassName: "bg-red-500",
    icon: false,
    draggable: false,
  });
  return;
};
export const toastifyInfo = (message: string, id: string | number) => {
  toast.info(message, {
    toastId: id,
    className: "bg-lightBgGreen text-white",
    progressClassName: "bg-lightBgGreen",
    icon: false,
    draggable: false,
  });
  return;
};
