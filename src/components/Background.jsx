import React from 'react';

const SkullIcon = ({ style }) => (
  <img 
    src="/Skull.png" 
    alt="D4 Skull" 
    width="100" 
    height="100" 
    style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))', ...style }} 
  />
);

export default function Background() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0, // Behind the content, but in front of body background
      pointerEvents: 'none' // Allow clicks to pass through to the main content
    }}>
      {/* Container for the dual skulls to keep them horizontally aligned, pushed to edges */}
      <div style={{
        position: 'absolute',
        top: '140px', // Vertically align slightly down from top to match earlier design
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        boxSizing: 'border-box'
      }}>
         <SkullIcon />
         <SkullIcon />
      </div>
    </div>
  );
}
