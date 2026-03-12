import React, { useState } from 'react';
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

// ... keeping RuleSection as is

const RuleSection = ({ title, children }) => (
  <div style={{
    border: '1px solid white',
    padding: '25px',
    marginBottom: '20px',
    textAlign: 'left'
  }}>
    <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '15px' }}>{title}</h3>
    <ul style={{ 
      listStyleType: 'disc', 
      paddingLeft: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '15px',
      color: '#d1d5db',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      lineHeight: '1.5'
    }}>
      {children}
    </ul>
  </div>
);

export default function Home() {
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
          <NavItem active onClick={() => navigateTo('/home')}>HOME</NavItem>
          <NavItem onClick={() => navigateTo('/info')}>D4 INFO</NavItem>
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

      {/* Hero Section */}
      <main style={{
        marginTop: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 0 100px 0',
        position: 'relative'
      }}>
        <h1 className="text-glow" style={{ 
          fontSize: '4.5rem', 
          fontWeight: '900', 
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '10px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          Welcome To D4
        </h1>
        <p style={{ 
          color: '#aaa', 
          fontFamily: 'monospace', 
          fontSize: '1.2rem',
          letterSpacing: '1px',
          marginBottom: '60px'
        }}>
          A CHILL COMMUNITY FOR EVERYONE
        </p>

        {/* Community Rules Container */}
        <div style={{
          border: '3px solid white',
          padding: '40px',
          width: '100%',
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', textAlign: 'center', marginBottom: '40px', letterSpacing: '2px' }}>
            COMMUNITY RULES
          </h2>

          <RuleSection title="RULE SECTION 1 - General Rules">
            <li>Be <b>respectful</b> by treating others with kindness even if you disagree with their differences.</li>
            <li>No <b>harassment</b>, personal attacks, insults, or discriminatory behavior.</li>
            <li>No <b>spam</b> or self-promoting discord invite links.</li>
          </RuleSection>

          <RuleSection title="RULE SECTION 2 - Free Speech and Equality">
            <li><b>Free expression:</b> Members are encouraged to express their thoughts and opinions freely in a mature formal manner that shows positive intentions towards one another.</li>
            <li><b>No Hard R:</b> Only use the word Nigga in a non-derogatory manner.</li>
            <li><b>Respectful disagreement:</b> Disagree without being disagreeable; keep discussions civil and respectful.</li>
            <li><b>Equal voice:</b> All members have an equal voice; no one person has more authority than others.</li>
            <li><b>Political:</b> To engage in political topics you must be old enough to vote 18+ as exclusive channels for political topics will only be accessible & viewable by members with adult role, that being said political talk must stay in political channels.</li>
            <li><b>Equality:</b> Here at D4 the skull represents the idea that beneath the skin and flesh, all people are the same, eventually being reduced to bones regardless of their accomplishments or identity.</li>
          </RuleSection>

          <RuleSection title="RULE SECTION 3 - Server Etiquette">
            <li><b>Use appropriate channels:</b> Keep content in their designated channels.</li>
            <li><b>No sexual content:</b> No videos/gifs or images containing sexual content.</li>
            <li><b>No real gore:</b> No self-harm, no real humans or animals being tortured or killed.</li>
            <li><b>No rape:</b> The discussion of rape or any content around rape is prohibited.</li>
            <li><b>No pedos:</b> Adults having sexual activity with a minor is highly prohibited and will lead to instant ban from D4 as this also includes those who support preds.</li>
            <li><b>No corruption:</b> Supporting any type of corruption or satanism is prohibited.</li>
            <li><b>No rage baiting:</b> Rage baiting is prohibited because it intentionally manipulates emotions to spark hostility, derail conversations, and drown out genuine voices. When someone is prioritizing conflict over connection, it replaces meaningful exchange with reactive noise, preventing the community from building trust, understanding, or productive dialogue.</li>
          </RuleSection>

          <RuleSection title="RULE SECTION 4 - No Hard Drug Usage & No Online Sells">
            <li>No online activity of <b>hard drug usage</b> or the consumption of hard substances capable of killing you.</li>
            <li>No promoting <b>online sells</b>, that includes any type of product or substance.</li>
            <li>No immature drinking, but only <b>responsibly drink</b> in heavy moderation while being able to use self-control.</li>
          </RuleSection>

          <RuleSection title="RULE SECTION 5 - Hackers & Scammers">
            <li>No <b>Discord Hacking or Exploitation</b></li>
            <li>No sharing of <b>hacking tools</b>, exploits, or malicious software.</li>
            <li>No malicious <b>scam links</b>, IP grabbing links or API Token Grabbers.</li>
            <li>No <b>hacking, doxxing, phishing</b>, or exploiting Discord servers or accounts.</li>
          </RuleSection>

          <RuleSection title="RULE SECTION 6 - Impersonation">
            <li>No <b>deceiving people</b> by impersonating other users, moderators, or administrators.</li>
            <li>No <b>lying about your age</b> when choosing either adult role or minor role, so choose truthfully.</li>
          </RuleSection>
          
          <RuleSection title="RULE SECTION 7 - Prohibited Behavior">
            <div style={{ fontFamily: 'monospace', color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.6'}}>
              <p style={{marginBottom: '15px'}}>Here at D4 we do not tolerate <b>petty people</b> who behave in an unnecessary manner, or those who take every minor incident as a personal offense, that being said here at D4 we are committed to fostering a <b>respectful, constructive, and formal environment</b> where members can build meaningful connections.</p>
              <p>Petty behavior undermines these values and is strictly prohibited due to the fact that it <b>inhibits meaningful connections</b> by creating an environment of tension and conflict. It often leads to misunderstandings, resentment, and a lack of trust between individuals. When people focus on trivial matters, they miss the opportunity to connect on a deeper level, as they are distracted by the minutiae rather than the core values and relationships. This behavior can also alienate others, making it difficult to form and maintain strong bonds because it erodes the foundation of healthy communication. It discourages openness, creates hostility, and inhibits the development of genuine relationships. When members engage in such conduct, it shifts focus away from productive dialogue and toward unnecessary conflict, ultimately diminishing the overall quality of the community experience.</p>
            </div>
          </RuleSection>

          <div style={{
            backgroundColor: 'white',
            color: 'black',
            padding: '25px',
            textAlign: 'center',
            fontWeight: '900',
            fontSize: '1.1rem',
            marginTop: '10px'
          }}>
            By following these rules, we can create a welcoming community where everyone feels valued and respected.
          </div>
        </div>

        {/* Join CTA Section */}
        <div 
          onClick={() => window.open('https://discord.gg/kkfSZW9Z5x', '_blank')}
          style={{
            border: '2px solid #8b5cf6', // Indigo/Purple border based on last screenshot
            backgroundColor: '#111827', // Darker background
            padding: '30px 40px',
            width: '100%',
            maxWidth: '900px',
            marginTop: '50px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer'
        }}>
            <div style={{ maxWidth: '70%' }}>
                <h2 style={{ color: '#0ea5e9', fontSize: '1.8rem', fontWeight: '900', marginBottom: '15px' }}>
                    CLICK TO JOIN D4
                </h2>
                <p style={{ fontFamily: 'monospace', color: '#9ca3af', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    A hang out server tailored to all people who join, while having a top unique security against malicious attacks.
                </p>
            </div>
            
            <div style={{
                backgroundColor: '#000',
                border: '1px solid #374151',
                padding: '15px',
                borderRadius: '8px'
            }}>
                <image src="/Skull.png" alt="D4 Skull" width="40" height="40" />
            </div>
        </div>
      </main>
    </div>
  );
}

