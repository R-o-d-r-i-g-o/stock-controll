"use client";

import React from "react";

import { useRouter } from "next/navigation";
import MuiPagination from "@mui/material/Pagination";

type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  defaultPage?: number;
  total: number;
  page: number;
  size: number;
};

const Pagination: React.FC<PaginationProps> = ({ total, page, size, defaultPage = 1, className, ...rest }) => {
  const router = useRouter();

  const handleChangePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    e?.preventDefault();

    const filters = new URLSearchParams({
      page: newPage.toString(),
      size: size.toString(),
    });
    router.push("?" + filters.toString());
  };

  return (
    <div {...rest} className={`flex justify-center items-center ${className}`}>
      <MuiPagination page={page} color="primary" count={Math.ceil(total / size)} onChange={handleChangePage} defaultPage={defaultPage} siblingCount={1} boundaryCount={1} />
    </div>
  );
};

export default Pagination;
