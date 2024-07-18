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
import HomePage from "./pages/HomePage";
import RegistrationList from "./components/RegistrationList";
import EditRegistForm from "./components/RegistrationEdit";
import Quiz from "./quiz/Quiz";
import QuizList from "./quiz/QuizList";
import PayRegistForm from "./components/RegistrationPay";
import BlogList from "./components/BlogList";
import AdminContainerSubjectsList from "./components/admin/AdminContainerSubjectList";
import AdminSubjectOverview from "./components/admin/AdminSubjectOverview";
import AddSubject from "./components/admin/AddSubject";

const Navigation = () => <AppNavbar></AppNavbar>;

const AppLayout = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')); 

  if (!user || !(user.RoleId === 2)) {
    localStorage.removeItem('user');
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
            <AppLayout />
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/add" element={<AddSubjectForm />} /> */}
                <Route path="/Subject/:id" element={<SubjectDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/subjectsList" element={<SubjectList />} />
                <Route path="/registration" element={<RegistrationList />} />
                <Route path="/blogs" element={<BlogList/>} />
                <Route path="/admin-subjectlist" element={<ProtectedRoute><AdminContainerSubjectsList/></ProtectedRoute>} />
                <Route path="/admin/subjects/:id" element={<ProtectedRoute><AdminSubjectOverview/></ProtectedRoute>} />
                <Route path="/admin/add-subject" element={<ProtectedRoute><AddSubject/></ProtectedRoute>} />
                <Route path="/registration/edit/:id" element={<EditRegistForm />} />
                <Route path="/quiz-list" element={<QuizList />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/registration/pay/:id" element={<PayRegistForm />} />
              </Routes>
          </Router>
        </BlogProvider>
      </SubjectProvider>
    </UserProvider>
  );
};

export default App;
