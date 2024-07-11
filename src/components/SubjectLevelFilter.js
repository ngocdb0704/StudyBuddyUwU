import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { SubjectContext } from '../context/SubjectContext';

const StatusFilter = () => {
  const { levelFilter, setLevelFilter } = useContext(SubjectContext);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setLevelFilter({ ...levelFilter, [name]: checked });
  };

  return (
    <Form className="level-filter">
      <Form.Check 
        type="checkbox"
        label="Level 1"
        name="level1"
        checked={levelFilter.level1}
        onChange={handleChange}
      />
      <Form.Check 
        type="checkbox"
        label="Level 2"
        name="level2"
        checked={levelFilter.level2}
        onChange={handleChange}
      />
      <Form.Check 
        type="checkbox"
        label="Level 3"
        name="level3"
        checked={levelFilter.level3}
        onChange={handleChange}
      />
    </Form>
  );
};

export default StatusFilter;