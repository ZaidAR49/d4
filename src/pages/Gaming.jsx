import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

const FeatureBox = ({ icon, title, subtitle }) => (
  <div style={{
    border: '1px solid white',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    flex: 1,
    minWidth: '200px',
    textAlign: 'center'
  }}>
    <div style={{ color: 'white' }}>
      {icon}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</h3>
      <p style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.8rem', textTransform: 'uppercase' }}>{subtitle}</p>
    </div>
  </div>
);

const GameButton = ({ name }) => (
  <div style={{
    border: '1px solid white',
    padding: '15px 20px',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: '0.9rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: 'transparent'
  }}>
    {name}
  </div>
);

const ScheduleBox = ({ tag, title, description }) => (
  <div style={{
    border: '1px solid white',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    flex: 1,
    minWidth: '250px'
  }}>
    <span style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase' }}>{tag}</span>
    <h3 style={{ fontSize: '1.3rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</h3>
    <p style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '0.85rem' }}>{description}</p>
  </div>
);

export default function Gaming() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Guest';

  const navigateTo = (path) => {
    navigate(path, { state: { username }});
  };

  return (
    <div style={{ minHeight: '100vh', color: 'white' }}>
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
          <NavItem active onClick={() => navigateTo('/gaming')}>GAMING</NavItem>
          <NavItem onClick={() => navigateTo('/content')}>CONTENT</NavItem>
          <NavItem onClick={() => navigateTo('/partnerships')}>PARTNERSHIPS</NavItem>
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

      {/* Main Content Area */}
      <main style={{
        padding: '60px 50px 100px 50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px'
      }}>
        
        <h1 className="text-glow" style={{ 
          fontSize: '3.5rem', 
          fontWeight: '900', 
          letterSpacing: '3px',
          textTransform: 'uppercase',
          textAlign: 'center'
        }}>
          GAMING HUB
        </h1>

        {/* Top Features Grid */}
        <div style={{
          display: 'flex',
          gap: '20px',
          width: '100%',
          maxWidth: '1200px',
          flexWrap: 'wrap'
        }}>
          <FeatureBox 
            title="LFG Channels" 
            subtitle="Find Teammates"
            icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect><path d="M6 12h4"></path><path d="M8 10v4"></path><path d="M15 13h.01"></path><path d="M18 11h.01"></path></svg>}
          />
          <FeatureBox 
            title="Tournaments" 
            subtitle="Compete & Win"
            icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10"></path><path d="M6 4v9a6 6 0 0 0 12 0V4"></path><path d="M6 4h-.5a2.5 2.5 0 0 0 0 5H6"></path><path d="M18 4h.5a2.5 2.5 0 0 1 0 5H18"></path></svg>}
          />
          <FeatureBox 
            title="Clans" 
            subtitle="Join a Squad"
            icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
          />
          <FeatureBox 
            title="Voice Chat" 
            subtitle="Game Together"
            icon={<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>}
          />
        </div>

        {/* Supported Games Section */}
        <div style={{
          border: '2px solid white',
          padding: '40px',
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>
            SUPPORTED GAMES
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            width: '100%'
          }}>
            <GameButton name="Valorant" />
            <GameButton name="League of Legends" />
            <GameButton name="Minecraft" />
            <GameButton name="Fortnite" />
            
            <GameButton name="Apex Legends" />
            <GameButton name="Rocket League" />
            <GameButton name="CS2" />
            <GameButton name="Overwatch 2" />
            
            <GameButton name="Roblox" />
            <GameButton name="Genshin Impact" />
            <GameButton name="Call of Duty" />
            <GameButton name="Among Us" />
          </div>
        </div>

        {/* Bottom Schedule Grid */}
        <div style={{
          display: 'flex',
          gap: '20px',
          width: '100%',
          maxWidth: '1200px',
          flexWrap: 'wrap'
        }}>
          <ScheduleBox 
            tag="Every Friday"
            title="Game Night"
            description="Community-wide gaming sessions"
          />
          <ScheduleBox 
            tag="Monthly"
            title="Tournaments"
            description="Compete for prizes & glory"
          />
          <ScheduleBox 
            tag="24/7"
            title="LFG"
            description="Always find teammates online"
          />
        </div>

      </main>
    </div>
  );
}
