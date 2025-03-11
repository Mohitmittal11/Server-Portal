/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import AddEditServer from "@/components/addEditServer";
import Pagination from "@/components/Pagination";
import {
  AddServer,
  deleteServer,
  EditServer,
  ListServer,
  ServerDetails,
} from "@/lib/server";
import { toastifyError, toastifySuccess } from "@/shared/utils/toastify";
import { serverList } from "@/ts/interfaces/Server";

import React, { Fragment, useCallback, useEffect, useState } from "react";

const Page = () => {
  const [isAddServerOpen, setISAddServerOpen] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [server, setServer] = useState<serverList[]>([]);
  const [serverDetails, setServerDetails] = useState<serverList | null>();
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const perPage = 10;
  useEffect(() => {
    serverList({ page: page, perPage: perPage });
  }, [page, perPage]);
  const serverList = async (data: { page?: number; perPage?: number }) => {
    try {
      const result = await ListServer(data);
      if (result.code === 200) {
        setServer(result.data);
        setTotalCount(result.totalCount);
        setIsListLoading(false);
      }
    } catch (error) {
      console.log("Error that is ", error);
    }
  };

  const handleAddServer = () => {
    setISAddServerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteServer(id);
      if (res.code === 200) {
        serverList({ page: page, perPage: perPage });
      }
    } catch (error: any) {
      toastifyError(
        error.response.data.message,
        new Date().getTime().toString()
      );
    }
  };

  const handleUserDetails = async (id: string) => {
    try {
      const res = await ServerDetails(id);
      if (res.code == 200) {
        setServerDetails(res.data);

        setISAddServerOpen(true);
      }
    } catch (error: any) {
      toastifyError(
        error.response.data.message,
        new Date().getTime().toString()
      );
    }
  };

  const handleServerSubmit = useCallback(async (bodyData: any) => {
    try {
      const res = await AddServer(bodyData);
      if (res.code == 201) {
        serverList({ page: page, perPage: perPage });
        toastifySuccess(
          "Data Submitted Successfully",
          new Date().getTime().toString()
        );
        setISAddServerOpen(false);
      }
    } catch (error: any) {
      toastifyError(
        error?.response.data.message,
        new Date().getTime().toString()
      );
    }
  }, []);
  const handleUpdate = async (id: string, body: any) => {
    try {
      const res = await EditServer(id, body);
      if (res.code === 200) {
        setISAddServerOpen(false);
        serverList({ page: page, perPage: perPage });
        setServerDetails(null);
        toastifySuccess(
          "Data Updated Successfully",
          new Date().getTime().toString()
        );
      }
    } catch (error: any) {
      toastifyError(
        error?.response.data.message,
        new Date().getTime().toString()
      );
    }
  };

  const handlePageClick = useCallback(async (page: { selected: number }) => {
    setPage(page.selected + 1);
  }, []);
  return (
    <Fragment>
      <div className={isAddServerOpen ? "hidden" : "block"}>
        <div className="flex justify-end mr-4">
          <button
            onClick={handleAddServer}
            className="bg-blue-500 text-white px-4 py-2 font-medium shadow-md rounded-md cursor-pointer hover:bg-blue-700 transition-all"
          >
            ADD Server
          </button>
        </div>

        {/* Table Container */}
        <div className="max-w-screen mx-auto mt-10 p-4 overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            {/* Table Header */}
            <thead className="bg-gray-800 text-white">
              <tr className="text-center">
                <th className="border border-gray-400 p-3">Project Name</th>
                <th className="border border-gray-400 p-3">Environment</th>
                <th className="border border-gray-400 p-3">Server Port</th>
                <th className="border border-gray-400 p-3">Server URL</th>
                <th className="border border-gray-400 p-3">NPM Port</th>
                <th className="border border-gray-400 p-3">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {/* Example Row */}
              {server.map((item, index) => {
                return (
                  <>
                    <tr className="text-center bg-gray-100 hover:bg-gray-200 transition-all">
                      <td className="border p-3 font-semibold">
                        {item.project_name}
                      </td>
                      <td className="border p-3">{item.type}</td>
                      <td className="border p-3">{item.serverPort}</td>
                      <td className="border p-3 text-blue-600 underline cursor-pointer">
                        {item.serverString}
                      </td>
                      <td className="border p-3">{item.npmPort}</td>
                      <td className="px-4 py-2 md:space-x-2 space-y-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleUserDetails(item._id)}
                          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12">
        <AddEditServer
          setISAddServerOpen={setISAddServerOpen}
          isAddServerOpen={isAddServerOpen}
          handleServerSubmit={handleServerSubmit}
          serverDetails={serverDetails}
          setServerDetails={setServerDetails}
          handleUpdate={handleUpdate}
        />
      </div>
      {totalCount > perPage && (
        <Pagination
          page={page}
          perPage={perPage}
          totalCount={totalCount}
          handlePageClick={handlePageClick}
        />
      )}
    </Fragment>
  );
};

export default Page;
