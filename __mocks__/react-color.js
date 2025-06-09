// __mocks__/react-color.js
import React from 'react';

export const SketchPicker = ({ color, onChangeComplete }) => {
  const handleChange = (event) => {
    // Simulate the structure of the color object that SketchPicker returns
    onChangeComplete({ hex: event.target.value });
  };
  return (
    <input
      type="text"
      data-testid="mock-sketch-picker"
      value={color}
      onChange={handleChange}
    />
  );
};

// If other components from react-color are used, mock them as well.
// e.g. export const ChromePicker = () => <div>Mock ChromePicker</div>;
