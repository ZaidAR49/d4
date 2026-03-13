import React from 'react';
import { motion } from 'framer-motion';
import { Info as InfoIcon, Target, Shield, Users, Globe, Terminal, Briefcase } from 'lucide-react';

const InfoSection = ({ icon: Icon, title, content, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ marginBottom: '40px' }}
  >
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <div style={{
        padding: '12px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--border-subtle)',
        color: 'var(--text-primary)'
      }}>
        <Icon size={24} />
      </div>
      <div>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          marginBottom: '10px',
          fontFamily: 'Space Grotesk' 
        }}>
          {title}
        </h3>
        <p style={{ 
          color: 'var(--text-secondary)', 
          lineHeight: '1.7',
          fontSize: '1rem',
          maxWidth: '800px'
        }}>
          {content}
        </p>
      </div>
    </div>
  </motion.div>
);

const ValueBox = ({ title, items, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card"
    style={{
      padding: '30px',
      borderRadius: '20px',
      flex: '1',
      minWidth: '280px'
    }}
  >
    <h4 style={{ 
      color: 'var(--text-primary)', 
      fontWeight: '800', 
      fontSize: '0.8rem', 
      letterSpacing: '0.1em',
      marginBottom: '20px',
      fontFamily: 'Space Grotesk'
    }}>
      {title.toUpperCase()}
    </h4>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: '10px', color: 'white', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>•</span>
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function Info() {
  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      <header style={{ marginBottom: '60px' }}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gradient" 
          style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '20px' }}
        >
          THE MISSION
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px' }}
        >
          Understanding the origin, purpose, and future of D4.
        </motion.p>
      </header>

      <div className="glass-panel" style={{ padding: '60px 40px', marginBottom: '40px' }}>
        <InfoSection 
          icon={Globe}
          title="WHAT IS D4?"
          content="D4 refers to the fourth dimension—a symbolic representation of a community that is forward-thinking, creative, and boundless. We are a digital sanctuary designed for those who seek more than just another server; we seek a legacy."
          delay={0.1}
        />

        <InfoSection 
          icon={Terminal}
          title="THE SKULL PHILOSOPHY"
          content="At D4, the skull is our ultimate equalizer. It serves as a reminder that beneath the layers of identity, status, and accomplishment, we are fundamentally the same. Reduced to bone, we find our common humanity."
          delay={0.2}
        />

        <InfoSection 
          icon={Target}
          title="COMBATING CORRUPTION"
          content="A primary pillar of our mission is the active dismantlement of online corruption, specifically child exploitation. We empower tech-savvy members to collaborate with law enforcement and the public to ensure a swift response to online threats."
          delay={0.3}
        />
        
        <InfoSection 
          icon={Users}
          title="COMMUNITY FIRST"
          content="We operate on the principle of family. Every member has an equal voice, protected by top-tier security and a commitment to transparent, mature collaboration."
          delay={0.4}
        />
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <ValueBox 
          title="Community Values"
          items={["Treat everyone like family", "Foster genuine connections", "Create a safe sanctuary"]}
          delay={0.5}
        />
        <ValueBox 
          title="Security Assets"
          items={["Top-tier encryption", "Moderated protocols", "Anti-exploit infrastructure"]}
          delay={0.6}
        />
        <ValueBox 
          title="The Mission"
          items={["Combat online corruption", "Tech-law synthesis", "Protect the vulnerable"]}
          delay={0.7}
        />
      </div>
    </div>
  );
}
