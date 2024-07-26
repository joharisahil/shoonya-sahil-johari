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
    {/* {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => onPageChange(index + 1)}
        className={index + 1 === currentPage ? 'active' : ''}
      >
        {index + 1}
      </button>
    ))} */}
    <button onClick={onNextPage} disabled={currentPage === totalPages}>
      Next
    </button>
  </div>
);

export default Pagination;
