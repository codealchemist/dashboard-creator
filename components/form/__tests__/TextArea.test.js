import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '../TextArea'; // Adjust path as necessary

describe('TextArea Component', () => {
  const defaultProps = {
    label: 'Test Text Area',
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onChange.mockClear();
  });

  test('renders with default props and displays label', () => {
    render(<TextArea {...defaultProps} />);

    const textAreaElement = screen.getByLabelText('Test Text Area');
    expect(textAreaElement).toBeInTheDocument();
    expect(textAreaElement).toHaveValue('');
  });

  test('displays the provided value', () => {
    render(<TextArea {...defaultProps} value="Initial text content." />);

    const textAreaElement = screen.getByLabelText('Test Text Area');
    expect(textAreaElement).toHaveValue('Initial text content.');
  });

  test('calls onChange handler when text is entered', () => {
    render(<TextArea {...defaultProps} />);

    const textAreaElement = screen.getByLabelText('Test Text Area');
    fireEvent.change(textAreaElement, { target: { value: 'New text input.' } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    // The component passes the event `onChange={onChange}` to the textarea.
    expect(defaultProps.onChange.mock.calls[0][0].target.value).toBe('New text input.');
  });

  test('associates label with textarea using htmlFor and id', () => {
    render(<TextArea {...defaultProps} />);
    const textAreaElement = screen.getByLabelText(defaultProps.label);
    expect(textAreaElement.id).toBe(defaultProps.label);
  });

  test('renders as a textarea element', () => {
    render(<TextArea {...defaultProps} />);
    const textAreaElement = screen.getByLabelText(defaultProps.label);
    // Check the role, or could check tagName but role is more accessible-testing oriented
    expect(textAreaElement.tagName.toLowerCase()).toBe('textarea');
  });
});
