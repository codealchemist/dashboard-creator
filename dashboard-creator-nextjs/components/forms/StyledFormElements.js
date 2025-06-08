import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 25px 30px; /* Slightly adjusted padding */
  height: 100%;
  opacity: 1; /* Ensure it's not transparent by default */
`;

export const SectionTitle = styled.h1`
  font-size: 2.4em; /* Slightly larger */
  color: #2c3e50;
  margin-bottom: 30px; /* Increased margin */
  padding-bottom: 15px; /* Increased padding */
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary || '#3498db'};
  font-weight: 600; /* Bolder title */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 28px; /* Slightly increased gap */
  background-color: #ffffff;
  padding: 30px; /* Add padding to form container itself */
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* Subtle shadow on the form */
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Increased gap */
`;

export const Label = styled.label`
  font-weight: 500;
  color: #34495e;
  font-size: 1em;
  margin-bottom: 2px; /* Add small bottom margin */
`;

export const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #d1d8de;
  border-radius: 6px; /* Slightly more rounded */
  font-size: 1em;
  color: #2c3e50;
  background-color: #fdfdfe; /* Very light background for input */
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#3498db'};
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15), 0 2px 5px rgba(0,0,0,0.1); /* Added subtle inner shadow */
    background-color: #fff;
  }
  &::placeholder {
    color: #95a5a6;
  }
`;

export const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid #d1d8de;
  border-radius: 6px;
  font-size: 1em;
  background-color: #fdfdfe;
  color: #2c3e50;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary || '#3498db'};
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15), 0 2px 5px rgba(0,0,0,0.1);
    background-color: #fff;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* Increased gap */
  padding: 8px 0;
  cursor: pointer; /* Make whole container clickable */
  &:hover {
    /* background-color: #f9f9f9; /* Subtle hover for checkbox row */
  }
  Label { /* Target Label within CheckboxContainer */
    margin-bottom: 0; /* Reset margin for label next to checkbox */
    font-weight: 400; /* Lighter label for checkbox */
  }
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary || '#3498db'};
  border: 1px solid #d1d8de; /* Add border for non-accent-color browsers */
  border-radius: 3px;
  vertical-align: middle; /* Align checkbox better with label */
`;

export const Panel = styled.fieldset`
  border: 1px solid #dde4e9;
  border-radius: 8px; /* More rounded panel */
  padding: 25px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  background-color: #fdfdfd; /* Slight background for panel */

  legend {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary || '#2980b9'};
    padding: 0 12px;
    font-size: 1.25em; /* Slightly larger legend */
    margin-left: 10px; /* Indent legend slightly */
  }
`;

export const ArrayInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* Increased gap */
`;

export const ArrayItemContainer = styled.div`
  display: flex;
  align-items: center; /* Align items if they have different heights */
  gap: 15px; /* Increased gap */
  padding: 15px; /* Increased padding */
  border: 1px solid #e9edf0; /* Lighter border */
  border-radius: 6px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.03); /* Subtle shadow for array items */
`;

export const Button = styled.button`
  padding: 10px 20px; /* Adjusted padding */
  font-size: 1em; /* Standardized font size */
  font-weight: 500;
  color: white;
  background-color: ${({ theme, className }) => {
    if (className === 'remove') return theme.colors.danger || '#e74c3c';
    if (className === 'add') return theme.colors.success || '#2ecc71'; // Assuming 'add' class for green
    return theme.colors.primary || '#3498db';
  }};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  align-self: flex-start;
  display: inline-flex; /* Align icon and text if any */
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme, className }) => {
      if (className === 'remove') return theme.colors.dangerHover || '#c0392b';
      if (className === 'add') return theme.colors.successHover || '#27ae60'; // Assuming 'add' class
      return theme.colors.primaryHover || '#2980b9';
    }};
    transform: translateY(-1px); /* Subtle lift on hover */
  }
  &:active {
    transform: translateY(0px); /* Press down effect */
  }
`;


export const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  input[type="color"] {
    width: 40px; /* Adjusted size */
    height: 40px;
    padding: 0;
    border: 1px solid #d1d8de;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.1);
    }
  }
  input[type="text"] {
    flex-grow: 1;
    max-width: 150px; /* Prevent text input from becoming too large */
  }
`;
