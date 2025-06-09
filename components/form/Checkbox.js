import React from 'react';
import styled from 'styled-components';

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px; /* Increased margin */
`;

const StyledCheckbox = styled.input`
  margin-right: 10px; /* Increased margin */
  width: 16px; /* Explicit size */
  height: 16px; /* Explicit size */
  cursor: pointer;

  &:hover {
    outline: 2px solid #007bff; /* Example hover effect */
  }
`;

const Label = styled.label`
  font-size: 1rem;
  color: #333; /* Darker label color for better visibility */
  cursor: pointer;
`;

const Checkbox = ({ label, value, onChange }) => {
  return (
    <CheckboxWrapper>
      <StyledCheckbox
        type="checkbox"
        checked={value}
        onChange={onChange}
        id={label}
      />
      <Label htmlFor={label}>{label}</Label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
