/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { serverList } from "@/ts/interfaces/Server";
import { ListServer } from "@/lib/server";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const User = () => {
  const [isListLoading, setIsListLoading] = useState<boolean>(true);
  const [server, setServer] = useState<serverList[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const perPage = 10;

  useEffect(() => {
    serverList({ page: page, perPage: perPage, search: searchTerm });
  }, [page, perPage]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      serverList({ page: 1, perPage: perPage, search: searchTerm });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const serverList = async (data: {
    page: number;
    perPage?: number;
    search?: string;
  }) => {
    try {
      const result = await ListServer(data);
      if (result.code === 200) {
        setServer(result.data);
        setPage(data.page);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Fragment>
      {isListLoading ? (
        <p className="text-2xl text-blue-500 mt-20 font-semibold text-center">
          Loading...
        </p>
      ) : (
        <div className="mt-4">
          <div className="flex justify-end mx-5">
            <input
              onChange={handleSearch}
              type="text"
              name="search"
              id="search"
              placeholder="Search by Project Name"
              className="border pl-3 focus:outline-none focus-within:text-gray-500 md:placeholder:text-sm  placeholder:text-xs placeholder:text-gray-400 border-t-transparent border-x-transparent"
            />
          </div>
          {server && server.length > 0 ? (
            <div className="w-full mx-auto md:p-4 p-2 overflow-x-auto rounded-lg">
              <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-x-auto md:text-base text-sm">
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
          ) : (
            <p className="text-blue-500 text-center text-2xl font-semibold mt-12">
              No Data Found
            </p>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default User;
