import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';



//not even running for now, mostly caused by database problem
const EditQuestion = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState({
    question: '',
    choices: ['', '', '', ''],
    correctAnswer: ''
  });

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/quiz/${questionId}`);
        setQuestionData(response.data);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    fetchQuestionData();
  }, [questionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example of how to send data to your backend (not implemented here)
      const response = await axios.put(`http://localhost:9999/quiz/edit/${questionId}`, {
        question: questionData.question,
        choices: questionData.choices,
        correctAnswer: questionData.correctAnswer
      });
      console.log('Question edited:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error editing question:', error);
    }
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...questionData.choices];
    updatedChoices[index] = value;
    setQuestionData({ ...questionData, choices: updatedChoices });
  };

  return (
    <div className="container mt-5">
      <h2>Edit Question {questionId}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter question"
            value={questionData.question}
            onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
            required
          />
        </Form.Group>
        {questionData.choices.map((choice, index) => (
          <Form.Group key={index} controlId={`choice${index + 1}`}>
            <Form.Label>Choice {index + 1}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter choice ${index + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              required
            />
          </Form.Group>
        ))}
        <Form.Group controlId="correctAnswer">
          <Form.Label>Correct Answer</Form.Label>
          <Form.Control
            as="select"
            value={questionData.correctAnswer}
            onChange={(e) => setQuestionData({ ...questionData, correctAnswer: e.target.value })}
            required
          >
            <option value="">Select correct answer</option>
            {questionData.choices.map((choice, index) => (
              <option key={index} value={choice}>{choice}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditQuestion;
