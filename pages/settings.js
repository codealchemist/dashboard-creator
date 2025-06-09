// pages/settings.js
import React from 'react'; // Removed useState, using context now
import styled from 'styled-components';
import { useSettings } from '../context/SettingsContext'; // Import useSettings

const PageContainer = styled.div`
  padding: 20px;
  @media (min-width: 768px) {
    padding: 40px;
  }
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px; // Add some bottom margin to each group for better separation
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  width: 100%; // Ensure input takes full width of FormGroup
  box-sizing: border-box; // Ensure padding doesn't add to width
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%; // Full width on mobile
  margin-top: 20px; // Add margin to separate from the last field

  &:hover {
    background-color: #0056b3;
  }

  @media (min-width: 768px) {
    width: auto; // Auto width on larger screens
    align-self: flex-end; // Align to the right on larger screens
    padding-left: 30px; // More padding for larger button
    padding-right: 30px;
  }
`;

const SettingsPage = () => {
  const { settings, updateSettingField, initialSettings } = useSettings(); // Use context

  // If settings is undefined (e.g. context not properly loaded yet, though Provider should ensure it),
  // fallback to initialSettings to prevent error during initial render.
  const currentSettings = settings || initialSettings;


  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSettingField(name, value); // Update context state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Data is already in context. This function can be used for feedback or other actions.
    console.log('Settings saved (already in context):', currentSettings);
    // Example of processing stations for logging, similar to before:
    const processedStations = currentSettings['info.stations']
      .split(',')
      .map(s => s.trim())
      .filter(s => s);
    console.log('Processed stations for logging:', processedStations);
    // alert('Settings saved!'); // Optional: provide user feedback
  };

  return (
    <PageContainer>
      <Title>Settings</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="faDashboardsApi.user">FA Dashboards API User</Label>
          <Input
            type="text"
            id="faDashboardsApi.user"
            name="faDashboardsApi.user"
            value={currentSettings['faDashboardsApi.user']}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="faDashboardsApi.pass">FA Dashboards API Password</Label>
          <Input
            type="password"
            id="faDashboardsApi.pass"
            name="faDashboardsApi.pass"
            value={currentSettings['faDashboardsApi.pass']}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="playerUuid">Player UUID</Label>
          <Input
            type="text"
            id="playerUuid"
            name="playerUuid"
            value={currentSettings.playerUuid}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="address">Address</Label>
          <Input
            type="text"
            id="address"
            name="address"
            value={currentSettings.address}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="city">City</Label>
          <Input
            type="text"
            id="city"
            name="city"
            value={currentSettings.city}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="state">State</Label>
          <Input
            type="text"
            id="state"
            name="state"
            value={currentSettings.state}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="country">Country</Label>
          <Input
            type="text"
            id="country"
            name="country"
            value={currentSettings.country}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="geolocation.lat">Latitude</Label>
          <Input
            type="number"
            id="geolocation.lat"
            name="geolocation.lat"
            value={currentSettings['geolocation.lat']}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="geolocation.lon">Longitude</Label>
          <Input
            type="number"
            id="geolocation.lon"
            name="geolocation.lon"
            value={currentSettings['geolocation.lon']}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="info.stations">Stations (comma-separated)</Label>
          <Input
            type="text"
            id="info.stations"
            name="info.stations"
            value={currentSettings['info.stations']}
            onChange={handleChange}
            placeholder="e.g., station1,station2,station3"
          />
        </FormGroup>

        <Button type="submit">Save Settings</Button>
      </Form>
    </PageContainer>
  );
};

export default SettingsPage;
