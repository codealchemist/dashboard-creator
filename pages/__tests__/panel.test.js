import React from 'react';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import PanelForm from '../panel'; // Adjust path as necessary

// Mock child components
jest.mock('../../components/form/Checkbox', () => ({ label, value, onChange, id }) => (
  <div>
    <label htmlFor={id || label}>{label}</label>
    <input type="checkbox" id={id || label} checked={value} onChange={onChange} />
  </div>
));
jest.mock('../../components/form/ColorPicker', () => ({ label, value, onChange, id }) => (
  <div>
    <label htmlFor={id || label}>{label}</label>
    <input type="text" id={id || label} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
));
jest.mock('../../components/form/Dropdown', () => ({ label, value, onChange, options, id }) => (
  <div>
    <label htmlFor={id || label}>{label}</label>
    <select id={id || label} value={value} onChange={onChange}>
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </div>
));
jest.mock('../../components/form/TextInput', () => ({ label, value, onChange, id }) => (
  <div>
    <label htmlFor={id || label}>{label}</label>
    <input type="text" id={id || label} value={value} onChange={onChange} />
  </div>
));
jest.mock('../../components/form/NumberInput', () => ({ label, value, onChange, id }) => (
  <div>
    <label htmlFor={id || label}>{label}</label>
    <input type="number" id={id || label} value={value} onChange={onChange} />
  </div>
));
jest.mock('../../components/form/TextArea', () => ({ label, value, onChange, id }) => (
  <div>
    <label htmlFor={id || label}>{label}</label>
    <textarea id={id || label} value={value} onChange={onChange} />
  </div>
));


describe('PanelForm Component', () => {
  test('renders with initial default state', () => {
    render(<PanelForm />);

    // General Section
    const generalSection = screen.getByTestId('section-General');
    expect(within(generalSection).getByLabelText('Title')).toHaveValue('Default Title');
    expect(within(generalSection).getByLabelText('Background Color')).toHaveValue('#ffffff');
    expect(within(generalSection).getByLabelText('Emergency Mode')).not.toBeChecked();

    // Current Weather Section
    const weatherSection = screen.getByTestId('section-CurrentWeather');
    expect(within(weatherSection).getByLabelText('Show Current Weather')).toBeChecked();
    expect(within(weatherSection).getByLabelText('Background Color')).toHaveValue('#f0f0f0');
    expect(within(weatherSection).getByLabelText('Major Font Size')).toHaveValue(24);

    // Shift Section
    const shiftSection = screen.getByTestId('section-Shift');
    expect(within(shiftSection).getByLabelText('Position')).toHaveValue('left');
  });

  test('updates general title field correctly', () => {
    render(<PanelForm />);
    const generalSection = screen.getByTestId('section-General');
    const titleInput = within(generalSection).getByLabelText('Title');
    fireEvent.change(titleInput, { target: { value: 'New Panel Title' } });
    expect(titleInput).toHaveValue('New Panel Title');
  });

  test('updates emergency mode checkbox', () => {
    render(<PanelForm />);
    const generalSection = screen.getByTestId('section-General');
    const emergencyCheckbox = within(generalSection).getByLabelText('Emergency Mode');

    fireEvent.click(emergencyCheckbox); // True
    expect(emergencyCheckbox).toBeChecked();

    fireEvent.click(emergencyCheckbox); // False
    expect(emergencyCheckbox).not.toBeChecked();
  });

  test('updates nested currentWeatherProps backgroundColor and does not affect other sections', () => {
    render(<PanelForm />);
    const weatherSection = screen.getByTestId('section-CurrentWeather');
    const weatherBgColorPicker = within(weatherSection).getByLabelText('Background Color');

    fireEvent.change(weatherBgColorPicker, { target: { value: '#112233' } });
    expect(weatherBgColorPicker).toHaveValue('#112233');

    // Verify other section's color picker is not affected
    const generalSection = screen.getByTestId('section-General');
    const generalBgColorPicker = within(generalSection).getByLabelText('Background Color');
    expect(generalBgColorPicker).toHaveValue('#ffffff'); // Initial value from default state

    const tickerSection = screen.getByTestId('section-Ticker');
    const tickerBgColorPicker = within(tickerSection).getByLabelText('Background Color');
    expect(tickerBgColorPicker).toHaveValue('#cccccc'); // Initial value from default state
  });

  test('updates nested currentWeatherProps majorFontSize', () => {
    render(<PanelForm />);
    const weatherSection = screen.getByTestId('section-CurrentWeather');
    const majorFontSizeInput = within(weatherSection).getByLabelText('Major Font Size');
    fireEvent.change(majorFontSizeInput, { target: { value: '30' } });
    expect(majorFontSizeInput).toHaveValue(30);
  });

  test('updates shift position dropdown', () => {
    render(<PanelForm />);
    const shiftSection = screen.getByTestId('section-Shift');
    const positionDropdown = within(shiftSection).getByLabelText('Position');
    fireEvent.change(positionDropdown, { target: { value: 'right' } });
    expect(positionDropdown).toHaveValue('right');
  });

  test('handles battalionChief.battalionTitles array input (TextArea conversion)', async () => {
    render(<PanelForm />);
    const bcSection = screen.getByTestId('section-BattalionChief');
    const titlesTextArea = within(bcSection).getByLabelText('Battalion Titles (comma-separated)');

    await act(async () => {
      fireEvent.change(titlesTextArea, { target: { value: 'Chief 1, Battalion Chief 2, BC3' } });
    });
    expect(titlesTextArea).toHaveValue('Chief 1, Battalion Chief 2, BC3');
    // Note: Direct state inspection for array conversion is outside this test's scope.
    // We confirm the input receives value and onChange is wired.
  });

   test('handles shift.items array input (TextArea conversion)', async () => {
    render(<PanelForm />);
    const shiftSection = screen.getByTestId('section-Shift');
    const itemsTextArea = within(shiftSection).getByLabelText('Shift Items (comma-separated)');

    await act(async () => {
      fireEvent.change(itemsTextArea, { target: { value: 'Alpha, Bravo, Charlie' } });
    });
    expect(itemsTextArea).toHaveValue('Alpha, Bravo, Charlie');
  });

  test('ticker speed updates', () => {
    render(<PanelForm />);
    const tickerSection = screen.getByTestId('section-Ticker');
    const tickerSpeedInput = within(tickerSection).getByLabelText('Speed (1-10)');
    fireEvent.change(tickerSpeedInput, { target: { value: '7' } });
    expect(tickerSpeedInput).toHaveValue(7);
  });
});
