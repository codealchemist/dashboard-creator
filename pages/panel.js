import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../components/form/Checkbox';
import ColorPicker from '../components/form/ColorPicker';
import Dropdown from '../components/form/Dropdown';
import TextInput from '../components/form/TextInput';
import NumberInput from '../components/form/NumberInput';
import TextArea from '../components/form/TextArea';

const PanelWrapper = styled.div`
  padding: 30px; /* Increased padding */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font stack */
  background-color: #f9f9f9; /* Light background for the whole page */
  max-width: 800px; /* Max width for better readability */
  margin: 0 auto; /* Center the form */
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); /* Subtle shadow for the panel */
  border-radius: 8px;
`;

const MainTitle = styled.h1`
  text-align: center;
  color: #2c3e50; /* Dark blue-gray */
  margin-bottom: 30px;
  font-size: 2rem;
`;

const Section = styled.div.attrs(props => ({
  // Add a known class name, ensuring to append to existing if any
  // Also, forward the data-testid prop if it exists, so it's applied to the DOM element
  className: [props.className, 'self-ref-section'].filter(Boolean).join(' '),
  'data-testid': props['data-testid']
}))`
  margin-bottom: 30px; /* Increased margin */
  padding: 20px; /* Increased padding */
  border: 1px solid #ddd; /* Slightly darker border */
  border-radius: 8px; /* More rounded corners */
  background-color: #fff; /* White background for sections */
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);

  /* Target nested sections using the added class */
  & > .self-ref-section {
    margin-top: 15px; /* As per request */
    border: 1px solid #eee; /* As per request */
    background-color: #fdfdfd; /* As per request */
    box-shadow: none; /* As per request */
  }
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  font-size: 1.4rem; /* Increased font size */
  color: #34495e; /* Darker, more saturated blue-gray */
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const initialFormState = {
  title: 'Default Title',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  emergencyMode: false,
  emergencyMessage: '',
  currentWeatherProps: {
    show: true,
    backgroundColor: '#f0f0f0',
    textColor: '#333333',
    majorFont: 'Arial',
    majorFontSize: 24,
    majorFontColor: '#111111',
    minorFont: 'Arial',
    minorFontSize: 16,
    minorFontColor: '#222222',
  },
  battalionChief: {
    show: true,
    name: 'Chief Name',
    unit: 'Unit ID',
    battalionTitles: ['Title 1', 'Title 2'], // Represented as comma-separated string for TextArea
  },
  shift: {
    show: true,
    position: 'left', // 'left', 'right', 'bottom', 'top'
    items: ['Item A', 'Item B', 'Item C'], // Represented as comma-separated string for TextArea
  },
  ticker: {
    show: true,
    behavior: 'scroll', // 'scroll', 'slide', 'alternate' - Handled by TextInput for now
    backgroundColor: '#cccccc',
    textColor: '#000000',
    text: 'This is a default ticker message.',
    speed: 5, // 1-10
  },
};

const PanelForm = () => {
  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (section, field) => (e) => {
    const value = e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    if (section) {
      setFormState((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleColorChange = (section, field) => (color) => {
    if (section) {
      setFormState((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: color,
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [field]: color,
      }));
    }
  };

  const positionOptions = [
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'top', label: 'Top' },
  ];

  return (
    <PanelWrapper>
      <MainTitle>Panel Configuration</MainTitle>

      <Section data-testid="section-General">
        <SectionTitle>General</SectionTitle>
        <TextInput label="Title" value={formState.title} onChange={handleChange(null, 'title')} />
        <ColorPicker label="Background Color" value={formState.backgroundColor} onChange={handleColorChange(null, 'backgroundColor')} />
        <ColorPicker label="Text Color" value={formState.textColor} onChange={handleColorChange(null, 'textColor')} />
        <Checkbox label="Emergency Mode" value={formState.emergencyMode} onChange={handleChange(null, 'emergencyMode')} />
        <TextInput label="Emergency Message" value={formState.emergencyMessage} onChange={handleChange(null, 'emergencyMessage')} />
      </Section>

      <Section data-testid="section-CurrentWeather">
        <SectionTitle>Current Weather</SectionTitle>
        <Checkbox label="Show Current Weather" value={formState.currentWeatherProps.show} onChange={handleChange('currentWeatherProps', 'show')} />
        <ColorPicker label="Background Color" value={formState.currentWeatherProps.backgroundColor} onChange={handleColorChange('currentWeatherProps', 'backgroundColor')} />
        <ColorPicker label="Text Color" value={formState.currentWeatherProps.textColor} onChange={handleColorChange('currentWeatherProps', 'textColor')} />
        <TextInput label="Major Font" value={formState.currentWeatherProps.majorFont} onChange={handleChange('currentWeatherProps', 'majorFont')} />
        <NumberInput label="Major Font Size" value={formState.currentWeatherProps.majorFontSize} onChange={handleChange('currentWeatherProps', 'majorFontSize')} />
        <ColorPicker label="Major Font Color" value={formState.currentWeatherProps.majorFontColor} onChange={handleColorChange('currentWeatherProps', 'majorFontColor')} />
        <TextInput label="Minor Font" value={formState.currentWeatherProps.minorFont} onChange={handleChange('currentWeatherProps', 'minorFont')} />
        <NumberInput label="Minor Font Size" value={formState.currentWeatherProps.minorFontSize} onChange={handleChange('currentWeatherProps', 'minorFontSize')} />
        <ColorPicker label="Minor Font Color" value={formState.currentWeatherProps.minorFontColor} onChange={handleColorChange('currentWeatherProps', 'minorFontColor')} />
      </Section>

      <Section data-testid="section-BattalionChief">
        <SectionTitle>Battalion Chief</SectionTitle>
        <Checkbox label="Show Battalion Chief" value={formState.battalionChief.show} onChange={handleChange('battalionChief', 'show')} />
        <TextInput label="Name" value={formState.battalionChief.name} onChange={handleChange('battalionChief', 'name')} />
        <TextInput label="Unit" value={formState.battalionChief.unit} onChange={handleChange('battalionChief', 'unit')} />
        <TextArea
          label="Battalion Titles (comma-separated)"
          value={Array.isArray(formState.battalionChief.battalionTitles) ? formState.battalionChief.battalionTitles.join(', ') : formState.battalionChief.battalionTitles}
          onChange={(e) => {
            const titles = e.target.value.split(',').map(s => s.trim()).filter(s => s);
            handleChange('battalionChief', 'battalionTitles')({ target: { value: titles } });
          }}
        />
      </Section>

      <Section data-testid="section-Shift">
        <SectionTitle>Shift</SectionTitle>
        <Checkbox label="Show Shift Information" value={formState.shift.show} onChange={handleChange('shift', 'show')} />
        <Dropdown label="Position" value={formState.shift.position} onChange={handleChange('shift', 'position')} options={positionOptions} />
        <TextArea
          label="Shift Items (comma-separated)"
          value={Array.isArray(formState.shift.items) ? formState.shift.items.join(', ') : formState.shift.items}
          onChange={(e) => {
            const items = e.target.value.split(',').map(s => s.trim()).filter(s => s);
            handleChange('shift', 'items')({ target: { value: items } });
          }}
        />
      </Section>

      <Section data-testid="section-Ticker">
        <SectionTitle>Ticker</SectionTitle>
        <Checkbox label="Show Ticker" value={formState.ticker.show} onChange={handleChange('ticker', 'show')} />
        <TextInput label="Behavior (scroll, slide, alternate)" value={formState.ticker.behavior} onChange={handleChange('ticker', 'behavior')} />
        <ColorPicker label="Background Color" value={formState.ticker.backgroundColor} onChange={handleColorChange('ticker', 'backgroundColor')} />
        <ColorPicker label="Text Color" value={formState.ticker.textColor} onChange={handleColorChange('ticker', 'textColor')} />
        <TextArea label="Ticker Text" value={formState.ticker.text} onChange={handleChange('ticker', 'text')} />
        <NumberInput label="Speed (1-10)" value={formState.ticker.speed} onChange={handleChange('ticker', 'speed')} />
      </Section>

    </PanelWrapper>
  );
};

export default PanelForm;
