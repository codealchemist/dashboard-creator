// pages/settings.js
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const FormPlaceholder = styled.div`
  margin-top: 20px;
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  color: #777;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingsPage = () => {
  return (
    <PageContainer>
      <Title>Settings</Title>
      <FormPlaceholder>
        <p>Settings form will be here.</p>
      </FormPlaceholder>
    </PageContainer>
  );
};

export default SettingsPage;
