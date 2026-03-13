import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Coins, Info, History, Package, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DIFFICULTY_SETTINGS = {
  EASY: {
    cost: 20,
    winRange: '10-50',
    color: '#10b981',
    label: 'EASY',
    rates: [
      { label: 'Nothing', rate: '60%', color: '#dc2626' },
      { label: 'Small (10-20)', rate: '25%', color: '#fbbf24' },
      { label: 'Medium (25-35)', rate: '12%', color: '#0ea5e9' },
      { label: 'Big (40-50)', rate: '3%', color: '#10b981' },
    ]
  },
  MEDIUM: {
    cost: 40,
    winRange: '20-120',
    color: '#fbbf24',
    label: 'MEDIUM',
    rates: [
      { label: 'Nothing', rate: '50%', color: '#dc2626' },
      { label: 'Small (20-40)', rate: '30%', color: '#fbbf24' },
      { label: 'Medium (50-80)', rate: '15%', color: '#0ea5e9' },
      { label: 'Big (90-120)', rate: '5%', color: '#10b981' },
    ]
  },
  HARD: {
    cost: 80,
    winRange: '50-300',
    color: '#a855f7',
    label: 'HARD',
    rates: [
      { label: 'Nothing', rate: '40%', color: '#dc2626' },
      { label: 'Small (50-100)', rate: '35%', color: '#fbbf24' },
      { label: 'Medium (120-200)', rate: '20%', color: '#0ea5e9' },
      { label: 'Big (220-300)', rate: '5%', color: '#10b981' },
    ]
  }
};

