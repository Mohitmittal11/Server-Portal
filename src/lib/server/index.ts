import axiosInstance from "../axiosInstance";

export async function AddServer(bodyData: any) {
  try {
    const result = await axiosInstance.post("admin/server/add", bodyData);
    return result.data;
  } catch (error: any) {
    throw error;
  }
}

export async function EditServer(id: string, body: any) {
  try {
    const result = await axiosInstance.patch(`admin/server/edit/${id}`, body);
    return result.data;
  } catch (error: any) {
    throw error;
  }
}

export async function ServerDetails(id: string) {
  try {
    const result = await axiosInstance.get(`admin/server/list/${id}`);
    return result.data;
  } catch (error: any) {
    throw error;
  }
}

export async function ListServer(data: {
  page?: number;
  perPage?: number;
  search?: string;
}) {
  try {
    const res = await axiosInstance.get(
      `admin/server/list?page=${data.page}&perPage=${data.perPage}&search=${
        data.search || ""
      }`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}
export async function ChangeStatus() {
  try {
    const result = await axiosInstance.patch(
      "admin/server/changeStatus/67bc09edd1b21e5741515c3b?status=true"
    );
  } catch (error) {
    throw error;
  }
}

export async function deleteServer(id: string) {
  try {
    const result = await axiosInstance.patch(`admin/server/delete/${id}`);
    return result.data;
  } catch (error) {
    throw error;
  }
}
