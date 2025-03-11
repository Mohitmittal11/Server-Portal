"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import useUserAuthStore from "@/stores/userAuthStore";
import { serverList } from "@/ts/interfaces/Server";
import { ListServer } from "@/lib/server";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const User = () => {
  const { authData } = useUserAuthStore();
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [server, setServer] = useState<serverList[]>([]);
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

  const handlePageClick = useCallback((page: { selected: number }) => {
    setPage(page.selected + 1);
  }, []);
  return (
    <Fragment>
      {isListLoading ? (
        <p className="text-2xl text-blue-500 mt-20 font-semibold text-center">
          Loading...
        </p>
      ) : (
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
                        <Link href={item.serverString} target="_blank">
                          {item.serverString}
                        </Link>
                      </td>
                      <td className="border p-3">{item.npmPort}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          {totalCount > perPage && (
            <Pagination
              totalCount={totalCount}
              page={page}
              perPage={perPage}
              handlePageClick={handlePageClick}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

export default User;
