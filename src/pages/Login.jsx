import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleEnter = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate('/home', { state: { username } });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#000' }}>
      <div 
        className="box-glow"
        style={{
          border: '2px solid white',
          padding: '40px',
          width: '100%',
          maxWidth: '450px',
          textAlign: 'center',
          backgroundColor: '#000'
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '10px', letterSpacing: '1px' }}>
          WELCOME TO D4
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '30px', fontFamily: 'monospace' }}>
          Enter your username to get started
        </p>

        <form onSubmit={handleEnter} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-magenta"
            style={{
              backgroundColor: '#000',
              color: 'white',
              padding: '15px',
              fontSize: '1rem',
              fontFamily: 'monospace'
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#050505',
              border: '2px solid #3b4252',
              color: '#8b949e',
              padding: '15px',
              fontSize: '1rem',
              fontWeight: '700',
              letterSpacing: '1px',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {e.target.style.color='white'; e.target.style.borderColor='#5a6375'}}
            onMouseOut={(e) => {e.target.style.color='#8b949e'; e.target.style.borderColor='#3b4252'}}
          >
            ENTER D4
          </button>
        </form>
      </div>
    </div>
  );
}
