import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DataGrid.css';

function DataGrid({ dataType }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttribute, setFilterAttribute] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const itemsPerPage = 5;
  const apiUrl = `https://jsonplaceholder.typicode.com/${dataType}`;

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, filterAttribute, filterValue, sortColumn, sortOrder]);

  const fetchData = async () => {
    setLoading(true);
    const params = {
      _start: (currentPage - 1) * itemsPerPage,
      _limit: itemsPerPage,
      _sort: sortColumn,
      _order: sortOrder,
      ...(searchTerm && { q: searchTerm }),
      ...(filterAttribute && filterValue && { [filterAttribute]: filterValue }),
    };

    try {
      const response = await axios.get(apiUrl, { params });
      setData(response.data);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoading(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterAttributeChange = (event) => {
    setFilterAttribute(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const renderTableColumns = () => {
    if (dataType === 'users') {
      return (
        <>
          <th onClick={() => handleSort('id')}>ID</th>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('username')}>Username</th>
          <th onClick={() => handleSort('email')}>Email</th>
        </>
      );
    } else if (dataType === 'posts') {
      return (
        <>
          <th onClick={() => handleSort('id')}>ID</th>
          <th onClick={() => handleSort('userId')}>User ID</th>
          <th onClick={() => handleSort('title')}>Title</th>
          <th onClick={() => handleSort('body')}>Body</th>
        </>
      );
    } else if (dataType === 'comments') {
      return (
        <>
          <th onClick={() => handleSort('id')}>ID</th>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('email')}>Email</th>
          <th onClick={() => handleSort('body')}>Body</th>
        </>
      );
    }
  };

  const renderTableRow = (item) => {
    if (dataType === 'users') {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
        </tr>
      );
    } else if (dataType === 'posts') {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.userId}</td>
          <td>{item.title}</td>
          <td>{item.body}</td>
        </tr>
      );
    } else if (dataType === 'comments') {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.body}</td>
        </tr>
      );
    }
  };

  return (
    <div className="container">
      <div className='search'>
        <label htmlFor="search">Search: </label>
        <input type="text" id="search" value={searchTerm} onChange={handleSearch} />
      </div>
      <div>
        <label htmlFor="filterAttribute">Filter By: </label>
        <select id="filterAttribute" value={filterAttribute} onChange={handleFilterAttributeChange}>
          <option value="">-- Select Attribute --</option>
          <option value="userId">User ID</option>
          <option value="title">Title</option>
          <option value="email">Email</option>
        </select>
        <input type="text" value={filterValue} onChange={handleFilterValueChange} />
      </div>
      <table>
        <thead>
          <tr>
            {renderTableColumns()}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={dataType === 'comments' ? 4 : 3}>Loading...</td>
            </tr>
          ) : (
            data.map(renderTableRow)
          )}
        </tbody>
      </table>
      <div className="buttons-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={currentPage !== 1 ? 'black-background' : ''}
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={currentPage !== totalPages ? 'black-background' : ''}
      >
        Next
      </button>
    </div>
  </div>
);
}

export default DataGrid;
