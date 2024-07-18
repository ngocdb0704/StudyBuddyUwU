import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import HomePage from "./pages/HomePage";

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
	  console.log(bottom)
    if (bottom) { alert("Bottom") }
  }



const Home = () => (
  <Container className="mt-4">
  </Container>
);

const App = () => {
  return (
	<div onScroll={() => console.log("evt")}>
    <UserProvider>
      <SubjectProvider>
        <Router>
          <AppNavbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/add" element={<AddSubjectForm />} />
              <Route path="/edit/:id" element={<EditSubjectForm />} /> */}
              <Route path="/Subject/:id" element={<SubjectDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/subjectsList" element={<ContainerSubjectsList />} />
            </Routes>
        </Router>
      </SubjectProvider>
    </UserProvider>
	</div>
  );
};

export default App;
