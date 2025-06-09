import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberInput from '../NumberInput'; // Adjust path as necessary

describe('NumberInput Component', () => {
  const defaultProps = {
    label: 'Test Number Input',
    value: '', // Or a default number like 0, but string '' is common for controlled inputs
    onChange: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  test('renders with default props and displays label', () => {
    render(<NumberInput {...defaultProps} />);

    const inputElement = screen.getByLabelText('Test Number Input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(null); // type="number" with empty string value results in .valueAsNumber = NaN, .value = ""
  });

  test('displays the provided numerical value', () => {
    render(<NumberInput {...defaultProps} value={123} />);

    const inputElement = screen.getByLabelText('Test Number Input');
    expect(inputElement).toHaveValue(123);
  });

  test('calls onChange handler when a number is entered', () => {
    render(<NumberInput {...defaultProps} />);

    const inputElement = screen.getByLabelText('Test Number Input');
    // Simulate user typing. The value will be a string initially.
    fireEvent.change(inputElement, { target: { value: '456' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    // The component passes the event `onChange={onChange}` to the input.
    // The browser/React handles event.target.value (string) and event.target.valueAsNumber (number)
    expect(defaultProps.onChange.mock.calls[0][0].target.value).toBe('456');
  });

  test('associates label with input using htmlFor and id', () => {
    render(<NumberInput {...defaultProps} />);
    const inputElement = screen.getByLabelText(defaultProps.label);
    expect(inputElement.id).toBe(defaultProps.label);
  });

  test('input type is "number"', () => {
    render(<NumberInput {...defaultProps} />);
    const inputElement = screen.getByLabelText(defaultProps.label);
    expect(inputElement).toHaveAttribute('type', 'number');
  });

  test('handles empty string value correctly (e.g., when user deletes input)', () => {
    render(<NumberInput {...defaultProps} value={123} />);
    const inputElement = screen.getByLabelText('Test Number Input');
    fireEvent.change(inputElement, { target: { value: '' } });
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange.mock.calls[0][0].target.value).toBe('');
  });
});
