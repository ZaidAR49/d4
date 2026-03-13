import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Coins, Info, History, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DIFFICULTY_SETTINGS = {
  EASY: {
    cost: 25,
    winRange: '25-40',
    color: '#10b981',
    label: 'EASY',
    rates: [
      { label: 'Lose', rate: '40%', color: '#dc2626' },
      { label: 'Small (25-75)', rate: '30%', color: '#fbbf24' },
      { label: 'Medium (100-200)', rate: '20%', color: '#0ea5e9' },
      { label: 'Big (250-400)', rate: '8%', color: '#10b981' },
      { label: 'Jackpot (450-500)', rate: '2%', color: '#a855f7' },
    ]
  },
  MEDIUM: {
    cost: 50,
    winRange: '75-100',
    color: '#fbbf24',
    label: 'MEDIUM',
    rates: [
      { label: 'Lose', rate: '35%', color: '#dc2626' },
      { label: 'Small (50-100)', rate: '35%', color: '#fbbf24' },
      { label: 'Medium (150-300)', rate: '20%', color: '#0ea5e9' },
      { label: 'Big (400-600)', rate: '8%', color: '#10b981' },
      { label: 'Jackpot (700-1000)', rate: '2%', color: '#a855f7' },
    ]
  },
  HARD: {
    cost: 100,
    winRange: '125-150',
    color: '#ef4444',
    label: 'HARD',
    rates: [
      { label: 'Lose', rate: '30%', color: '#dc2626' },
      { label: 'Small (100-200)', rate: '40%', color: '#fbbf24' },
      { label: 'Medium (300-500)', rate: '20%', color: '#0ea5e9' },
      { label: 'Big (600-1000)', rate: '8%', color: '#10b981' },
      { label: 'Jackpot (1500-2500)', rate: '2%', color: '#a855f7' },
    ]
  }
};

