// src/context/BlogContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:9999/Blog'),
          axios.get('http://localhost:9999/BlogCategory')
        ]);
        setBlogs(blogsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, categories, loading }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;