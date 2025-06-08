import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px; // Space below each form section
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #34495e;
  font-size: 0.95em;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1em;
  color: #2c3e50;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1em;
  background-color: white;
  color: #2c3e50;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const Panel = styled.fieldset`
  border: 1px solid #dde4e9;
  border-radius: 6px;
  padding: 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  legend {
    font-weight: bold;
    color: #2980b9;
    padding: 0 10px;
    font-size: 1.1em;
  }
`;

export const ArrayInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    padding: 8px 12px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    align-self: flex-start;
    &:hover {
      background-color: #2980b9;
    }
  }
`;

export const ArrayItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    background-color: #e74c3c;
    &:hover {
      background-color: #c0392b;
    }
  }
`;

export const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  input[type="color"] {
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  input[type="text"] {
    flex-grow: 1;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 2em;
  color: #2c3e50;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
`;
