import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

const ColorPickerWrapper = styled.div`
  margin-bottom: 15px; /* Increased margin */
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px; /* Increased space below label */
  font-size: 1rem;
  color: #333; /* Darker label color */
  font-weight: bold;
`;

const SketchPickerWrapper = styled.div.attrs(() => ({
  'data-testid': 'color-picker-wrapper',
}))`
  padding: 5px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
  display: inline-block;
  cursor: pointer;
`;

const ColorSwatch = styled.div`
  width: 100%;
  padding: 5px;
  background: ${({ color }) => color};
  border-radius: 2px;
  height: 20px; // Give swatch a height
  border: 1px solid #ccc; // Add a border to swatch
`;


const ColorPicker = ({ label, value, onChange }) => {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChangeComplete = (color) => {
    onChange(color.hex);
  };

  const popover = {
    position: 'absolute',
    zIndex: '2',
  };
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  return (
    <ColorPickerWrapper>
      <Label>{label}</Label>
      <SketchPickerWrapper onClick={handleClick} role="button" tabIndex={0} aria-pressed={displayColorPicker}>
        <ColorSwatch color={value} />
      </SketchPickerWrapper>
      {displayColorPicker ? (
        <div style={popover}>
          <div style={cover} onClick={handleClose} />
          <SketchPicker color={value} onChangeComplete={handleChangeComplete} />
        </div>
      ) : null}
    </ColorPickerWrapper>
  );
};

export default ColorPicker;
