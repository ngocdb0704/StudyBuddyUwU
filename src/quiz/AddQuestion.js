import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



// Add dang bug, no se xoa het phan quiz trong database r add cai moi, t met r cuu
const AddQuestion = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [choices, setChoices] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuestion = {
        question,
        choices,
        correctAnswer
      };

      const response = await axios.post('http://localhost:9999/quiz', newQuestion);
      console.log('Question added:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  return (
    <div className="container mt-5">
      <h2>Add Question</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </Form.Group>
        {choices.map((choice, index) => (
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
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          >
            <option value="">Select correct answer</option>
            {choices.map((choice, index) => (
              <option key={index} value={choice}>{choice}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddQuestion;
