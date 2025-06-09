import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../Dropdown'; // Adjust path as necessary

describe('Dropdown Component', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const defaultProps = {
    label: 'Test Dropdown',
    value: 'option1',
    onChange: jest.fn(),
    options: defaultOptions,
  };

  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  test('renders with default props and displays label', () => {
    render(<Dropdown {...defaultProps} />);

    expect(screen.getByLabelText('Test Dropdown')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
  });

  test('renders all options', () => {
    render(<Dropdown {...defaultProps} />);

    defaultOptions.forEach(option => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
    });
  });

  test('calls onChange handler when a new option is selected', () => {
    render(<Dropdown {...defaultProps} />);

    const selectElement = screen.getByLabelText('Test Dropdown');
    fireEvent.change(selectElement, { target: { value: 'option2' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    // The event object's target.value would be 'option2'
    // Ensure your component's onChange prop expects the event or just the value.
    // The component passes the event `onChange={onChange}` to the select.
    expect(defaultProps.onChange.mock.calls[0][0].target.value).toBe('option2');
  });

  test('displays the correct selected value', () => {
    render(<Dropdown {...defaultProps} value="option3" />);

    const selectElement = screen.getByLabelText('Test Dropdown');
    expect(selectElement.value).toBe('option3');
    expect(screen.getByDisplayValue('Option 3')).toBeInTheDocument();
  });

  test('associates label with select input using htmlFor and id', () => {
    render(<Dropdown {...defaultProps} />);
    const selectElement = screen.getByLabelText(defaultProps.label);
    expect(selectElement.id).toBe(defaultProps.label);
  });

  test('renders with an empty options array without errors', () => {
    render(<Dropdown {...defaultProps} options={[]} />);
    const selectElement = screen.getByLabelText('Test Dropdown');
    expect(selectElement.children.length).toBe(0); // No option elements
  });
});
