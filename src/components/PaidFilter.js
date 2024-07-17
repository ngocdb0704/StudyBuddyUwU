import React, { useContext } from 'react';
import { Card, CardBody, Form } from 'react-bootstrap';
import { SubjectContext } from '../context/SubjectContext';

const FilterPaid = () => {
  const { filterPaid, setFilterPaid} = useContext(SubjectContext);

  return (
    <Card>
      <CardBody>
        <h5>Full Time</h5>
        <Form.Check
          type="radio"
          label="All"
          name="filterPaid"
          value=""
          onChange={(e) => setFilterPaid(e.target.value)}
          checked={filterPaid === ''}
        />
        <Form.Check
          type="radio"
          label="Paid"
          name="filterPaid"
          value="true"
          onChange={(e) => setFilterPaid(e.target.value)}
          checked={filterPaid === 'true'}
        />
        <Form.Check
          type="radio"
          label="Unpaid"
          name="filterPaid"
          value="false"
          onChange={(e) => setFilterPaid(e.target.value)}
          checked={filterPaid === 'false'}
        />
      </CardBody>
    </Card>
  );
};

export default FilterPaid;
