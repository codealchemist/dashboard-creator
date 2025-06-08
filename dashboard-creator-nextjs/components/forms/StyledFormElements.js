import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px;
  height: 100%;
`;

export const SectionTitle = styled.h1` // Changed to h1 for page title semantics
  font-size: 2.2em;
  color: #2c3e50; // Dark blue/grey
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db; // Blue accent
  font-weight: 500;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: #ffffff;
  // Removed direct padding/shadow from here, let PageContainer or specific form wrapper handle it
  // This makes Form more reusable as a direct child or within other containers
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 500; // Slightly less bold than 'bold'
  color: #34495e; // Dark grey/blue
  font-size: 1em; // Standardize font size
`;

export const Input = styled.input`
  padding: 12px 15px; // Increased padding
  border: 1px solid #d1d8de; // Lighter border
  border-radius: 5px; // Slightly more rounded
  font-size: 1em;
  color: #2c3e50;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    outline: none;
    border-color: #3498db; // Blue focus border
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15); // Softer focus shadow
  }
`;

export const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid #d1d8de;
  border-radius: 5px;
  font-size: 1em;
  background-color: white;
  color: #2c3e50;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0; // Add some vertical padding
`;

export const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  width: 20px; // Slightly larger
  height: 20px;
  cursor: pointer;
  accent-color: #3498db; // Use browser's accent color styling
`;

export const Panel = styled.fieldset`
  border: 1px solid #dde4e9; // Light grey border
  border-radius: 6px;
  padding: 25px; // More padding
  margin-top: 15px; // Consistent margin
  display: flex;
  flex-direction: column;
  gap: 20px; // Increased gap for elements within panel

  legend {
    font-weight: 600; // Bolder legend
    color: #2980b9; // Darker blue for legend
    padding: 0 12px; // More padding for legend
    font-size: 1.2em; // Larger legend text
  }
`;

export const ArrayInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ArrayItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f9f9f9; // Slight background for item container
`;

export const Button = styled.button`
  padding: 10px 18px;
  font-size: 0.95em;
  font-weight: 500;
  color: white;
  background-color: #3498db; // Blue
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start;

  &:hover {
    background-color: #2980b9; // Darker blue on hover
  }

  &.remove {
    background-color: #e74c3c; // Red for remove
    &:hover {
      background-color: #c0392b; // Darker red
    }
  }
  &.add {
    // Default blue is fine for add
  }
`;


export const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  input[type="color"] {
    width: 44px; // Larger color picker
    height: 44px;
    padding: 2px; // Minimal padding
    border: 1px solid #d1d8de;
    border-radius: 4px;
    cursor: pointer;
  }
  input[type="text"] {
    flex-grow: 1;
  }
`;
