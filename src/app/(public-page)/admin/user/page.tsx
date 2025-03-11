/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import AddEditModal from "@/components/addEditUser";
import { addUser, editUser, userDetails, userList } from "@/lib/auth/auth";
import { Fragment, useCallback, useEffect, useState } from "react";
import { FormDataType } from "@/components/addEditUser";
import { toastifyError, toastifySuccess } from "@/shared/utils/toastify";
import { userData } from "@/ts/interfaces/Auth";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/modal/DeleteModal";

export default function UsersPage() {
  const [user, setUser] = useState<userData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserAddModal, setIsuserAddModal] = useState<boolean>(false);
  const [isPageLoad, setIsPageLoad] = useState<boolean>(true);
  const [details, setDetails] = useState<userData | null>(null);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [role, setRole] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const perPage = 10;
  useEffect(() => {
    list({ page: page, perPage: perPage });
  }, [page]);
  const list = async (data?: { page: number; perPage: number }) => {
    try {
      const response = await userList(data);
      if (response.code == 200) {
        setUser(response.data);
        setTotalCount(response?.totalCount);
        setIsPageLoad(false);
      }
    } catch (error) {
      setIsPageLoad(false);
      console.log("Error is ", error);
    }
  };

  const handlePageClick = useCallback(
    (e: any) => {
      setPage(e.selected + 1);
    },
    [setPage, page]
  );

  // const handleDelete = async (id: string) => {
  //   setShowDeleteModal(true);
  //   const response = await DeleteUser(id);
  //   if (response.code == 200) {
  //     setPage(1);
  //     list({ page: 1, perPage: perPage });
  //   }
  // };

  const handleUserDetails = async (id: string) => {
    const response = await userDetails(id);
    if (response.code == 200) {
      setDetails(response.data);
      setIsuserAddModal(true);
    }
  };

  const handleDeleteModalshow = (id: string) => {
    setShowDeleteModal(true);
    setDeleteUserId(id);
  };

  const handleUpdateUser = async (data: FormDataType, id: string) => {
    try {
      setIsLoading(true);
      const response = await editUser(data, id);
      if (response.code == 200) {
        toastifySuccess(response.message, new Date().getTime().toString());
        list({ page: page, perPage: perPage });
        setIsLoading(false);
        setIsuserAddModal(false);
      }
    } catch (error: any) {
      console.error(error);
      if (error) {
        toastifyError(
          error?.response.data.message,
          new Date().getTime().toString()
        );
        setIsuserAddModal(false);
        setDetails?.(null);
      }
      setIsLoading(false);
    }
  };

  const CreateUser = useCallback(async (data: FormDataType) => {
    try {
      setIsLoading(true);
      const response = await addUser(data);
      if (response.code == 201) {
        toastifySuccess(response.message, new Date().getTime().toString());
        setIsuserAddModal(false);
        setIsLoading(false);
        list({ page: page, perPage: perPage });
        setDetails(null);
      }
    } catch (error: any) {
      setIsLoading(false);
      toastifyError(
        error?.response.data.message,
        new Date().getTime().toString()
      );
      console.error(error);
    }
  }, []);

  return (
    <Fragment>
      <div className="bg-gray-100 p-6">
        {/* <select
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 w-fit cursor-pointer bg-blue-500 text-white outline-none rounded-md shadow-md hover:bg-blue-600"
        >
          <option value="" disabled selected>
            Select a Role
          </option>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
        </select> */}

        <div
          onClick={() => setIsuserAddModal(true)}
          className="px-4 py-2 w-fit float-end bg-blue-500 text-white rounded-md shadow-md cursor-pointer hover:bg-blue-600"
        >
          Add User
        </div>

        {isPageLoad ? (
          <p className="text-2xl text-blue-500 mt-20 font-semibold text-center">
            Loading ...
          </p>
        ) : user && user.length > 0 ? (
          <div className="mx-auto max-w-4xl bg-white p-6 shadow-lg rounded-lg">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-700">
              User List
            </h2>
            <div className=" max-w-full overflow-x-scroll">
              <table className="w-full border-collapse border border-gray-300 ">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Role</th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>

                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((user: any) => (
                    <tr
                      key={user._id}
                      className="text-center border-b border-gray-200"
                    >
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">
                        {user.isVerified ? "Verified" : "Not Verified"}
                      </td>

                      <td className="px-4 py-2 space-x-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleUserDetails(user._id)}
                          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                          onClick={() => handleDeleteModalshow(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  <AddEditModal
                    isOpen={isUserAddModal}
                    setIsOpen={setIsuserAddModal}
                    CreateUser={CreateUser}
                    isLoading={isLoading}
                    details={details}
                    setDetails={setDetails}
                    updateUser={handleUpdateUser}
                    // resetData={resetData}
                  />
                  {showDeleteModal && (
                    <DeleteModal
                      setShowDeleteModal={setShowDeleteModal}
                      deleteUserId={deleteUserId}
                      fetchData={() => {
                        setPage(1);
                        list({ page: 1, perPage: perPage });
                      }}
                    />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-2xl text-blue-500 mt-20 font-semibold text-center">
            No Data Found
          </p>
        )}

        {totalCount > perPage && (
          <div className="pagination">
            <Pagination
              totalCount={totalCount}
              perPage={perPage}
              page={page}
              handlePageClick={handlePageClick}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}
