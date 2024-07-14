import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizList from './quiz/QuizList';
import Quiz from './quiz/Quiz';
import AddQuestion from './quiz/AddQuestion';
import EditQuestion from './quiz/EditQuestion';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/quiz-list" element={<QuizList />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/edit-question/:questionId" element={<EditQuestion />} />
        <Route path="/" element={<QuizList />} />
      </Routes>
    </Router>
  );
};

export default App;
