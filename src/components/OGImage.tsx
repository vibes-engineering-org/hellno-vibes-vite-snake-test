import React from 'react';
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from '../constants';

interface OGImageProps {
  width?: number;
  height?: number;
}

export const OGImage: React.FC<OGImageProps> = ({ width = 1200, height = 630 }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008080',
        backgroundImage: 'linear-gradient(45deg, #008080 25%, transparent 25%), linear-gradient(-45deg, #008080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #008080 75%), linear-gradient(-45deg, transparent 75%, #008080 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        fontFamily: 'Arial, sans-serif',
        color: 'white',
        position: 'relative',
        border: '4px solid #c0c0c0',
        boxShadow: 'inset -2px -2px #808080, inset 2px 2px #dfdfdf'
      }}
    >
      {/* Windows XP-style title bar */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '32px',
          background: 'linear-gradient(to bottom, #0997ff 0%, #0053ee 100%)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8px',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {PROJECT_TITLE}
      </div>

      {/* Main content area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 40px 40px 40px',
          backgroundColor: '#ece9d8',
          color: '#000',
          margin: '32px 8px 8px 8px',
          flex: 1,
          border: '2px inset #ece9d8'
        }}
      >
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '0 0 20px 0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            maxWidth: '630px',
            lineHeight: '1.2'
          }}
        >
          {PROJECT_TITLE}
        </h1>
        
        <p
          style={{
            fontSize: '28px',
            margin: '0',
            maxWidth: '630px',
            lineHeight: '1.4',
            color: '#333'
          }}
        >
          {PROJECT_DESCRIPTION}
        </p>

        {/* Decorative snake-like pattern */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '40px'
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#00aa00',
                border: '2px solid #006600',
                borderRadius: '2px'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};