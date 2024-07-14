import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedQuestions = location.state?.selectedQuestions || [];
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    // Adjust totalQuestions to the number of selected questions
    setTotalQuestions(selectedQuestions.length);
  }, [selectedQuestions]);

  const [totalQuestions, setTotalQuestions] = useState(selectedQuestions.length);

  const onClickNext = () => {
    setActiveQuestion((prev) => prev + 1);
    setSelectedAnswer('');
  };

  const onAnswerSelected = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      setResult((prev) => ({
        ...prev,
        score: prev.score + 5, // Assuming perQuestionScore is 5 for correct answers
        correctAnswers: prev.correctAnswers + 1,
      }));
    } else {
      setSelectedAnswer(false);
      setResult((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
  };

  const handleFinish = () => {
    // Navigate back to QuizList
    navigate('/quiz-list');
  };

  if (selectedQuestions.length === 0) {
    return <div>No questions selected. Please go back and select questions.</div>;
  }

  const currentQuestion = selectedQuestions[activeQuestion];
  const { question, choices, correctAnswer } = currentQuestion;

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h1 className="text-center">Quiz</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title className="mb-4">Question {activeQuestion + 1} of {totalQuestions}</Card.Title>
          <Card.Text>
            <h5>{question}</h5>
            <ListGroup variant="flush">
              {choices.map((answer) => (
                <ListGroup.Item
                  key={answer}
                  action
                  onClick={() => onAnswerSelected(answer, correctAnswer)}
                  className={`d-flex justify-content-between ${selectedAnswer !== '' && answer === correctAnswer ? 'bg-success text-white' : selectedAnswer !== '' && answer !== correctAnswer ? 'bg-danger text-white' : ''}`}
                >
                  {answer}
                  {selectedAnswer !== '' && answer === correctAnswer && (
                    <i className="fas fa-check-circle"></i>
                  )}
                  {selectedAnswer !== '' && answer !== correctAnswer && answer === selectedAnswer && (
                    <i className="fas fa-times-circle"></i>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Text>
          {selectedAnswer !== '' && activeQuestion < totalQuestions - 1 && (
            <Button variant="primary mt-4" onClick={onClickNext}>Next</Button>
          )}
          {activeQuestion === totalQuestions - 1 && (
            <Button variant="success mt-4" onClick={handleFinish}>Finish</Button>
          )}
        </Card.Body>
        <Card.Footer className="text-muted text-center">
          Score: {result.score} | Correct Answers: {result.correctAnswers} | Wrong Answers: {result.wrongAnswers}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Quiz;
