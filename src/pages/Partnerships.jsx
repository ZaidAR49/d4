import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHandshake } from 'react-icons/fa';

const NavItem = ({ children, active, onClick }) => (
  <div 
    onClick={onClick}
    style={{
      fontFamily: 'Inter, sans-serif',
      fontWeight: '800',
      fontSize: '0.85rem',
      border: '1px solid white',
      backgroundColor: active ? 'white' : 'transparent',
      color: active ? 'black' : 'white',
      padding: '8px 16px',
      cursor: 'pointer',
      letterSpacing: '1px',
      transition: 'all 0.2s ease'
    }}
  >
    {children}
  </div>
);

const PartnerSlot = ({ number }) => (
  <div style={{
    border: '2px solid white',
    height: '240px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  }}>
    <div style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>PARTNER SLOT {number}</div>
    <div style={{ color: '#6b7280', fontSize: '0.7rem', letterSpacing: '1px' }}>COMING SOON</div>
  </div>
);

const FeatureBox = ({ title, desc }) => (
  <div style={{
    border: '1px solid white',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    flex: 1,
    minWidth: '200px',
    textAlign: 'center'
  }}>
    <h3 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</h3>
    <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontFamily: 'monospace' }}>{desc}</p>
  </div>
);

export default function Partnerships() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Guest';

  const navigateTo = (path) => {
    navigate(path, { state: { username }});
  };

  return (
    <div style={{ minHeight: '100vh', color: 'white', position: 'relative', margin: '0px 150px' }}>
      {/* Top Navbar */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 30px',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--magenta)', padding: '5px 15px', color: 'var(--magenta)', fontWeight: 'bold' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--magenta)', borderRadius: '50%' }}></div>
          {username}
        </div>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <NavItem onClick={() => navigateTo('/home')}>HOME</NavItem>
          <NavItem onClick={() => navigateTo('/info')}>D4 INFO</NavItem>
          <NavItem onClick={() => navigateTo('/gaming')}>GAMING</NavItem>
          <NavItem onClick={() => navigateTo('/content')}>CONTENT</NavItem>
          <NavItem active onClick={() => navigateTo('/partnerships')}>PARTNERSHIPS</NavItem>
          <NavItem>MINI GAMES</NavItem>
          <NavItem>SHOP</NavItem>
        </div>

        <div>
           <button className="btn-cyan" style={{ 
             padding: '8px 16px', 
             fontWeight: 'bold', 
             display: 'flex', 
             alignItems: 'center', 
             gap: '8px',
             fontSize: '0.85rem',
             letterSpacing: '1px'
           }}>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
               <circle cx="9" cy="7" r="4"></circle>
               <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
               <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
             </svg>
             MEMBERS (1)
           </button>
         </div>
      </nav>

      <main style={{
        padding: '60px 0 100px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px'
      }}>
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
          <h1 className="text-glow" style={{ 
            fontSize: '4rem', 
            fontWeight: '900', 
            letterSpacing: '3px',
            textTransform: 'uppercase',
            lineHeight: '1.1'
          }}>
            PARTNERSHIPS
          </h1>
          
          <p style={{ 
            color: '#a3b8cc',
            fontFamily: 'monospace', 
            fontSize: '1rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginTop: '10px'
          }}>
            EXPLORE OUR PARTNER DISCORD COMMUNITIES
          </p>
        </div>

        {/* Partner Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          width: '100%',
          maxWidth: '1200px'
        }}>
          {[1,2,3,4,5,6].map(num => <PartnerSlot key={num} number={num} />)}
        </div>

        {/* Become a Partner Banner */}
        <div style={{
          border: '2px solid white',
          padding: '30px 40px',
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <FaHandshake size={45} color="white" />
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                BECOME A PARTNER
              </h2>
              <p style={{ color: '#a3b8cc', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                Grow your community with us
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => window.open('https://discord.gg/kkfSZW9Z5x', '_blank')}
            style={{
            backgroundColor: 'white',
            color: 'black',
            fontWeight: '900',
            fontSize: '1rem',
            letterSpacing: '1px',
            padding: '16px 36px',
            border: 'none',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
          }}>
            APPLY NOW
          </button>
        </div>

        {/* Info Grid at the bottom */}
        <div style={{
          display: 'flex',
          gap: '20px',
          width: '100%',
          maxWidth: '1200px',
          flexWrap: 'wrap'
        }}>
          <FeatureBox 
            title="CROSS PROMOTION"
            desc="Reach new audiences"
          />
          <FeatureBox 
            title="JOINT EVENTS"
            desc="Collaborate on activities"
          />
          <FeatureBox 
            title="EXCLUSIVE ACCESS"
            desc="Partner-only channels"
          />
        </div>

      </main>
    </div>
  );
}
