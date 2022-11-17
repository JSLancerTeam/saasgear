import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';

const PaginationBtn = styled(Button)`
  width: 33px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  & + & {
    margin-left: 8px;
  }
`;

function generatePages(total: number, current: number): Array<'...' | number> {
  if (total <= 5) {
    return Array.from(Array(total > 0 ? total : 0).keys());
  }
  if (total > 5 && current < 4) {
    return [0, 1, 2, 3, 4, '...', total - 1];
  }
  if (current >= 4 && total > 4 && current < total - 4) {
    return [0, 1, '...', current - 1, current, current + 1, '...', total - 1];
  }
  if (current >= total - 4) {
    return [0, 1, '...', total - 4, total - 3, total - 2, total - 1];
  }

  return [];
}

type Props = {
  total: number;
  size?: number;
  onPageChange: (offset: number, limit: number) => void;
}

const Pagination: React.FC<Props> = ({ total, size = 20, onPageChange }) => {
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

  function handleControl(type: "prev" | "next") {
    if (type === 'prev') {
      if (currentPage !== 0) {
        setCurrentPage((cr) => cr - 1);
      }
    } else if (currentPage < totalPage - 1) {
      setCurrentPage((cr) => cr + 1);
    }
  }

  function handleClickPage(page: "..." | number) {
    if (page !== '...') {
      setCurrentPage(page);
    }
  }

  return pages && pages.length > 1 ? (
    <div className="flex justify-end mt-4">
      <PaginationBtn
        type="button"
        onClick={() => handleControl('prev')}
        disabled={currentPage === 0}
      >
        &lt;
      </PaginationBtn>
      {pages.map((page) => (
        <PaginationBtn
          type="button"
          color={currentPage === page ? 'primary' : 'default'}
          key={page}
          onClick={() => handleClickPage(page)}
        >
          {page !== '...' ? page + 1 : page}
        </PaginationBtn>
      ))}
      <PaginationBtn
        type="button"
        onClick={() => handleControl('next')}
        disabled={currentPage === totalPage - 1}
      >
        &gt;
      </PaginationBtn>
    </div>
  ) : null;
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  size: PropTypes.number,
};

export default memo(Pagination);
