import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import anime from 'animejs/lib/anime.es.js';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%; // Take full height of its container in Layout.js
  min-height: calc(100vh - 100px); // Adjust based on Layout padding/margin
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3.8em;
  color: #2c3e50; // Dark blue/grey
  margin-bottom: 15px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 1.6em;
  color: #3498db; // Blue
  margin-bottom: 50px;
`;

const AnimationCircle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-color: #dfe6e9; // Light grey background for circle
  border: 6px solid #34495e; // Dark border
  position: relative;
  overflow: hidden;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
`;

// Simplified fire and water elements for animation
const FireElement = styled.div`
  width: 0;
  height: 0;
  border-left: 55px solid transparent;
  border-right: 55px solid transparent;
  border-bottom: 110px solid #e74c3c; // Red for fire
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
`;

const WaterElement = styled.div`
  width: 100%;
  height: 0%;
  background-color: #3498db; // Blue for water
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0; // Start with 0 opacity, fade in
`;

export default function WelcomePage() {
  const fireRef = useRef(null);
  const waterRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200 // Default duration for timeline tweens
    });

    tl.add({
      targets: fireRef.current,
      opacity: [0, 1],
      bottom: ['-25px', '30px'], // Rise up
      scale: [0.6, 1.2],
      duration: 900,
    })
    .add({
      targets: fireRef.current, // Flame flicker
      keyframes: [
        { scale: 1.2, duration: 150 },
        { scale: 1, duration: 150 },
        { scale: 1.25, duration: 150 },
        { scale: 1.05, duration: 150 }
      ],
      loop: 3,
      easing: 'easeInOutSine',
      direction: 'alternate',
    }, '-=500') // Overlap with rise
    .add({
      targets: waterRef.current,
      height: ['0%', '100%'],
      opacity: [0, 0.85], // Fade in water
      duration: 1300,
      easing: 'easeInOutQuad',
    }, '+=300') // Start after fire is more visible
    .add({
      targets: fireRef.current,
      opacity: 0,
      scale: 0.4,
      duration: 700,
      easing: 'easeInExpo',
    }, '-=900') // Overlap with water rise, fire starts to extinguish
    .add({
      targets: circleRef.current,
      borderColor: ['#34495e', '#27ae60'], // Circle border turns green (success)
      duration: 600,
      easing: 'easeInOutSine'
    }, '-=200')
    .add({
      targets: waterRef.current,
      opacity: 0, // Water fades out
      duration: 1000,
      easing: 'easeOutQuad'
    }, '-=400'); // Overlap with border change


    // Cleanup function
    return () => {
      anime.remove([fireRef.current, waterRef.current, circleRef.current]);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Head>
        <title>Welcome - Dashboard Creator</title>
        <meta name="description" content="Modern eye-catching app with beautiful transitions." />
      </Head>
      <WelcomeContainer>
        <Title>Dashboard Creator</Title>
        <Subtitle>Our quick lane to onboard customers 🚀</Subtitle>
        <AnimationCircle ref={circleRef}>
          <FireElement ref={fireRef} />
          <WaterElement ref={waterRef} />
        </AnimationCircle>
      </WelcomeContainer>
    </>
  );
}