const Dice = ({ value, rolling, color }) => {
  const dots = {
    1: [[50, 50]],
    2: [[20, 20], [80, 80]],
    3: [[20, 20], [50, 50], [80, 80]],
    4: [[20, 20], [80, 20], [20, 80], [80, 80]],
    5: [[20, 20], [80, 20], [50, 50], [20, 80], [80, 80]],
    6: [[20, 20], [80, 20], [20, 50], [80, 50], [20, 80], [80, 80]],
  };

  return (
    <motion.div
      animate={rolling ? {
        rotateX: [0, 360, 720, 1080],
        rotateY: [0, 360, 720, 1080],
        scale: [1, 1.2, 0.9, 1],
        x: [0, -10, 10, -10, 0],
        y: [0, 10, -10, 10, 0]
      } : {}}
      transition={rolling ? { duration: 1, ease: "easeInOut" } : { duration: 0.5 }}
      style={{
        width: '120px',
        height: '120px',
        background: 'white',
        borderRadius: '20px',
        position: 'relative',
        boxShadow: `0 0 30px ${color}40`,
        border: `4px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {dots[value].map(([x, y], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: '18px',
            height: '18px',
            background: color,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `inset 0 0 5px rgba(0,0,0,0.3)`
          }}
        />
      ))}
    </motion.div>
  );
};

export default function DiceRoll() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('d4_credits');
    return saved ? parseInt(saved) : 200;
  });
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [isRolling, setIsRolling] = useState(false);
  const [dice, setDice] = useState([1, 1]);
  const [result, setResult] = useState(null);
  const [recentRolls, setRecentRolls] = useState([]);

  const settings = DIFFICULTY_SETTINGS[difficulty];

  useEffect(() => {
    localStorage.setItem('d4_credits', balance.toString());
  }, [balance]);

  const handleRoll = () => {
    if (balance < settings.cost || isRolling) return;

    setBalance(prev => prev - settings.cost);
    setIsRolling(true);
    setResult(null);

    // Initial random shuffle during animation
    const interval = setInterval(() => {
      setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalDice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
      const total = finalDice[0] + finalDice[1];
      setDice(finalDice);
      
      const rand = Math.random() * 100;
      let winningPrize = 0;
      let tierLabel = 'LOSE';
      const rates = settings.rates;

      if (rand < parseFloat(rates[0].rate)) {
        winningPrize = 0;
        tierLabel = 'LOSE';
      } else if (rand < 70) {
        const [min, max] = rates[1].label.match(/\d+/g).map(Number);
        winningPrize = Math.floor(Math.random() * (max - min + 1)) + min;
        tierLabel = 'SMALL';
      } else if (rand < 90) {
        const [min, max] = rates[2].label.match(/\d+/g).map(Number);
        winningPrize = Math.floor(Math.random() * (max - min + 1)) + min;
        tierLabel = 'MEDIUM';
      } else if (rand < 98) {
        const [min, max] = rates[3].label.match(/\d+/g).map(Number);
        winningPrize = Math.floor(Math.random() * (max - min + 1)) + min;
        tierLabel = 'BIG';
      } else {
        const [min, max] = rates[4].label.match(/\d+/g).map(Number);
        winningPrize = Math.floor(Math.random() * (max - min + 1)) + min;
        tierLabel = 'JACKPOT';
      }

      setIsRolling(false);
      setResult({ total, amount: winningPrize, label: tierLabel });
      setBalance(prev => prev + winningPrize);
      setRecentRolls(prev => [
        { id: Date.now(), total, amount: winningPrize, label: tierLabel, difficulty: settings.label },
        ...prev.slice(0, 4)
      ]);
    }, 1000);
  };

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
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
        
        <h1 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)', fontWeight: '900', textAlign: 'center', color: '#ef4444' }}>
          DICE ROLL
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Difficulty */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '0.2em' }}>SELECT DIFFICULTY</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {Object.entries(DIFFICULTY_SETTINGS).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => !isRolling && setDifficulty(key)}
                  style={{
                    padding: '24px',
                    borderRadius: '16px',
                    border: `2px solid ${difficulty === key ? cfg.color : 'rgba(255,255,255,0.05)'}`,
                    background: difficulty === key ? `${cfg.color}15` : 'rgba(255,255,255,0.02)',
                    cursor: isRolling ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: cfg.color, margin: '0 auto 12px' }} />
                  <div style={{ fontWeight: '900', color: difficulty === key ? 'white' : 'var(--text-secondary)' }}>{cfg.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cost: {cfg.cost}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Game Area */}
          <div className="glass-panel" style={{ 
            padding: '60px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '40px',
            border: `2px solid #ef444440`,
            background: 'rgba(0,0,0,0.6)',
            minHeight: '450px'
          }}>
            <div style={{ display: 'flex', gap: '40px' }}>
              <Dice value={dice[0]} rolling={isRolling} color="#ef4444" />
              <Dice value={dice[1]} rolling={isRolling} color="#ef4444" />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'white', marginBottom: '8px' }}>
                Total Roll: {dice[0] + dice[1]}
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>Roll the dice to test your luck!</p>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '20px 40px',
                    borderRadius: '12px',
                    background: result.amount > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                    border: `1px solid ${result.amount > 0 ? '#10b981' : '#dc2626'}`,
                    color: result.amount > 0 ? '#10b981' : '#dc2626',
                    fontWeight: '800',
                    fontSize: '1.2rem'
                  }}
                >
                  {result.amount > 0 ? `+${result.amount.toLocaleString()} CREDITS! (${result.label})` : 'BETTER LUCK NEXT TIME!'}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleRoll}
              disabled={isRolling || balance < settings.cost}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '24px',
                fontSize: '1.2rem',
                fontWeight: '900',
                background: balance < settings.cost ? 'rgba(255,255,255,0.05)' : 'white',
                color: 'black',
                opacity: (isRolling || balance < settings.cost) ? 0.5 : 1
              }}
            >
              {balance < settings.cost ? 'NOT ENOUGH CREDITS' : `ROLL DICE (${settings.cost})`}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid #ef444440' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: '#ef4444' }}>
              <Info size={18} /> GAME INFO
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Cost Per Roll</span>
                <span style={{ fontWeight: '700' }}>{settings.cost} Credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Max Prize</span>
                <span style={{ fontWeight: '700', color: '#10b981' }}>{settings.rates[4].label.split('-')[1].replace(')', '')} Credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Difficulty</span>
                <span style={{ fontWeight: '700', color: settings.color }}>{settings.label}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: '#0ea5e9' }}>
              <History size={18} /> RECENT ROLLS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentRolls.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>No rolls yet</div>
              ) : (
                recentRolls.map(roll => (
                  <div key={roll.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.8rem' }}>Roll: {roll.total}</span>
                    <span style={{ fontWeight: '900', color: roll.amount > 0 ? '#10b981' : '#dc2626' }}>
                      {roll.amount > 0 ? `+${roll.amount}` : '0'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: '#fbbf24' }}>
              <Sparkles size={18} /> WIN CHANCES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {settings.rates.map((rate, i) => (
                <div key={i} style={{ 
                  padding: '10px', 
                  borderRadius: '6px', 
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${rate.color}40`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{rate.label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '900', color: rate.color }}>{rate.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
