import React from 'react'; // Removed useState
import Head from 'next/head';
import { useDashboard } from '../context/DashboardContext'; // Import useDashboard
import {
  PageContainer, SectionTitle, Form, FormGroup, Label, Input, Select,
  CheckboxContainer, CheckboxInput, Panel, ColorInputContainer,
  ArrayInputContainer, ArrayItemContainer, Button
} from '../components/forms/StyledFormElements';

// PrettifyName (assuming it's defined or imported correctly)
const prettifyName = (name) => {
  let tempName = name;
  if (tempName.startsWith('_')) { tempName = tempName.substring(1); }
  const prefixesToRemove = ['props_currentWeatherProps_', 'props_shift_', 'props_', 'battalionChief_'];
  for (const prefix of prefixesToRemove) { if (tempName.startsWith(prefix)) { tempName = tempName.replace(prefix, ''); break; }}
  const result = tempName.replace(/([A-Z])/g, ' \$1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const PanelPage = () => {
  const { config, updatePanel } = useDashboard(); // Use context
  const panelData = config.panel; // Get panel data from context

  const handleChange = (e, index, field, subField) => {
    const { name, value, type, checked } = e.target;
    let newPanelData = { ...panelData };

    if (field === 'props_shift_items') {
      const newItems = panelData.props_shift_items.map((item, i) =>
        i === index ? { ...item, [subField]: type === 'checkbox' ? checked : value } : item
      );
      newPanelData = { ...newPanelData, props_shift_items: newItems };
    } else if (field === 'battalionChief_battalionTitles') {
      const newTitles = [...panelData.battalionChief_battalionTitles];
      newTitles[index] = value;
      newPanelData = { ...newPanelData, battalionChief_battalionTitles: newTitles };
    } else {
      newPanelData = { ...newPanelData, [name]: type === 'checkbox' ? checked : value };
    }
    updatePanel(newPanelData);
  };

  const handleColorInputChange = (name, colorValue) => {
     updatePanel({ ...panelData, [name]: colorValue });
  };

  const handleShiftItemColorChange = (index, colorValue) => {
    const newItems = panelData.props_shift_items.map((item, i) =>
      i === index ? { ...item, color: colorValue } : item
    );
    updatePanel({ ...panelData, props_shift_items: newItems });
  };

  const addShiftItem = () => {
    updatePanel({ ...panelData, props_shift_items: [...panelData.props_shift_items, { value: '', color: '#000000' }] });
  };
  const removeShiftItem = (index) => {
    updatePanel({ ...panelData, props_shift_items: panelData.props_shift_items.filter((_, i) => i !== index) });
  };
  const addBattalionTitle = () => {
    updatePanel({ ...panelData, battalionChief_battalionTitles: [...panelData.battalionChief_battalionTitles, ''] });
  };
  const removeBattalionTitle = (index) => {
    updatePanel({ ...panelData, battalionChief_battalionTitles: panelData.battalionChief_battalionTitles.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => { e.preventDefault(); console.log('Panel Data (from context):', panelData); };

  const renderBooleanProp = (key) => (<CheckboxContainer key={key}><CheckboxInput name={key} id={key} checked={!!panelData[key]} onChange={handleChange} /><Label htmlFor={key}>{prettifyName(key)}</Label></CheckboxContainer>);
  const renderColorProp = (key, label) => (<FormGroup key={key}><Label htmlFor={key}>{label || prettifyName(key)}</Label><ColorInputContainer><Input type="text" name={key} id={key} value={panelData[key]} onChange={handleChange} /><Input type="color" value={panelData[key]} onChange={(e) => handleColorInputChange(key, e.target.value)} /></ColorInputContainer></FormGroup>);

  return (
    <><Head><title>Panel - Dashboard Creator</title></Head>
      <PageContainer><SectionTitle>Panel Configuration</SectionTitle>
        <Form onSubmit={handleSubmit}>
          {/* Position Select */}
          <FormGroup><Label htmlFor="position">{prettifyName('position')}</Label>
            <Select name="position" id="position" value={panelData.position} onChange={handleChange}>
              {[{label: "Left", value: "left"}, {label: "Right", value: "right"}, {label: "Top", value: "top"}, {label: "Bottom", value: "bottom"}].map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </Select>
          </FormGroup>
          {/* Main Props Panel */}
          <Panel><legend>{prettifyName('props_main')}</legend>
            {renderBooleanProp('props_useBattalionChief')}
            <FormGroup><Label htmlFor="props_pillTitle">{prettifyName('props_pillTitle')}</Label><Input type="text" name="props_pillTitle" id="props_pillTitle" value={panelData.props_pillTitle} onChange={handleChange} /></FormGroup>
            {renderBooleanProp('props_surfFlagStatus')} {renderBooleanProp('props_useFlagStatus')} {renderBooleanProp('props_showWindCompass')} {renderBooleanProp('props_hideForecastPanel')}
            <FormGroup><Label htmlFor="props_timeDiff">{prettifyName('props_timeDiff')} (Number)</Label><Input type="number" name="props_timeDiff" id="props_timeDiff" value={panelData.props_timeDiff} onChange={handleChange} /></FormGroup>
            {renderBooleanProp('props_useWeather')} {renderColorProp('props_bgColor', 'Background Color')} {renderColorProp('props_textColor', 'Text Color')} {renderBooleanProp('props_useDate')} {renderBooleanProp('props__useBackgroundImage')}
            <FormGroup><Label htmlFor="props_agencyHash">{prettifyName('props_agencyHash')} (URL)</Label><Input type="url" name="props_agencyHash" id="props_agencyHash" value={panelData.props_agencyHash} onChange={handleChange} placeholder="https://example.com" /></FormGroup>
            {renderBooleanProp('props__useLogoWidth')} {renderBooleanProp('props__useSecondAgencyHash')} {renderBooleanProp('props__useMottoFontSize')} {renderBooleanProp('props__usePillTextColor')} {renderBooleanProp('props__usePillBorderColor')} {renderBooleanProp('props__usePillBackgroundColor')}
            <FormGroup><Label htmlFor="props_dateTimeFormat">{prettifyName('props_dateTimeFormat')}</Label><Input type="text" name="props_dateTimeFormat" id="props_dateTimeFormat" value={panelData.props_dateTimeFormat} onChange={handleChange} placeholder="e.g., YYYY-MM-DD HH:mm" /></FormGroup>
            {renderBooleanProp('props__customizeClockFontSize')} {renderBooleanProp('props__useStationName')} {renderBooleanProp('props__useStationNameFontSize')} {renderBooleanProp('props__enableShift')} {renderBooleanProp('props__enableShift2')}
          </Panel>
          {/* Current Weather Props Panel */}
          <Panel><legend>{prettifyName('props_currentWeatherProps_title')}</legend>
            {renderBooleanProp('props_currentWeatherProps_showHumidity')} {renderBooleanProp('props_currentWeatherProps_showWind')} {renderBooleanProp('props_currentWeatherProps_showWindDirection')} {renderBooleanProp('props_currentWeatherProps_showHeatIndex')}
          </Panel>
          {/* Shift Props Panel */}
          <Panel><legend>{prettifyName('props_shift_title')}</legend>
            <FormGroup><Label htmlFor="props_shift_prefix">{prettifyName('props_shift_prefix')}</Label><Input type="text" name="props_shift_prefix" id="props_shift_prefix" value={panelData.props_shift_prefix} onChange={handleChange} /></FormGroup>
            <FormGroup><Label htmlFor="props_shift_sufix">{prettifyName('props_shift_sufix')}</Label><Input type="text" name="props_shift_sufix" id="props_shift_sufix" value={panelData.props_shift_sufix} onChange={handleChange} /></FormGroup>
            {renderBooleanProp('props_shift_ignoreDaylightSavings')} {renderColorProp('props_shift_defaultColor', 'Default Color')} {renderBooleanProp('props_shift_sameColorAsShiftLetter')} {renderColorProp('props_shift_prefixColor', 'Prefix Color')}
            <FormGroup><Label htmlFor="props_shift_start">{prettifyName('props_shift_start')} (Date Time)</Label><Input type="datetime-local" name="props_shift_start" id="props_shift_start" value={panelData.props_shift_start} onChange={handleChange} /></FormGroup>
            <Label style={{marginTop: '10px', fontWeight: '600'}}>{prettifyName('props_shift_items_title')}</Label>
            <ArrayInputContainer>
              {panelData.props_shift_items.map((item, index) => (
                <ArrayItemContainer key={index}>
                  <FormGroup style={{flex: 1}}><Label htmlFor={`props_shift_item_value_${index}`}>{prettifyName('value')}</Label><Input type="text" name={`props_shift_item_value_${index}`} id={`props_shift_item_value_${index}`} value={item.value} onChange={(e) => handleChange(e, index, 'props_shift_items', 'value')} /></FormGroup>
                  <FormGroup style={{minWidth: '180px'}}><Label htmlFor={`props_shift_item_color_${index}`}>{prettifyName('color')}</Label><ColorInputContainer><Input type="text" name={`props_shift_item_color_${index}`} id={`props_shift_item_color_${index}`} value={item.color} onChange={(e) => handleChange(e, index, 'props_shift_items', 'color')} style={{minWidth: '80px', flexGrow:0}}/><Input type="color" value={item.color} onChange={(e) => handleShiftItemColorChange(index, e.target.value)} /></ColorInputContainer></FormGroup>
                  <Button type="button" className="remove" onClick={() => removeShiftItem(index)} style={{alignSelf: 'flex-end', marginBottom: '8px'}}>Remove</Button>
                </ArrayItemContainer>
              ))}
              <Button type="button" className="add" onClick={addShiftItem}>Add Shift Item</Button>
            </ArrayInputContainer>
          </Panel>
          {/* Battalion Chief Panel */}
          <Panel><legend>{prettifyName('battalionChief_title')}</legend>
            <FormGroup><Label>{prettifyName('battalionChief_battalionTitles')} (Array of Strings)</Label>
              <ArrayInputContainer>
                {panelData.battalionChief_battalionTitles.map((title, index) => (
                  <ArrayItemContainer key={index}>
                    <Input type="text" value={title} onChange={(e) => handleChange(e, index, 'battalionChief_battalionTitles')} placeholder={`Title ${index + 1}`} style={{flexGrow: 1}}/>
                    <Button type="button" className="remove" onClick={() => removeBattalionTitle(index)}>Remove</Button>
                  </ArrayItemContainer>
                ))}
                <Button type="button" className="add" onClick={addBattalionTitle}>Add Battalion Title</Button>
              </ArrayInputContainer>
            </FormGroup>
          </Panel>
        </Form>
      </PageContainer>
    </>
  );
};
export default PanelPage;
