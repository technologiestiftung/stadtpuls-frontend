import { FC } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import classNames from "classnames";
import styles from "./Pagination.module.css";

export type PickedReactPaginationProps = Pick<
  ReactPaginateProps,
  | "pageCount"
  | "pageRangeDisplayed"
  | "marginPagesDisplayed"
  | "onPageChange"
  | "initialPage"
>;

export interface PaginationType extends PickedReactPaginationProps {
  currentPage: number;
}

const linkClasses = "px-2 py-0.5 min-w-[3ch] inline-block";

export const Pagination: FC<PaginationType> = ({
  currentPage,
  pageCount,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 1,
  onPageChange = () => undefined,
  initialPage = currentPage - 1,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageRangeDisplayed - 1} // because react-paginate works 0-indexed
      initialPage={initialPage}
      onPageChange={onPageChange}
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      containerClassName='flex gap-0 font-mono text-gray-500'
      pageClassName={classNames(
        "text-center border-r border-t border-b border-gray-200",
        "hover:bg-purple hover:bg-opacity-10",
        "z-10"
      )}
      activeClassName={classNames(
        "bg-purple bg-opacity-10 text-purple",
        `z-20 ${styles.activePaginationItem}`
      )}
      activeLinkClassName='font-bold'
      pageLinkClassName={linkClasses}
      nextLinkClassName={linkClasses}
      nextClassName={classNames(
        "border-r border-t border-b rounded-tr-md rounded-br-md",
        "hover:bg-purple hover:bg-opacity-10"
      )}
      previousLinkClassName={linkClasses}
      previousClassName={classNames(
        `${currentPage !== 1 ? "border-r" : "border-r"}`,
        "border-l border-t border-b rounded-tl-md rounded-bl-md",
        "hover:bg-purple hover:bg-opacity-10"
      )}
      breakClassName='border-t border-b border-r pointer-events-none'
      breakLinkClassName={linkClasses}
      disabledClassName='pointer-events-none text-gray-200 border-gray-100'
    />
  );
};
