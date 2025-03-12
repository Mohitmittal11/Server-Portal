import { appRoutes } from "@/constants//route";
import axiosInstance from "../axiosInstance";
import { AdminLogin } from "@/ts/interfaces/Auth";
import { FormDataType } from "@/components/addEditUser";
import { ResetPasswordInterface } from "@/app/(auth)/user/reset-password/page";
import useUserAuthStore from "@/stores/userAuthStore";
// import { ResetPasswordInterface } from "@/app/user/reset-password/page";
const setAuthData = useUserAuthStore.getState().setAuthData;

export async function adminLogin(data: AdminLogin) {
  try {
    const response = await axiosInstance.post("admin/auth/login", data);
    const { token, role } = response.data.data;
    setAuthData(response.data.data);
    document.cookie = `adminToken=${token}; path=/`;
    if (!token || !role) {
      throw new Error("Invalid response from authentication service");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function addUser(data: any) {
  try {
    const response = await axiosInstance.post(`admin/user/signup`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userList(data?: {
  page: number;
  perPage: number;
  search?: string;
}) {
  try {
    const response = await axiosInstance.get(
      `admin/user/list?page=${data?.page}&perPage=${data?.perPage}&search=${
        data?.search || ""
      } `
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userDetails(id: string) {
  try {
    const response = await axiosInstance.get(`admin/user/list/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function editUser(data: FormDataType, id: string) {
  try {
    const response = await axiosInstance.patch(`admin/user/edit/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function DeleteUser(id: string) {
  try {
    const response = await axiosInstance.patch(`admin/user/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(data: ResetPasswordInterface) {
  try {
    const response = await axiosInstance.patch(
      `user/auth/reset_password`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function userLogin(data: { email: string; password: string }) {
  try {
    const response = await axiosInstance.post("user/auth/login", data);
    const { accessToken, _id } = response.data.data;
    setAuthData(response.data.data);
    document.cookie = `userToken=${accessToken}; path=/`;
    return response.data;
  } catch (error) {
    throw error;
  }
}
