import React from 'react';
import './Pagination.scss';

const Pagination = ({
  elementsPerPage, totalElements, paginate, currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
        {pageNumbers.map((number) => (
          <div key={number} onClick={() => paginate(number)} className={currentPage === number ? `${'page-link'} ${'page-link-active'}` : 'page-link'}>
            <span className='page-item'>
              {number}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Pagination;
