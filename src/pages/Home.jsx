import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Users, AlertTriangle, Scale, Lock, Heart, Terminal, Globe, ExternalLink } from 'lucide-react';

const MissionCard = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card"
    style={{
      padding: '32px',
      borderRadius: '20px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}
  >
    <div style={{
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--accent-cyan)'
    }}>
      <Icon size={24} />
    </div>
    <h3 style={{ 
      fontSize: '1.25rem', 
      fontWeight: '700', 
      color: 'white',
      fontFamily: 'Space Grotesk'
    }}>
      {title}
    </h3>
    <div style={{ 
      color: 'var(--text-secondary)', 
      fontSize: '0.9rem', 
      lineHeight: '1.6',
      fontFamily: 'Inter'
    }}>
      {children}
    </div>
  </motion.div>
);

export default function Home() {
  const location = useLocation();
  const username = localStorage.getItem('d4_username') || 'GUEST';

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '60px 0 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '8px 16px',
            borderRadius: '100px',
            background: 'rgba(0, 245, 255, 0.1)',
            border: '1px solid rgba(0, 245, 255, 0.2)',
            color: 'var(--accent-cyan)',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.1em',
            fontFamily: 'Space Grotesk'
          }}
        >
          CONNECTED AS {username.toUpperCase()}
        </motion.div>
        
        <h1 className="text-gradient" style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', 
          fontWeight: '900', 
          lineHeight: '1.1',
          maxWidth: '850px',
          letterSpacing: '-0.01em'
        }}>
          A CHILL COMMUNITY FOR EVERYONE
        </h1>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.1rem', 
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          D4 is more than a server. It's a digital sanctuary built on equality, security, and genuine connection.
        </p>

        <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
           <button 
             onClick={() => window.open('https://discord.gg/kkfSZW9Z5x', '_blank')}
             className="btn-primary" 
             style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 32px' }}
           >
             JOIN OUR DISCORD
             <ExternalLink size={18} />
           </button>
           <button 
             className="btn-outline" 
             style={{ padding: '16px 32px' }}
             onClick={() => document.getElementById('protocols')?.scrollIntoView({ behavior: 'smooth' })}
           >
             VIEW PROTOCOLS
           </button>
        </div>
      </section>

      <div id="protocols" style={{ marginBottom: '40px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '40px', fontFamily: 'Space Grotesk' }}>COMMUNITY PROTOCOLS</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          <MissionCard title="CORE ETHOS" icon={Heart} delay={0.1}>
            Be respectful by treating others with kindness. We foster a respectful, constructive environment where members can build meaningful connections.
          </MissionCard>

          <MissionCard title="EQUALITY" icon={Scale} delay={0.2}>
            The D4 skull represents the idea that beneath the skin, all people are the same. Reduced to bones regardless of accomplishments or identity.
          </MissionCard>

          <MissionCard title="SECURITY" icon={Lock} delay={0.3}>
            A top-tier hangout with unique security against malicious attacks. We do not tolerate hacking, phishing, or exploitation within our borders.
          </MissionCard>

          <MissionCard title="EXERT CONTROL" icon={Shield} delay={0.4}>
            No hard drug usage, no sexual content, and no real gore. We maintain a clean environment for all family members.
          </MissionCard>

          <MissionCard title="ZERO CORRUPTION" icon={AlertTriangle} delay={0.5}>
            Supporting corruption or satanism is prohibited. We prioritize conflict-free dialogue and genuine human interaction.
          </MissionCard>

          <MissionCard title="ANTI-DECEPTION" icon={Terminal} delay={0.6}>
            No impersonation or lying about your identity. Truthfulness is the foundation of our community trust.
          </MissionCard>
        </div>
      </div>

      {/* Interactive Join Section */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        onClick={() => window.open('https://discord.gg/kkfSZW9Z5x', '_blank')}
        className="glass-panel"
        style={{
          marginTop: '60px',
          padding: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '30px',
          border: '1px solid var(--border-bright)',
          cursor: 'pointer',
          background: 'linear-gradient(90deg, rgba(255,0,229,0.05) 0%, rgba(0,245,255,0.05) 100%)'
        }}
      >
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ color: 'var(--accent-cyan)', fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>
            READY TO JOIN THE DIMENSION?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Click anywhere in this module to securely redirect to our official Discord server. Welcome to the family.
          </p>
        </div>
        
        <div style={{
          width: '100px',
          height: '100px',
          background: 'var(--bg-elevated)',
          borderRadius: '24px',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img src="/Skull.png" alt="Skull" style={{ width: '60px', height: '60px', opacity: 0.8 }} />
        </div>
      </motion.div>
    </div>
  );
}
