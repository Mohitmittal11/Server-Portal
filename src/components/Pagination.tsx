import ReactPaginate from "react-paginate";
import { FC } from "react";
interface PageClickHandler {
  (page: { selected: number }): void;
}

const Pagination: FC<{
  totalCount: number;
  perPage: number;
  handlePageClick: PageClickHandler;
  page: number;
}> = ({ totalCount, perPage, handlePageClick, page }) => {
  const handlePage = () => {
    if (page > 1) {
      return Number(page) - 1;
    } else {
      return 0;
    }
  };

  const totalPages = Math.ceil(totalCount / perPage);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <ReactPaginate
      // previousLabel={"Previous"}
      // nextLabel={"Next"}
      nextLabel={page === Math.ceil(totalCount / perPage) ? "" : ">"}
      previousLabel={page === 1 ? "" : "<"}
      breakLabel={"..."}
      forcePage={handlePage()}
      pageCount={Math.ceil(totalCount / perPage)}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(e) => {
        handlePageClick(e);
      }}
      containerClassName={
        "mt-5 md:mt-8 mb-4 md:mb-7 pagination flex gap-2 justify-center items-center"
      }
      pageClassName={"page-item"}
      previousClassName={isFirstPage ? "hidden" : "inline-block mr-2 page-item"}
      previousLinkClassName="text-[#130D0A] rounded page-link prev text-2xl"
      nextClassName={isLastPage ? "hidden" : "inline-block page-item"}
      nextLinkClassName="text-[#130D0A] rounded page-link next text-2xl"
      pageLinkClassName={
        "page-link h-10 w-10 min-w-10 rounded-md flex justify-center items-center border border-[#E5E5E4]"
      }
      breakClassName={"break-me paginationBreaklabeldisabled"}
      breakLinkClassName={"page-link"}
      activeClassName={"active bg-blue-500 text-white rounded-md"}
    />
  );
};
export default Pagination;
