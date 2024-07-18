import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizList = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/quiz');
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  const handleCheckboxChange = (question) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const handleStartQuiz = () => {
    navigate('/quiz', { state: { selectedQuestions } });
  };

  const handleAddQuestion = () => {
    navigate('/add-question');
  };

  const handleEditQuestion = (questionId) => {
    navigate(`/edit-question/${questionId}`);
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      // Proceed with deletion logic (not implemented here)
      console.log(`Deleting question with ID ${questionId}`);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h1 className="text-center">Quiz: {quiz.topic}</h1>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {quiz.questions.map((question, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <Form.Check
                  type="checkbox"
                  label={question.question}
                  checked={selectedQuestions.includes(question)}
                  onChange={() => handleCheckboxChange(question)}
                />
                <div>
                  <Button variant="warning" className="mr-2" onClick={() => handleEditQuestion(question.id)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteQuestion(question.id)}>Delete</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <center>
            <Button variant="success mt-4" onClick={handleStartQuiz}>Start</Button>
            <Button variant="primary mt-4 ml-2" onClick={handleAddQuestion}>Add Question</Button>
          </center>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuizList;
