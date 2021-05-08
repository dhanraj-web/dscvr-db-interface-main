import React, { useState, useEffect } from 'react';

export default function Pagination({ pageWiseDate, noOfPages }) {
  const [numberOfPages, setNumberOfPages] = useState(
    Array.from({ length: noOfPages }, (_, index) => index + 1)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perTabLength, setpettabLength] = useState(5);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    setNumberOfPages(
      Array.from({ length: noOfPages }, (_, index) => index + 1)
    );
    setpettabLength(noOfPages > 5 ? 5 : noOfPages);
  }, [noOfPages]);

  const indexOfLastTodo = currentPage * perTabLength;
  const indexOfFirstTodo = indexOfLastTodo - perTabLength;
  const currentTodos = numberOfPages.slice(indexOfFirstTodo, indexOfLastTodo);
  const renderTodos = currentTodos.map((todo, index) => {
    return (
      <li className="page-item" key={index}>
        <a
          className="page-link"
          href="javascript:void(0)"
          style={todo === selectedPage ? { color: '#369d0e' } : {}}
          onClick={() => {
            setSelectedPage(todo);
            pageWiseDate(index * 50 + index, index * 50 + 50);
          }}
        >
          {todo}
        </a>
      </li>
    );
  });

  const handleClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleClickPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <ul className="pagination     justify-content-end">
      <li className="page-item">
        <a
          className="page-link"
          href="javascript:void(0)"
          onClick={handleClickPrevious}
          aria-label="Previous"
          style={currentPage === 1 ? { pointerEvents: 'none' } : {}}
          disabled={currentPage === 1 ? true : false}
        >
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </a>
      </li>

      {renderTodos}

      <li className="page-item">
        <a
          className="page-link"
          href="javascript:void(0)"
          onClick={handleClickNext}
          aria-label="Next"
          style={
            parseInt(numberOfPages.length / perTabLength) === currentPage
              ? { pointerEvents: 'none' }
              : {}
          }
        >
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Next</span>
        </a>
      </li>
    </ul>
  );
}
