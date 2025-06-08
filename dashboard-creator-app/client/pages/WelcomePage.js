import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import anime from 'animejs';

const WelcomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%; // Take full height of its container in App.js
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3.5em;
  color: #2c3e50;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.5em;
  color: #3498db;
  margin-bottom: 40px;
`;

const AnimationCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #ecf0f1;
  border: 5px solid #34495e;
  position: relative; // For positioning animation elements
  overflow: hidden; // Keep animation contained
`;

// Simple placeholder for fire and water elements for animation
const FireElement = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #e74c3c; // Red for fire
  position: absolute;
  bottom: -20px; // Start hidden or partially visible
  left: 50%;
  transform: translateX(-50%);
  opacity: 0; // Start invisible
`;

const WaterElement = styled.div`
  width: 100%;
  height: 0%; // Starts with no height
  background-color: #3498db; // Blue for water
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.8;
`;

const WelcomePage = () => {
  const fireRef = useRef(null);
  const waterRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000
    });

    tl.add({
      targets: fireRef.current,
      opacity: [0, 1],
      bottom: ['-20px', '20px'], // Rise up
      scale: [0.5, 1.2],
      duration: 800,
      changeBegin: () => { if(fireRef.current) fireRef.current.style.borderBottomColor = '#e74c3c'; }, // Ensure color
    })
    .add({
      targets: fireRef.current, // Flame flicker
      keyframes: [
        { scale: 1.2, duration: 150 },
        { scale: 1, duration: 150 },
        { scale: 1.3, duration: 150 },
        { scale: 1.1, duration: 150 }
      ],
      loop: 2,
      easing: 'easeInOutSine',
      direction: 'alternate',
    }, '-=400') // Overlap with rise
    .add({
      targets: waterRef.current,
      height: ['0%', '100%'], // Water rises to fill
      opacity: [0.5, 0.8],
      duration: 1200,
      easing: 'easeInOutQuad',
    }, '+=200') // Start after fire is visible
    .add({
      targets: fireRef.current,
      opacity: 0, // Fire fades out
      scale: 0.5,
      duration: 600,
      changeComplete: () => { if(fireRef.current) fireRef.current.style.borderBottomColor = '#bdc3c7'; }, // "Ash" color
    }, '-=800') // Overlap with water rise
    .add({
      targets: circleRef.current,
      borderColor: ['#34495e', '#27ae60'], // Circle border turns green (success)
      duration: 500
    })
    .add({
      targets: waterRef.current,
      opacity: 0, // Water fades out
      duration: 1000,
    }, '-=300');


    return () => {
      anime.remove(fireRef.current);
      anime.remove(waterRef.current);
      anime.remove(circleRef.current);
    };
  }, []);

  return (
    <WelcomeContainer id="welcome">
      <Title>Dashboard Creator</Title>
      <Subtitle>Our quick lane to onboard customers 🚀</Subtitle>
      <AnimationCircle ref={circleRef}>
        <FireElement ref={fireRef} />
        <WaterElement ref={waterRef} />
      </AnimationCircle>
    </WelcomeContainer>
  );
};

export default WelcomePage;
