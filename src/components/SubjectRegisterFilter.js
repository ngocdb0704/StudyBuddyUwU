import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { SubjectContext } from '../context/SubjectContext';

const RegisterFilter = () => {
  const { register, setRegistered} = useContext(SubjectContext);

  const handleChange = (e) => {
    setRegistered(e.target.value === 'true');
  };

  return (
    <Form className="level-filter">
      <Form.Check 
        type="radio"
        label="All Subjects"
        value="true"
        checked={register === true}
        onChange={handleChange}
      />
      <Form.Check 
        type="radio"
        label="Not Registered"
        value="false"
        checked={register === false}
        onChange={handleChange}
      />
    </Form>
  );
};

export default RegisterFilter;