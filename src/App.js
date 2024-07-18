import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Link,
  Navigate,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "./components/Navbar";
import SubjectProvider from "./context/SubjectContext";
import SubjectList from "./components/SubjectList";
import CategoryList from "./components/CaregoryList";
import Search from "./components/Search";
// import AddSubjectForm from './components/AddSubjectForm'; // Assume you have this component
// import SubjectDetail from './components/SubjectDetail'; // Assume you have this component
// import EditSubjectForm from './components/EditSubjectForm'; // Assume you have this component
import LoginPage from "./components/LoginPage";
import UserProvider from "./context/UserContext";
import BlogProvider from "./context/BlogContext";
import SubjectDetail from "./components/SubjectDetail";
import SubjectLevelFilter from "./components/SubjectLevelFilter";
import UserProfilePopup from "./components/UserProfile";
import ContainerSubjectsList from "./components/ContainerSubjectsList";
import HomePage from "./pages/HomePage";
import BlogList from "./components/BlogList";
import AdminContainerSubjectsList from "./components/admin/AdminContainerSubjectList";
import AdminSubjectOverview from "./components/admin/AdminSubjectOverview";

const Navigation = () => <AppNavbar></AppNavbar>;

const AppLayout = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); 

  if (!user) {
      return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <UserProvider>
		  <SubjectProvider>
        <BlogProvider>
          <Router>
            <AppNavbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/add" element={<AddSubjectForm />} />
              <Route path="/edit/:id" element={<EditSubjectForm />} /> */}
                <Route path="/Subject/:id" element={<SubjectDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/subjectsList"
                  element={<ContainerSubjectsList />}
                />
                <Route path="/blogs" element={<BlogList/>} />
                <Route path="/admin-subjectlist" element={<ProtectedRoute><AdminContainerSubjectsList/></ProtectedRoute>} />
                <Route path="/admin/subjects/:id" element={<ProtectedRoute><AdminSubjectOverview/></ProtectedRoute>} />
              </Routes>
          </Router>
        </BlogProvider>
      </SubjectProvider>
    </UserProvider>
  );
};

export default App;
