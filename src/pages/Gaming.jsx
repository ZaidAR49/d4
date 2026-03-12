import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Users, Mic, Calendar, Search, Star } from 'lucide-react';

const GameCard = ({ name, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ y: -5, borderColor: 'var(--accent-cyan)' }}
    style={{
      padding: '20px',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }}
  >
    <div style={{
      width: '10px',
      height: '100%',
      background: 'var(--accent-cyan)',
      borderRadius: '4px',
      opacity: 0.5
    }} />
    <span style={{ 
      color: 'white', 
      fontWeight: '600', 
      fontSize: '0.95rem',
      fontFamily: 'Space Grotesk',
      letterSpacing: '0.02em'
    }}>
      {name.toUpperCase()}
    </span>
  </motion.div>
);

const FeatureItem = ({ icon: Icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="glass-card"
    style={{
      padding: '30px',
      borderRadius: '20px',
      flex: '1',
      minWidth: '240px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    }}
  >
    <div style={{
      padding: '16px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.03)',
      color: 'var(--accent-magenta)'
    }}>
      <Icon size={28} />
    </div>
    <div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', color: 'white' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{desc}</p>
    </div>
  </motion.div>
);

export default function Gaming() {
  const games = [
    "Valorant", "League of Legends", "Minecraft", "Fortnite",
    "Apex Legends", "Rocket League", "CS2", "Overwatch 2",
    "Roblox", "Genshin Impact", "Call of Duty", "Among Us"
  ];

  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      <header style={{ textAlign: 'center', marginBottom: '80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '100px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '24px',
            color: 'var(--accent-cyan)',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.1em'
          }}
        >
          <Star size={12} fill="currentColor" />
          D4 GAMING PROTOCOLS
        </motion.div>
        
        <h1 className="text-gradient" style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '20px' }}>
          GAMING HUB
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Join the elite squads of D4. Compete, collaborate, and conquer.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px',
        marginBottom: '80px'
      }}>
        <FeatureItem 
          icon={Search} 
          title="LFG PRO" 
          desc="Find high-elo teammates instantly in our dedicated channels." 
          delay={0.1}
        />
        <FeatureItem 
          icon={Trophy} 
          title="TOURNAMENTS" 
          desc="Monthly community cups with exclusive rewards and roles." 
          delay={0.2}
        />
        <FeatureItem 
          icon={Mic} 
          title="COMMS" 
          desc="Crystal clear 384kbps voice channels for perfect coordination." 
          delay={0.3}
        />
      </div>

      <div className="glass-panel" style={{ padding: '60px 40px' }}>
        <h2 style={{ 
          fontSize: '1.8rem', 
          fontWeight: '800', 
          marginBottom: '40px',
          textAlign: 'center',
          fontFamily: 'Space Grotesk'
        }}>
          SUPPORTED UNIVERSES
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
          gap: '16px' 
        }}>
          {games.map((game, i) => (
            <GameCard key={game} name={game} delay={i * 0.05} />
          ))}
        </div>
      </div>

      <div style={{ 
        marginTop: '80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{ padding: '40px', borderRadius: '24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Calendar className="text-magenta" size={24} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>EVENT SCHEDULE</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderLeft: '2px solid var(--accent-magenta)', paddingLeft: '20px' }}>
              <p style={{ color: 'var(--accent-magenta)', fontSize: '0.8rem', fontWeight: '700' }}>EVERY FRIDAY</p>
              <h4 style={{ color: 'white' }}>COMMUNITY GAME NIGHT</h4>
            </div>
            <div style={{ borderLeft: '2px solid var(--border-bright)', paddingLeft: '20px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700' }}>MONTHLY</p>
              <h4 style={{ color: 'var(--text-secondary)' }}>D4 INVITATIONAL TOURNAMENT</h4>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="glass-card"
           style={{ 
             padding: '40px', 
             borderRadius: '24px',
             background: 'linear-gradient(135deg, rgba(255,0,229,0.1) 0%, rgba(0,245,255,0.1) 100%)',
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',
             textAlign: 'center'
           }}
        >
          <Gamepad2 size={48} style={{ marginBottom: '20px', color: 'white' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px' }}>JOIN THE SQUAD</h3>
          <p style={{ color: 'var(--text-primary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Register your clan to get exclusive channel access.
          </p>
          <button className="btn-primary">REGISTER CLAN</button>
        </motion.div>
      </div>
    </div>
  );
}
