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
      { label: 'Sum 2-6 (Lose)', rate: '41.6%', color: '#dc2626' },
      { label: 'Sum 7 (1.2x)', rate: '16.7%', color: '#fbbf24' },
      { label: 'Sum 8-9 (1.5x-2x)', rate: '25%', color: '#0ea5e9' },
      { label: 'Sum 10-11 (3x-5x)', rate: '13.9%', color: '#10b981' },
      { label: 'Sum 12 (15x)', rate: '2.8%', color: '#a855f7' },
    ]
  },
  MEDIUM: {
    cost: 50,
    winRange: '75-100',
    color: '#fbbf24',
    label: 'MEDIUM',
    rates: [
      { label: 'Sum 2-6 (Lose)', rate: '41.6%', color: '#dc2626' },
      { label: 'Sum 7 (1.2x)', rate: '16.7%', color: '#fbbf24' },
      { label: 'Sum 8-9 (1.5x-2x)', rate: '25%', color: '#0ea5e9' },
      { label: 'Sum 10-11 (3x-5x)', rate: '13.9%', color: '#10b981' },
      { label: 'Sum 12 (15x)', rate: '2.8%', color: '#a855f7' },
    ]
  },
  HARD: {
    cost: 100,
    winRange: '125-150',
    color: '#ef4444',
    label: 'HARD',
    rates: [
      { label: 'Sum 2-6 (Lose)', rate: '41.6%', color: '#dc2626' },
      { label: 'Sum 7 (1.2x)', rate: '16.7%', color: '#fbbf24' },
      { label: 'Sum 8-9 (1.5x-2x)', rate: '25%', color: '#0ea5e9' },
      { label: 'Sum 10-11 (3x-5x)', rate: '13.9%', color: '#10b981' },
      { label: 'Sum 12 (15x)', rate: '2.8%', color: '#a855f7' },
    ]
  }
};

// Map results to rotations: [rotateX, rotateY]
const RESULT_ROTATIONS = {
  1: [0, 0],
  2: [0, 90],
  3: [270, 0],
  4: [90, 0],
  5: [0, 270],
  6: [180, 0],
};

