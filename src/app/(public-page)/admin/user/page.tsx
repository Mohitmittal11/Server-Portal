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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deleteUserId, setDeleteUserId] = useState<string>("");
  const perPage = 10;

  useEffect(() => {
    list({ page: page, perPage: perPage, search: searchTerm });
  }, [page]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      list({ page: page, perPage: perPage, search: searchTerm });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const list = async (data: {
    page: number;
    perPage: number;
    search?: string;
  }) => {
    try {
      const response = await userList(data);
      if (response.code == 200) {
        setUser(response.data);
        setTotalCount(response?.totalCount);
        setIsPageLoad(false);
        setPage(data.page);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Fragment>
      <div className="flex mobile:justify-end justify-between gap-8 items-center px-2">
        <input
          onChange={handleSearch}
          type="text"
          name="search"
          id="search"
          placeholder="Search by Project Name"
          className="border max-w-lg h-8 mobile:pl-3 pl-1 bg-gray-100 focus:outline-none focus-within:text-gray-500 mobile:placeholder:text-sm placeholder:text-xs text-[12px] placeholder:text-gray-400 border-t-transparent border-x-transparent"
        />
        <button
          onClick={() => setIsuserAddModal(true)}
          className="px-4 py-2 w-fit bg-blue-500 text-white rounded-md shadow-md cursor-pointer hover:bg-blue-600 text-nowrap mobile:text-base text-sm"
        >
          Add User
        </button>
      </div>
      <div className="bg-gray-100 mt-12">
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

        {isPageLoad ? (
          <p className="text-2xl text-blue-500 mt-20 font-semibold text-center">
            Loading ...
          </p>
        ) : user && user.length > 0 ? (
          <div className="w-full bg-white p-6 shadow-lg rounded-lg">
            <h2 className="mb-4 text-center mobile:text-2xl text-xl font-bold text-gray-700">
              User List
            </h2>
            <div className=" max-w-full overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mobile:text-base text-sm ">
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
