import React, { useState, useContext, useEffect } from 'react';
import { BlogContext } from '../context/BlogContext';
import './css/BlogList.css';

const BlogList = () => {
  const { blogs, categories } = useContext(BlogContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dateRangeOption, setDateRangeOption] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(2);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs]);

  const handleSearch = () => {
    const filtered = blogs.filter(blog => {
      const matchesSearchTerm = blog.BlogTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? blog.BlogCategoryId === parseInt(selectedCategory) : true;
      const matchesDateRange = (!startDate || new Date(blog.UpdatedTime) >= new Date(startDate)) &&
                               (!endDate || new Date(blog.UpdatedTime) <= new Date(endDate));
      return matchesSearchTerm && matchesCategory && matchesDateRange;
    });
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setDateRangeOption('All');
    setStartDate('');
    setEndDate('');
    setFilteredBlogs(blogs);
    setCurrentPage(1);
  };

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    const pageNumbers = [];
    const maxPageNumbersToShow = 5; // Adjust this number based on your requirements

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftSide = Math.max(1, currentPage - 2);
      const rightSide = Math.min(totalPages, currentPage + 2);

      if (leftSide > 1) {
        pageNumbers.push(1);
        if (leftSide > 2) {
          pageNumbers.push('...');
        }
      }

      for (let i = leftSide; i <= rightSide; i++) {
        pageNumbers.push(i);
      }

      if (rightSide < totalPages) {
        if (rightSide < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((number, index) =>
      number === '...' ? (
        <span key={index} className="dots">...</span>
      ) : (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      )
    );
  };

  return (
    <div className="blog-list-container">
      <div className="row">
        <div className="col-md-3">
          <div className="search-filter-container">
            Search:
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            Category:
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.BlogCategoryId} value={category.BlogCategoryId}>
                  {category.BlogCategoryName}
                </option>
              ))}
            </select>
            Date range:
            <select
              value={dateRangeOption}
              onChange={(e) => setDateRangeOption(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Specified">Specified</option>
            </select>
            {dateRangeOption === 'Specified' && (
              <div className="date-range-inputs">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            )}
            <p></p>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="col-md-9">
          {currentBlogs.length > 0 ? (
            <div className="blog-cards-container">
              {currentBlogs.map(blog => (
                <div className="blog-card" key={blog.BlogId}>
                  <img src={blog.Thumbnail} alt="Blog Thumbnail" className="blog--cardimage" />
                  <h3>{blog.BlogTitle}</h3>
                  <div className="blog-card-category">
                    {categories.find(category => category.BlogCategoryId === blog.BlogCategoryId)?.BlogCategoryName}
                  </div>
                  <p>{blog.PostBrief}</p>
                  <p><small>Updated: {new Date(blog.UpdatedTime).toLocaleDateString()}</small></p>
                  <button className="read-more-button">Read More</button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-posts-found">
              <img src="path_to_image/no_posts_found.png" alt="No posts found" />
              <h2>No posts found</h2>
              <button onClick={handleReset}>Reset</button>
            </div>
          )}
          <div className="pagination">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            {renderPageNumbers()}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;