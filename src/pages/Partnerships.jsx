import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Users, Zap, Globe, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

const PartnerSlot = ({ number, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card"
    style={{
      height: '300px',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      border: '1px dashed var(--border-bright)',
      background: 'rgba(255,255,255,0.01)'
    }}
  >
    <div style={{
      width: '60px',
      height: '60px',
      borderRadius: '20px',
      background: 'var(--bg-elevated)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }}>
      <Handshake size={32} />
    </div>
    <div style={{ textAlign: 'center' }}>
      <h3 style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-cyan)', letterSpacing: '0.1em', marginBottom: '8px' }}>SLOT {number}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600' }}>RESERVED FOR FUTURE PARTNER</p>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    style={{ flex: 1, minWidth: '280px' }}
  >
    <div className="glass-panel" style={{ padding: '30px', borderRadius: '20px', height: '100%' }}>
      <div style={{ color: 'var(--accent-magenta)', marginBottom: '16px' }}><Icon size={24} /></div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', fontFamily: 'Space Grotesk' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{desc}</p>
    </div>
  </motion.div>
);

export default function Partnerships() {
  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      <header style={{ textAlign: 'center', marginBottom: '80px' }}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gradient" 
          style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '20px' }}
        >
          PARTNERSHIPS
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}
        >
          Building a stronger web through collaboration and shared values.
        </motion.p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '24px',
        marginBottom: '80px'
      }}>
        {[1, 2, 3, 4, 5, 6].map((n, i) => (
          <PartnerSlot key={n} number={n} delay={i * 0.1} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-panel"
        style={{
          padding: '60px 40px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '40px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(255,0,229,0.05) 100%)',
          border: '1px solid var(--border-bright)',
          marginBottom: '80px'
        }}
      >
        <div style={{ flex: 2, minWidth: '320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Zap className="text-magenta" size={28} />
            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>BECOME A PARTNER</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Looking to grow your community or collaborate on tech safety? Join the D4 partnership network and gain access to our security resources and family.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => window.open('https://discord.gg/kkfSZW9Z5x', '_blank')}
            className="btn-primary" 
            style={{ padding: '20px 48px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            APPLY NOW
            <ExternalLink size={20} />
          </button>
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <FeatureCard 
          icon={Globe} 
          title="CROSS PROMOTION" 
          desc="Expand your reach across the D4 network with strategic announcements." 
          delay={0.1}
        />
        <FeatureCard 
          icon={Heart} 
          title="JOINT EVENTS" 
          desc="Collaborate on community game nights, tournaments, and exclusive town halls." 
          delay={0.2}
        />
        <FeatureCard 
          icon={ShieldCheck} 
          title="SECURE ACCESS" 
          desc="Get verified partner roles and exclusive channels for your staff and members." 
          delay={0.3}
        />
      </div>
    </div>
  );
}
