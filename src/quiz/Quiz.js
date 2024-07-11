import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/quiz');
        const fetchedQuiz = response.data;

        // Shuffle questions array to display randomly
        const shuffledQuestions = shuffleArray(fetchedQuiz.questions);

        // Update quiz state with shuffled questions
        setQuiz({ ...fetchedQuiz, questions: shuffledQuestions });
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  const shuffleArray = (array) => {
    // Fisher-Yates (Knuth) shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const onClickNext = () => {
    setActiveQuestion((prev) => prev + 1);
    setSelectedAnswer('');
  };

  const onAnswerSelected = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      setResult((prev) => ({
        ...prev,
        score: prev.score + quiz.perQuestionScore,
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

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header className="bg-primary text-white">
          <h1 className="text-center">Quiz: {quiz.topic}</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title className="mb-4">Question {activeQuestion + 1} of {quiz.totalQuestions}</Card.Title>
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
          {selectedAnswer !== '' && activeQuestion < questions.length - 1 && (
            <Button variant="primary mt-4" onClick={onClickNext}>Next</Button>
          )}
          {activeQuestion === questions.length - 1 && (
            <Button variant="success mt-4" onClick={() => console.log(result)}>Finish</Button>
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