const DiceFace = ({ value, style, color }) => {
  const dots = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [75, 25], [25, 75], [75, 75]],
    5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
    6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        background: 'white',
        border: `2px solid ${color}40`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        boxShadow: `inset 0 0 15px rgba(0,0,0,0.1)`,
        ...style
      }}
    >
      {dots[value].map(([x, y], i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: '14px',
            height: '14px',
            background: color,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 1px 2px rgba(0,0,0,0.3)`
          }}
        />
      ))}
    </div>
  );
};

const Dice3D = ({ value, rolling, color }) => {
  const [rot, setRot] = useState([0, 0]);

  useEffect(() => {
    if (!rolling && RESULT_ROTATIONS[value]) {
      setRot(RESULT_ROTATIONS[value]);
    }
  }, [value, rolling]);

  return (
    <div style={{ perspective: '800px', width: '100px', height: '100px' }}>
      <motion.div
        animate={rolling ? {
          rotateX: [0, 360 * 3, 360 * 6 + (RESULT_ROTATIONS[value]?.[0] || 0)],
          rotateY: [0, 360 * 2, 360 * 4 + (RESULT_ROTATIONS[value]?.[1] || 0)],
          z: [0, 50, 0]
        } : {
          rotateX: rot[0] || 0,
          rotateY: rot[1] || 0,
        }}
        transition={rolling ? {
          duration: 2,
          ease: [0.45, 0.05, 0.55, 0.95]
        } : {
          type: "spring",
          stiffness: 100,
          damping: 10
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d'
        }}
      >
        <DiceFace value={1} color={color} style={{ transform: 'rotateY(0deg) translateZ(50px)' }} />
        <DiceFace value={6} color={color} style={{ transform: 'rotateY(180deg) translateZ(50px)' }} />
        <DiceFace value={5} color={color} style={{ transform: 'rotateY(90deg) translateZ(50px)' }} />
        <DiceFace value={2} color={color} style={{ transform: 'rotateY(-90deg) translateZ(50px)' }} />
        <DiceFace value={3} color={color} style={{ transform: 'rotateX(90deg) translateZ(50px)' }} />
        <DiceFace value={4} color={color} style={{ transform: 'rotateX(-90deg) translateZ(50px)' }} />
      </motion.div>
    </div>
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
  const [diceValues, setDiceValues] = useState([1, 1]);
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

    // Predetermine result
    const newDice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    const total = newDice[0] + newDice[1];
    
    setTimeout(() => {
      setDiceValues(newDice);
      
      let winningPrize = 0;
      let tierLabel = 'LOSE';

      // Authentic Sum-Based Logic
      if (total > 6) {
        // Multipliers based on sum
        let multiplier = 0;
        if (total === 7) { multiplier = 1.2; tierLabel = '7 - LUCKY'; }
        else if (total === 8) { multiplier = 1.5; tierLabel = '8 - SOLID'; }
        else if (total === 9) { multiplier = 2.0; tierLabel = '9 - GREAT'; }
        else if (total === 10) { multiplier = 3.0; tierLabel = '10 - ELITE'; }
        else if (total === 11) { multiplier = 5.0; tierLabel = '11 - INSANE'; }
        else if (total === 12) { multiplier = 15.0; tierLabel = '12 - JACKPOT'; }
        
        // Difficulty bonus (HARD wins more)
        const difficultyBonus = difficulty === 'HARD' ? 1.5 : difficulty === 'MEDIUM' ? 1.2 : 1.0;
        winningPrize = Math.floor(settings.cost * multiplier * difficultyBonus);
      } else {
        winningPrize = 0;
        tierLabel = 'LOSE';
      }

      setIsRolling(false);
      setResult({ total, amount: winningPrize, label: tierLabel });
      setBalance(prev => prev + winningPrize);
      setRecentRolls(prev => [
        { id: Date.now(), total, amount: winningPrize, label: tierLabel, difficulty: settings.label },
        ...prev.slice(0, 4)
      ]);
    }, 2000); // 2 second animation
  };

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      {/* Background Overlay while rolling */}
      <AnimatePresence>
        {isRolling && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at center, ${settings.color} 0%, transparent 70%)`,
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      <div className="game-header">
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
            borderRadius: '12px',
            fontWeight: '800'
          }}
        >
          <ChevronLeft size={20} /> BACK
        </button>
        
        <h1 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', fontWeight: '900', textAlign: 'center', color: '#ef4444', letterSpacing: '-0.02em' }}>
          DICE ROLL
        </h1>

        <div className="glass-panel" style={{ padding: '8px 20px', border: '2px solid #fbbf24', borderRadius: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: '800', letterSpacing: '0.1em' }}>BALANCE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={18} color="#fbbf24" />
              <span style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>{balance.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="game-layout">
        <div className="game-main">
          {/* Difficulty */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '0.2em' }}>SELECT DIFFICULTY</h3>
            <div className="difficulty-grid">
              {Object.entries(DIFFICULTY_SETTINGS).map(([key, cfg]) => (
                <motion.button
                  key={key}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isRolling && setDifficulty(key)}
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    border: `2px solid ${difficulty === key ? cfg.color : 'rgba(255,255,255,0.05)'}`,
                    background: difficulty === key ? `${cfg.color}15` : 'rgba(255,255,255,0.03)',
                    cursor: isRolling ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: cfg.color, margin: '0 auto 12px', boxShadow: `0 0 10px ${cfg.color}` }} />
                  <div style={{ fontWeight: '900', color: difficulty === key ? 'white' : 'var(--text-secondary)', fontSize: '1.1rem' }}>{cfg.label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Cost: {cfg.cost}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Game Area */}
          <div className="glass-panel" style={{ 
            padding: '80px 60px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '60px',
            border: `2px solid #ef444420`,
            background: 'rgba(0,0,0,0.8)',
            borderRadius: '32px',
            minHeight: '550px',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', gap: '80px', height: '150px', alignItems: 'center' }}>
              <Dice3D value={diceValues[0]} rolling={isRolling} color="#ef4444" />
              <Dice3D value={diceValues[1]} rolling={isRolling} color="#ef4444" />
            </div>

            <div style={{ textAlign: 'center' }}>
              <motion.h2 
                animate={isRolling ? { scale: [1, 1.1, 1], opacity: [1, 0.5, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.5 }}
                style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '8px' }}
              >
                {isRolling ? 'ROLLING...' : `Total Roll: ${diceValues[0] + diceValues[1]}`}
              </motion.h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Roll the dice to test your luck!</p>
            </div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '24px 48px',
                    borderRadius: '16px',
                    background: result.amount > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                    border: `2px solid ${result.amount > 0 ? '#10b981' : '#dc2626'}`,
                    color: result.amount > 0 ? '#10b981' : '#dc2626',
                    fontWeight: '900',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    boxShadow: `0 0 30px ${result.amount > 0 ? '#10b98120' : '#dc262620'}`,
                    letterSpacing: '0.05em'
                  }}
                >
                  {result.amount > 0 ? (
                    <>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(16, 185, 129, 0.6)', marginBottom: '4px' }}>WINNER!</div>
                      +{result.amount.toLocaleString()} CREDITS
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '0.8rem', color: 'rgba(220, 38, 38, 0.6)', marginBottom: '4px' }}>UNLUCKY</div>
                      NOTHING!
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleRoll}
              disabled={isRolling || balance < settings.cost}
              className="btn-primary"
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '24px',
                fontSize: '1.4rem',
                fontWeight: '900',
                background: balance < settings.cost ? 'rgba(255,255,255,0.05)' : 'white',
                color: 'black',
                opacity: (isRolling || balance < settings.cost) ? 0.5 : 1,
                borderRadius: '16px',
                transition: 'all 0.3s ease'
              }}
            >
              {balance < settings.cost ? 'LOW BALANCE' : isRolling ? 'WAIT...' : `ROLL DICE (${settings.cost})`}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid #ef444440', borderRadius: '20px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '900', marginBottom: '20px', color: '#ef4444' }}>
              <Info size={18} /> GAME INFO
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '800', display: 'block', marginBottom: '4px' }}>CONCEPT</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                  Test your luck with the roll of two 3D dice. **Win if the sum is greater than 6.** Higher sums grant exponentially larger multipliers!
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cost Per Roll</span>
                <span style={{ fontWeight: '800' }}>{settings.cost} Credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Max Prize</span>
                <span style={{ fontWeight: '900', color: '#10b981' }}>
                  {Math.floor(settings.cost * 15 * (difficulty === 'HARD' ? 1.5 : difficulty === 'MEDIUM' ? 1.2 : 1.0))} Credits
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Difficulty</span>
                <span style={{ fontWeight: '900', color: settings.color }}>{settings.label}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '900', marginBottom: '20px', color: '#0ea5e9' }}>
              <History size={18} /> RECENT ROLLS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentRolls.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '20px' }}>No rolls yet</div>
              ) : (
                recentRolls.map(roll => (
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={roll.id} 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '16px', 
                      background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>TOTAL: {roll.total}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{roll.difficulty}</span>
                    </div>
                    <span style={{ fontWeight: '900', color: roll.amount > 0 ? '#10b981' : '#dc2626', alignSelf: 'center' }}>
                      {roll.amount > 0 ? `+${roll.amount}` : '0'}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '900', marginBottom: '20px', color: '#fbbf24' }}>
              <Sparkles size={18} /> WIN CHANCES
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {settings.rates.map((rate, i) => (
                <div key={i} style={{ 
                  padding: '12px', 
                  borderRadius: '10px', 
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${rate.color}30`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{rate.label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '900', color: rate.color }}>{rate.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
