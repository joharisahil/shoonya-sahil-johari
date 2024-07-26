import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPreviousPage,
}) => (
  <div className="pagination">
    <button onClick={onPreviousPage} disabled={currentPage === 1}>
      Previous
    </button>
    <button onClick={onNextPage} disabled={currentPage === totalPages}>
      Next
    </button>
  </div>
);

export default Pagination;
