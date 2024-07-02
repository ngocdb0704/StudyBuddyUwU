import React, { useState } from 'react';
import { InputGroup, FormControl, Button, DropdownButton, Dropdown } from 'react-bootstrap';

const Lab05_SearchBarDropDown = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('Product');

  const handleSearch = () => {
    onSearch(searchTerm, searchType);
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder={`Search by ${searchType} name...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <DropdownButton
        variant="outline-secondary"
        title={searchType}
        id="input-group-dropdown-1"
        align="end"
      >
        <Dropdown.Item href="#" onClick={() => setSearchType('Product')}>Product</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => setSearchType('Customer')}>Customer</Dropdown.Item>
      </DropdownButton>
      <Button onClick={handleSearch}>Search</Button>
    </InputGroup>
  );
};
export default Lab05_SearchBarDropDown;