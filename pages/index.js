// pages/index.js
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px); // Adjust if header/footer height changes
  padding: 40px 20px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const MainTitle = styled.h1`
  font-size: 3.5em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 15px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1.5em;
  color: ${({ theme }) => theme.colors.secondary}; /* Using secondary theme color for emphasis */
  margin-bottom: 30px;
`;

const CTAButton = styled.a`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 15px 30px;
  text-decoration: none;
  font-size: 1.2em;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.accent}; /* Using accent color on hover */
    cursor: pointer;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 50px;
  width: 100%;
  max-width: 1000px;
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.5s ease-out forwards;
  opacity: 0;
  &:nth-child(1) { animation-delay: 0.2s; }
  &:nth-child(2) { animation-delay: 0.4s; }
  &:nth-child(3) { animation-delay: 0.6s; }

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 10px;
  }

  p {
    font-size: 0.95em;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }
`;


const HomePage = () => {
  return (
    <PageContainer>
      <MainTitle>Dashboard Creator</MainTitle>
      <Subtitle>Our quick lane to onboard customers 🚀</Subtitle>
      {/* Updated Link href below */}
      <Link href="/settings" passHref>
        <CTAButton>Get Started</CTAButton>
      </Link>
      <FeaturesGrid>
        <FeatureCard>
          <h3>Modern Interface</h3>
          <p>Sleek, intuitive design for the best user experience.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Easy Customization</h3>
          <p>Tailor dashboards to your exact needs with powerful tools.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Fast & Responsive</h3>
          <p>Built with Next.js for speed and optimal performance on all devices.</p>
        </FeatureCard>
      </FeaturesGrid>
    </PageContainer>
  );
};

export default HomePage;
