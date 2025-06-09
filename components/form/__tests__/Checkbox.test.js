import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox'; // Adjust path as necessary

describe('Checkbox Component', () => {
  const defaultProps = {
    label: 'Test Checkbox',
    value: false,
    onChange: jest.fn(),
  };

  test('renders with default props', () => {
    render(<Checkbox {...defaultProps} />);

    const checkboxElement = screen.getByLabelText('Test Checkbox');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxElement).not.toBeChecked();
  });

  test('renders as checked when value is true', () => {
    render(<Checkbox {...defaultProps} value={true} />);

    const checkboxElement = screen.getByLabelText('Test Checkbox');
    expect(checkboxElement).toBeChecked();
  });

  test('calls onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} onChange={handleChange} />);

    const checkboxElement = screen.getByLabelText('Test Checkbox');
    fireEvent.click(checkboxElement);

    expect(handleChange).toHaveBeenCalledTimes(1);
    // For a real checkbox, the event passed to onChange would be an event object.
    // Depending on how your onChange is structured, you might check e.target.checked
    // Here, we assume the component calls onChange with the new boolean value or the event itself.
    // If it's just `onChange(e)`, then check `handleChange.mock.calls[0][0].target.checked`
  });

  test('displays the correct label', () => {
    render(<Checkbox {...defaultProps} label="Specific Label" />);
    expect(screen.getByText('Specific Label')).toBeInTheDocument();
  });

  test('associates label with checkbox using htmlFor and id', () => {
    render(<Checkbox {...defaultProps} />);
    const checkboxElement = screen.getByLabelText(defaultProps.label);
    expect(checkboxElement.id).toBe(defaultProps.label);
  });
});
