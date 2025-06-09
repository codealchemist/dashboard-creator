import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '../TextInput'; // Adjust path as necessary

describe('TextInput Component', () => {
  const defaultProps = {
    label: 'Test Text Input',
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  test('renders with default props and displays label', () => {
    render(<TextInput {...defaultProps} />);

    const inputElement = screen.getByLabelText('Test Text Input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  test('displays the provided value', () => {
    render(<TextInput {...defaultProps} value="Hello World" />);

    const inputElement = screen.getByLabelText('Test Text Input');
    expect(inputElement).toHaveValue('Hello World');
  });

  test('calls onChange handler when text is entered', () => {
    render(<TextInput {...defaultProps} />);

    const inputElement = screen.getByLabelText('Test Text Input');
    fireEvent.change(inputElement, { target: { value: 'New Text' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    // The component passes the event `onChange={onChange}` to the input.
    expect(defaultProps.onChange.mock.calls[0][0].target.value).toBe('New Text');
  });

  test('associates label with input using htmlFor and id', () => {
    render(<TextInput {...defaultProps} />);
    const inputElement = screen.getByLabelText(defaultProps.label);
    expect(inputElement.id).toBe(defaultProps.label);
  });

  test('input type is "text"', () => {
    render(<TextInput {...defaultProps} />);
    const inputElement = screen.getByLabelText(defaultProps.label);
    expect(inputElement).toHaveAttribute('type', 'text');
  });
});