export default function MysteryBox() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('d4_credits');
    return saved ? parseInt(saved) : 200;
  });
  const [difficulty, setDifficulty] = useState('EASY');
  const [isOpening, setIsOpening] = useState(false);
  const [recentOpenings, setRecentOpenings] = useState([]);
  const [result, setResult] = useState(null);
  
  const settings = DIFFICULTY_SETTINGS[difficulty];

  useEffect(() => {
    localStorage.setItem('d4_credits', balance.toString());
  }, [balance]);

  const handleOpen = () => {
    if (balance < settings.cost || isOpening) return;

    setBalance(prev => prev - settings.cost);
    setIsOpening(true);
    setResult(null);

    // Precise multi-stage timing
    // Stage 1: Pulse/Suspense (0-1s)
    // Stage 2: Intense Shake (1s-2.5s)
    // Stage 3: Burst/Reveal (2.5s)
    
    setTimeout(() => {
      const rand = Math.random() * 100;
      let winningPrize = 0;
      let tierLabel = 'NOTHING';
      
      const rates = settings.rates;
      if (rand < parseFloat(rates[0].rate)) {
        winningPrize = 0;
        tierLabel = 'NOTHING';
      } else if (rand < parseFloat(rates[0].rate) + parseFloat(rates[1].rate)) {
        const [min, max] = rates[1].label.match(/\d+/g).map(Number);
        winningPrize = Math.floor(Math.random() * (max - min + 1)) + min;
        tierLabel = 'SMALL WIN';
      } else if (rand < parseFloat(rates[0].rate) + parseFloat(rates[1].rate) + parseFloat(rates[2].rate)) {
        const [min, max] = rates[2].label.match(/\d+/g).map(Number);
        winningPrize = Math.floor(Math.random() * (max - min + 1)) + min;
        tierLabel = 'MEDIUM WIN';
      } else {
        const [min, max] = rates[3].label.match(/\d+/g).map(Number);
        winningPrize = Math.floor(Math.random() * (max - min + 1)) + min;
        tierLabel = 'JACKPOT';
      }

      setIsOpening(false);
      setResult({ amount: winningPrize, label: tierLabel });
      setBalance(prev => prev + winningPrize);
      setRecentOpenings(prev => [
        { id: Date.now(), amount: winningPrize, label: tierLabel, difficulty: settings.label },
        ...prev.slice(0, 4)
      ]);
    }, 2500);
  };

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      {/* Radial Glow Background Effect while opening */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.2, 0.6] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, times: [0, 0.4, 0.8, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at center, ${settings.color}40 0%, transparent 70%)`,
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <button 
          onClick={() => navigate('/minigames')}
          className="navbar-link"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '10px 20px', 
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            fontWeight: '800'
          }}
        >
          <ChevronLeft size={20} /> BACK
        </button>
        
        <h1 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: '900', textAlign: 'center' }}>
          MYSTERY BOX
        </h1>

        <div className="glass-panel" style={{ padding: '8px 20px', border: '2px solid #fbbf24' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: '800' }}>BALANCE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={18} color="#fbbf24" />
              <span style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>{balance.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', alignItems: 'start' }}>
        {/* Main Game Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Difficulty Selection */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '0.2em' }}>SELECT DIFFICULTY</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {Object.entries(DIFFICULTY_SETTINGS).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => !isOpening && setDifficulty(key)}
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    border: `2px solid ${difficulty === key ? cfg.color : 'rgba(255,255,255,0.05)'}`,
                    background: difficulty === key ? `${cfg.color}15` : 'rgba(255,255,255,0.02)',
                    cursor: isOpening ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {difficulty === key && (
                    <motion.div 
                      layoutId="glow"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        boxShadow: `inset 0 0 20px ${cfg.color}30`
                      }}
                    />
                  )}
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    background: cfg.color, 
                    margin: '0 auto 12px',
                    boxShadow: `0 0 10px ${cfg.color}`
                  }} />
                  <div style={{ fontWeight: '900', color: difficulty === key ? 'white' : 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4px' }}>{cfg.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cost: {cfg.cost}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Win: {cfg.winRange}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Opening Area */}
          <div className="glass-panel" style={{ 
            padding: '60px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '40px',
            minHeight: '500px',
            position: 'relative',
            border: `2px solid ${settings.color}40`,
            background: 'rgba(0,0,0,0.4)'
          }}>
            <motion.div
              animate={isOpening ? { 
                scale: [1, 1.05, 1, 1.2, 0.9, 1.5],
                rotate: [0, -1, 1, -2, 2, -10, 10, -20, 20, 0],
                filter: [
                  `drop-shadow(0 0 20px ${settings.color}40)`,
                  `drop-shadow(0 0 40px ${settings.color}60)`,
                  `drop-shadow(0 0 80px ${settings.color}80)`,
                  `drop-shadow(0 0 120px ${settings.color})`,
                ]
              } : { 
                y: [0, -10, 0],
                filter: `drop-shadow(0 0 20px ${settings.color}40)`
              }}
              transition={isOpening ? { 
                duration: 2.5,
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ease: "easeInOut"
              } : { 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ color: settings.color, position: 'relative', zIndex: 1 }}
            >
              <Package size={150} />
              
              {/* Particle Burst Effect */}
              {isOpening && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 2], opacity: [0, 1, 0] }}
                  transition={{ delay: 2, duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${settings.color} 0%, transparent 70%)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1
                  }}
                />
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              {isOpening ? (
                <motion.div
                  key="opening"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ textAlign: 'center' }}
                >
                  <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', letterSpacing: '0.1em' }}>OPENING...</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Hold your breath!</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '32px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: `2px solid ${result.amount > 0 ? '#10b981' : '#dc2626'}`,
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '400px'
                  }}
                >
                  <h2 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '900', 
                    color: result.amount > 0 ? '#10b981' : '#dc2626',
                    marginBottom: '8px'
                  }}>
                    {result.amount > 0 ? `${result.label}!` : 'NOTHING! 💀'}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    {result.amount > 0 ? `You found ${result.amount} credits!` : 'Better luck next time, gambler!'}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <button
              onClick={handleOpen}
              disabled={isOpening || balance < settings.cost}
              className="btn-primary"
              style={{
                padding: '20px 80px',
                fontSize: '1.5rem',
                fontWeight: '900',
                background: balance < settings.cost ? 'rgba(255,255,255,0.05)' : 'white',
                color: 'black',
                border: 'none',
                cursor: (isOpening || balance < settings.cost) ? 'not-allowed' : 'pointer',
                opacity: (isOpening || balance < settings.cost) ? 0.5 : 1,
                minWidth: '350px'
              }}
            >
              {balance < settings.cost ? 'NOT ENOUGH CREDITS' : `OPEN BOX (${settings.cost})`}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', border: `1px solid ${settings.color}40` }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: settings.color }}>
              <Info size={18} /> GAME INFO
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Cost Per Box</span>
                <span style={{ fontWeight: '700' }}>{settings.cost} Credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Max Prize</span>
                <span style={{ fontWeight: '700', color: '#10b981' }}>{settings.winRange.split('-')[1]} Credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Difficulty</span>
                <span style={{ fontWeight: '700', color: settings.color }}>{settings.label}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: '#0ea5e9' }}>
              <History size={18} /> RECENT OPENINGS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentOpenings.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>No openings yet</div>
              ) : (
                recentOpenings.map(opening => (
                  <div key={opening.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{opening.difficulty}</span>
                      <span style={{ fontSize: '12px', fontWeight: '700' }}>{opening.label}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '900', color: opening.amount > 0 ? '#10b981' : '#dc2626', alignSelf: 'center' }}>
                      {opening.amount > 0 ? `+${opening.amount}` : '0'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: '#fbbf24' }}>
              <Sparkles size={18} /> DROP RATES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {settings.rates.map((rate, i) => (
                <div key={i} style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${rate.color}40`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{rate.label}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '900', color: rate.color }}>{rate.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
