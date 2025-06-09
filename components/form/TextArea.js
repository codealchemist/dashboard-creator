import React from 'react';
import styled from 'styled-components';

const TextAreaWrapper = styled.div`
  margin-bottom: 15px; /* Increased margin */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px; /* Increased space below label */
  font-size: 1rem;
  color: #333; /* Darker label color */
  font-weight: bold;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px; /* Increased padding */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical; /* Allow vertical resize */

  &:hover {
    border-color: #888; /* Darker border on hover */
  }

  &:focus {
    outline: none;
    border-color: #007bff; /* Blue border on focus */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Focus shadow */
  }
`;

const TextArea = ({ label, value, onChange }) => {
  return (
    <TextAreaWrapper>
      <Label htmlFor={label}>{label}</Label>
      <StyledTextArea id={label} value={value} onChange={onChange} />
    </TextAreaWrapper>
  );
};

export default TextArea;
