import React, { useState , useEffect, memo } from 'react';
import PropTypes from 'prop-types';

function generatePages(total, current) {
  if (total <= 5) {
    return Array.from(Array(total > 0 ? total : 0).keys());
  }
  if (total > 5 && current < 4) {
    return [0, 1, 2, 3, 4, '...', total - 1]
  }
  if (current >= 4 && total > 4 && current < total - 4) {
    return [0, 1, '...', current -1, current, current +1, '...', total - 1];
  }
  if (current >= total - 4) {
    return [0, 1, '...', total - 4, total - 3, total - 2, total - 1];
  }

  return [];
}

const Pagination = ({ total, size = 20, onPageChange }) => {
  const [totalPage, setTotalPage] = useState(Math.ceil(total / size));
  const [pages, setPages] = useState(generatePages(totalPage, 0));
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setTotalPage(Math.ceil(total / size));
    setPages(generatePages(Math.ceil(total / size), currentPage));

  }, [total, size]);

  useEffect(() => {
    setPages(generatePages(totalPage, currentPage));
    onPageChange(currentPage * size, size);

  }, [currentPage]);

  function handleControl(type) {
    if (type === 'prev') {
      if (currentPage !== 0) {
        setCurrentPage((cr) => cr - 1);
      }
    } else if (currentPage < totalPage - 1) {
      setCurrentPage((cr) => cr + 1);
    }
  }

  function handleClickPage(page) {
    if (page !== '...') {
      setCurrentPage(page);
    }
  }

  return (
    <nav>
      {pages && pages.length > 1 && (
        <nav className="relative z-0 inline-flex shadow-sm">
          <div>
            <button 
              type="button" 
              onClick={() => handleControl('prev')} 
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous"
              disabled={currentPage === 0}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div>
            {pages.map((page) => (
              <button 
                type="button"
                key={page}
                className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
                onClick={() => handleClickPage(page)}
              >
                {page !== '...' ? page + 1 : page}
              </button>
            ))}
          </div>
          <div v-if="pagination.current_page < pagination.last_page">
            <button
              type="button" 
              onClick={() => handleControl('next')} 
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next"
              disabled={currentPage === totalPage - 1}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </nav>
      )}
    </nav>
  )
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  size: PropTypes.number,
}

export default memo(Pagination);
