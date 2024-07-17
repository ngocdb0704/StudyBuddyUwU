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
import SubjectDetail from "./components/SubjectDetail";
import SubjectLevelFilter from "./components/SubjectLevelFilter";
import UserProfilePopup from "./components/UserProfile";
import ContainerSubjectsList from "./components/ContainerSubjectsList";

const Home = () => (
  <Container className="mt-4">
  </Container>
);

const Navigation = () => (
  <div className="nav-bar">
    <div className="nav-bar-content">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/blog" className="nav-link">
        Blog
      </Link>
      <Link to="/add-attendee" className="nav-link">
        Add Attendee
      </Link>
      <Link to="/add-attendee-to-cart" className="nav-link">
        Add to Team
      </Link>
      <Link to="/display-cart" className="nav-link">
        Display Team
      </Link>
    </div>
  </div>
);

const AppLayout = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

const App = () => {
  return (
    <UserProvider>
      <SubjectProvider>
        <Router>
          <Container className="mt-4">
            <Routes>
              <Route
                path="/"
                element={
                  <Home/>
                }
              />
              {/* <Route path="/add" element={<AddSubjectForm />} />
              <Route path="/edit/:id" element={<EditSubjectForm />} /> */}
              <Route path="/Subject/:id" element={<SubjectDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/subjectsList" element={<ContainerSubjectsList />} />
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                {/* <Route path="/add" element={<AddSubjectForm />} />
                <Route path="/edit/:id" element={<EditSubjectForm />} /> */}
                <Route path="/Subject/:id" element={<SubjectDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/blog" element={<></>} />
                <Route path="/subjectsList" element={<ContainerSubjectsList />} />
              </Route>
            </Routes>
          </Container>
        </Router>
      </SubjectProvider>
    </UserProvider>
  );
};

export default App;