import React from 'react'; // Removed useEffect, useRef
import Head from 'next/head';
import styled from 'styled-components';
// import anime from 'animejs'; // REMOVED

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  min-height: calc(100vh - 100px);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3.8em;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 1.6em;
  color: #3498db;
  margin-bottom: 50px;
`;

const AnimationCircle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-color: #dfe6e9;
  border: 6px solid #34495e;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  // FireElement and WaterElement would have been inside here.
  // It's now an empty circle.
  display: flex; // To center content if any was added later
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
  color: #555;
`;

// const FireElement = styled.div`...\`; // REMOVED
// const WaterElement = styled.div\`...\`; // REMOVED

export default function WelcomePage() {
  // const fireRef = useRef(null); // REMOVED
  // const waterRef = useRef(null); // REMOVED
  // const circleRef = useRef(null); // REMOVED

  // useEffect for animejs animation REMOVED

  return (
    <>
      <Head>
        <title>Welcome - Dashboard Creator</title>
        <meta name="description" content="Modern eye-catching app." />
      </Head>
      <WelcomeContainer>
        <Title>Dashboard Creator</Title>
        <Subtitle>Our quick lane to onboard customers 🚀</Subtitle>
        <AnimationCircle>
          {/* Content of the circle is now empty. Could add static text or an SVG later if desired. */}
          Circle
        </AnimationCircle>
      </WelcomeContainer>
    </>
  );
}
