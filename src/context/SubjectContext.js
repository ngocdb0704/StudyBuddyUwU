import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SubjectContext = createContext();

const SubjectProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState({
    level1: true,
    level2: true,
    level3: true,
  });

  //Ngoc's working on packages

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const catResponse = await axios.get(
        "http://localhost:9999/SubjectCategory"
      );
      setCategories(catResponse.data);
      const subResponse = await axios.get("http://localhost:9999/Subject");
      setSubjects(subResponse.data);
      const packageResponse = await axios.get("http://localhost:9999/Package");
      setPackages(packageResponse.data);
    };
    fetchData();
  }, []);

  const findFirstAvailableId = () => {
    const ids = subjects.map((subject) => subject.SubjectId).sort((a, b) => a - b);
    let availableId = 1;
    for (let id of ids) {
      if (id !== availableId) break;
      availableId++;
    }
    return availableId;
  };

  const addSubject = async (subject) => {
    const newId = findFirstAvailableId();
    const response = await axios.post("http://localhost:9999/Subject", {
      ...subject,
      SubjectId: newId,
      SubjectCategoryId: Number(subject.SubjectCategoryId),
    });
    setSubjects([...subjects, response.data]);
  };

  const updateSubject = async (updatedSubject) => {
    const sub = subjects.find((sub) => sub.SubjectId === updatedSubject.SubjectId)
    const response = await axios.put(`http://localhost:9999/Subject/${sub.id}`, updatedSubject);
    const updatedSubjects = subjects.map((subject) =>
      subject.SubjectId === updatedSubject.SubjectId ? response.data : subject
    );
    setSubjects(updatedSubjects);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (cat) => cat.subjectCategoryId === categoryId
    );
    return category ? category.subjectCategoryName : "Unknown";
  };

  return (
    <SubjectContext.Provider
      value={{
        categories,
        subjects,
        setSubjects,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        addSubject,
        updateSubject,
        getCategoryName,
        levelFilter, 
        setLevelFilter,
        packages
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectProvider;
