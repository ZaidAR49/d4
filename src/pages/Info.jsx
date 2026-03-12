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

const InfoSection = ({ question, answer }) => (
  <div style={{ marginBottom: '25px' }}>
    <h3 style={{ 
      fontSize: '1rem', 
      fontWeight: '900', 
      marginBottom: '10px',
      letterSpacing: '1px'
    }}>
      {question}
    </h3>
    <p style={{ 
      color: '#aaa', 
      fontFamily: 'monospace', 
      fontSize: '0.85rem',
      lineHeight: '1.6'
    }} dangerouslySetInnerHTML={{ __html: answer }} />
  </div>
);

const GridBox = ({ iconSvg, title, items }) => (
  <div style={{
    border: '1px solid white',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    flex: 1,
    minWidth: '250px'
  }}>
    <div>
      {iconSvg}
    </div>
    <h3 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px' }}>{title}</h3>
    <ul style={{ 
      listStyleType: 'none', 
      padding: 0, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px',
      color: '#aaa',
      fontFamily: 'monospace',
      fontSize: '0.85rem'
    }}>
      {items.map((item, index) => (
        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'white' }}>▸</span> {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function Info() {
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
          <NavItem active onClick={() => navigateTo('/info')}>D4 INFO</NavItem>
          <NavItem onClick={() => navigateTo('/gaming')}>GAMING</NavItem>
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
        padding: '40px 50px 100px 50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* INFO Section Box */}
        <div style={{
          border: '2px solid white',
          padding: '50px',
          width: '100%',
          maxWidth: '1200px',
          position: 'relative',
          marginBottom: '30px'
        }}>
          {/* Top Right "i" icon */}
          <div style={{
            position: 'absolute',
            top: '30px',
            right: '40px',
            backgroundColor: 'white',
            color: 'black',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '900',
            fontSize: '1.8rem',
            fontFamily: 'serif'
          }}>
            i
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '40px', letterSpacing: '1px' }}>
            INFO ABOUT D4
          </h2>

          <InfoSection 
            question="WHAT IS THE MEANING BEHIND THE NAME D4?"
            answer="<b>D4 = Dimension 4:</b> A reference to the fourth dimension, suggesting a community that's <b>forward-thinking, creative</b>, and <b>open to new ideas</b> and perspectives."
          />

          <InfoSection 
            question="WHAT IS THE MEANING BEHIND THE D4 SKULL?"
            answer="<b>Equality:</b> The skull represents the idea that, beneath the skin and flesh, <b>all people are the same</b>, eventually being reduced to bones regardless of their accomplishments or identity."
          />

          <InfoSection 
            question="WHAT IS D4 ABOUT?"
            answer="D4 is about being a <b>community-based hangout</b> server built on the principle of treating members like <b>family</b>. We provide an environment tailored to everyone, making D4 the perfect hangout spot to <b>make friends, express yourself freely</b>, and engage with others in a <b>mature, respectful manner</b> that fosters positive intentions and genuine connections—all backed by <b>top-tier security</b> against malicious attacks."
          />

          <InfoSection 
            question="WHAT IS THE GOAL OF D4?"
            answer="The <b>primary goal</b> of D4 is to <b>combat online corruption</b>, including activities related to <b>child exploitation</b>. Anyone who opposes corruption and is interested in helping dismantle it online is welcome to get involved—especially if you have the <b>tech-savvy skills</b> to contribute.<br/><br/>The <b>secondary goal</b> of D4 is to foster <b>transparent collaboration</b> between tech experts, law enforcement, and the public to ensure a <b>swift and effective response</b> to emerging online threats."
          />
        </div>

        {/* Bottom Grid Boxes */}
        <div style={{
          display: 'flex',
          gap: '30px',
          width: '100%',
          maxWidth: '1200px',
          flexWrap: 'wrap'
        }}>
          
          <GridBox 
            title="COMMUNITY VALUES"
            items={[
              "Treat everyone like family",
              "Foster genuine connections",
              "Create a safe environment"
            ]}
            iconSvg={
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
          />

          <GridBox 
            title="SECURITY"
            items={[
              "Top-tier protection",
              "Moderated environment",
              "Combat online corruption"
            ]}
            iconSvg={
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            }
          />

          <GridBox 
            title="MISSION"
            items={[
              "Fight child exploitation",
              "Tech-law collaboration",
              "Protect our community"
            ]}
            iconSvg={
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            }
          />

        </div>
      </main>
    </div>
  );
}
