import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnter = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      // Artificial delay for that "scanning" feel
      await new Promise(resolve => setTimeout(resolve, 800));
      navigate('/home', { state: { username } });
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
        style={{
          padding: '60px 40px',
          width: '100%',
          maxWidth: '480px',
          textAlign: 'center',
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
          border: '1px solid var(--border-bright)'
        }}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          style={{ marginBottom: '40px' }}
        >
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 24px',
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-magenta))',
            borderRadius: '24px',
            padding: '2px'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'black',
              borderRadius: '22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img src="/Skull.png" alt="D4 Logo" style={{ width: '45px', height: '45px' }} />
            </div>
          </div>
          
          <h1 className="text-gradient" style={{ 
            fontSize: '3rem', 
            fontWeight: '900', 
            marginBottom: '12px',
            letterSpacing: '0.1em'
          }}>
            D4
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '400' }}>
            A secure portal for the D4 family.
          </p>
        </motion.div>

        <form onSubmit={handleEnter} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="IDENTITY / USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              style={{
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                color: 'white',
                padding: '18px 20px',
                fontSize: '0.9rem',
                fontFamily: 'Space Grotesk',
                letterSpacing: '0.1em',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              className="login-input"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="btn-primary"
            style={{
              padding: '18px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              fontSize: '1rem',
              letterSpacing: '0.05em',
              opacity: (isLoading || !username.trim()) ? 0.5 : 1,
              cursor: (isLoading || !username.trim()) ? 'not-allowed' : 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {isLoading ? (
              <span className="shimmer">ENCRYPTING...</span>
            ) : (
              <>
                ACCESS SYSTEM
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div style={{ 
          marginTop: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px',
          color: 'var(--text-muted)',
          fontSize: '0.8rem'
        }}>
          <ShieldCheck size={14} />
          SECURED BY D4 PROTOCOL v4.0
        </div>
      </motion.div>

      <style>{`
        .login-input:focus {
          border-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.1);
        }
        .shimmer {
          background: linear-gradient(90deg, #fff3, #fff, #fff3);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
