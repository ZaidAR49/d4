import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, Coins, Info, History, Trophy, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DIFFICULTY_SETTINGS = {
  EASY: {
    cost: 25,
    prizes: [50, 0, 40, 0, 30, 0, 45, 0, 35, 0, 0, 0],
    color: '#10b981',
    label: 'EASY',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
  },
  MEDIUM: {
    cost: 50,
    prizes: [100, 0, 75, 0, 85, 0, 95, 0, 90, 0, 80, 0],
    color: '#fbbf24',
    label: 'MEDIUM',
    gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)'
  },
  HARD: {
    cost: 100,
    prizes: [150, 0, 125, 0, 135, 0, 145, 0, 140, 0, 130, 0],
    color: '#a855f7',
    label: 'HARD',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)'
  }
};

const WheelSVG = ({ prizes, difficultyColor, rotation }) => {
  const size = 400;
  const center = size / 2;
  const radius = center - 10;
  const totalSlices = prizes.length;
  const anglePerSlice = 360 / totalSlices;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ rotate: rotation, filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.2))' }}
    >
      {/* Outer Glow Ring */}
      <circle cx={center} cy={center} r={center - 2} fill="none" stroke="#d4af37" strokeWidth="8" strokeOpacity="0.2" />
      
      {/* Main Outer Border (Gold) */}
      <circle cx={center} cy={center} r={center - 4} fill="#1a1a1a" stroke="#d4af37" strokeWidth="4" />
      
      {/* Slices */}
      {prizes.map((prize, i) => {
        const startAngle = i * anglePerSlice;
        const endAngle = (i + 1) * anglePerSlice;
        const x1 = center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180);
        const y1 = center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180);
        const x2 = center + radius * Math.cos((Math.PI * (endAngle - 90)) / 180);
        const y2 = center + radius * Math.sin((Math.PI * (endAngle - 90)) / 180);

        const largeArcFlag = anglePerSlice > 180 ? 1 : 0;
        const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        return (
          <g key={i}>
            <path
              d={pathData}
              fill={i % 2 === 0 ? (prize > 0 ? '#600' : '#400') : (prize > 0 ? '#b00' : '#800')} 
              stroke="#d4af37" 
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            {/* Value Indicators */}
            <text
              x={center}
              y={center - radius * 0.78}
              fill={prize > 0 ? '#FFD700' : '#ffffff'}
              fontSize="18"
              fontWeight="900"
              textAnchor="middle"
              transform={`rotate(${startAngle + anglePerSlice / 2}, ${center}, ${center})`}
              style={{ 
                fontFamily: 'Space Grotesk', 
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,1))',
                letterSpacing: '0.05em'
              }}
            >
              {prize}
            </text>
            
            {/* Slice Separators Dots */}
            <circle 
                cx={center + radius * Math.cos((Math.PI * (startAngle - 90)) / 180)}
                cy={center + radius * Math.sin((Math.PI * (startAngle - 90)) / 180)}
                r="3"
                fill="#d4af37"
            />
          </g>
        );
      })}

      {/* Decorative Hub */}
      <circle cx={center} cy={center} r="35" fill="#111" stroke="#d4af37" strokeWidth="2" />
      <circle cx={center} cy={center} r="30" fill="url(#hubGradient)" stroke="#d4af37" strokeWidth="1" />
      <defs>
        <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
      </defs>
      <text
        x={center}
        y={center + 5}
        fill="#d4af37"
        fontSize="14"
        fontWeight="900"
        textAnchor="middle"
        style={{ fontFamily: 'Space Grotesk' }}
      >
        D4
      </text>
    </motion.svg>
  );
};

export default function SpinTheWheel() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('d4_credits');
    return saved ? parseInt(saved) : 200;
  });
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [recentSpins, setRecentSpins] = useState([]);
  const [result, setResult] = useState(null);
  
  const currentRotation = useRef(0);
  const settings = DIFFICULTY_SETTINGS[difficulty];

  useEffect(() => {
    localStorage.setItem('d4_credits', balance.toString());
  }, [balance]);

  const handleSpin = () => {
    if (balance < settings.cost || isSpinning) return;

    setBalance(prev => prev - settings.cost);
    setIsSpinning(true);
    setResult(null);

    const totalSlices = settings.prizes.length;
    const anglePerSlice = 360 / totalSlices;
    
    // Pick a random winning index
    const winningIndex = Math.floor(Math.random() * totalSlices);
    const winningPrize = settings.prizes[winningIndex];

    // Calculate rotation:
    // 1. Current position + 5-10 full spins (spins * 360)
    // 2. Minus the starting slice offset
    // 3. The slice we want to land on must be at the top center (-90deg offset in SVG, but we rotate the whole SVG)
    // The top center is 0 deg. If we land at winningIndex, its center is relative to start.
    // Precise Rotation Logic:
    // 1. Calculate how many full spins we want to add (at least 5)
    // 2. Adjust target rotation to end at exactly the winning slice center
    const spins = 10 + Math.floor(Math.random() * 5);
    const stopAngle = 360 - (winningIndex * anglePerSlice + anglePerSlice / 2);
    
    // We must ensure the new rotation is greater than the current one to spin forward.
    // Calculate the nearest multiple of 360 above the current rotation, then add spins and the stop angle.
    const currentFullSpins = Math.floor(currentRotation.current / 360);
    const nextRotation = (currentFullSpins + spins) * 360 + stopAngle;

    setRotation(nextRotation);
    currentRotation.current = nextRotation;

    // Wait slightly longer than 4.5s transition to ensure it's fully stopped
    setTimeout(() => {
      setIsSpinning(false);
      setResult(winningPrize);
      setBalance(prev => {
        const newBalance = prev + winningPrize;
        localStorage.setItem('d4_credits', newBalance.toString());
        return newBalance;
      });
      setRecentSpins(prev => [
        { id: Date.now(), amount: winningPrize, difficulty: settings.label },
        ...prev.slice(0, 4)
      ]);
    }, 4600);
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
        
        <h1 className="text-gradient" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: '900', textAlign: 'center' }}>
          SPIN THE WHEEL
        </h1>

        <div className="glass-panel" style={{ padding: '8px 20px', border: '2px solid #fbbf24' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: '800' }}>BALANCE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={18} color="#fbbf24" />
              <span style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>{balance}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
        {/* Main Game Area */}
        <div className="glass-panel" style={{ 
          padding: '40px', 
          minHeight: '650px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '40px', 
          position: 'relative',
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(212, 175, 55, 0.2)'
        }}>
          
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '0.2em' }}>SELECT DIFFICULTY</h3>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {Object.entries(DIFFICULTY_SETTINGS).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => !isSpinning && setDifficulty(key)}
                  style={{
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: `2px solid ${difficulty === key ? cfg.color : 'rgba(255,255,255,0.05)'}`,
                    background: difficulty === key ? `${cfg.color}15` : 'rgba(255,255,255,0.02)',
                    cursor: isSpinning ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    minWidth: '110px'
                  }}
                >
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: cfg.color, margin: '0 auto 10px', boxShadow: `0 0 10px ${cfg.color}` }} />
                    <div style={{ fontWeight: '900', color: difficulty === key ? 'white' : 'var(--text-secondary)', fontSize: '0.9rem' }}>{cfg.label}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{cfg.cost} CR</div>
                </button>
              ))}
            </div>
          </div>

          {/* The Wheel */}
          <div style={{ position: 'relative', width: 'clamp(280px, 80vw, 400px)', height: 'clamp(280px, 80vw, 400px)' }}>
            {/* Pointer */}
            <div style={{ 
              position: 'absolute', 
              top: '-10px', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              zIndex: 10,
              width: '0',
              height: '0',
              borderLeft: '15px solid transparent',
              borderRight: '15px solid transparent',
              borderTop: '35px solid #FFD700',
              filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.8))'
            }} />

            <div style={{
              width: '100%',
              height: '100%',
              transition: isSpinning ? 'transform 4.5s cubic-bezier(0.1, 0, 0.1, 1)' : 'transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 1.2)', // Bounce effect when stopping
              transform: `rotate(${rotation}deg)`
            }}>
              <WheelSVG prizes={settings.prizes} difficultyColor={settings.color} rotation={0} />
            </div>
          </div>

          <button
            onClick={handleSpin}
            disabled={isSpinning || balance < settings.cost}
            className="btn-primary"
            style={{
              padding: '20px 80px',
              fontSize: '1.5rem',
              fontWeight: '900',
              background: 'linear-gradient(45deg, #d4af37, #FFD700)',
              color: 'black',
              border: 'none',
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
              cursor: (isSpinning || balance < settings.cost) ? 'not-allowed' : 'pointer',
              opacity: (isSpinning || balance < settings.cost) ? 0.5 : 1,
              fontFamily: 'Space Grotesk'
            }}
          >
            SPIN ({settings.cost} CREDITS)
          </button>

          {/* Result Backdrop Overlay */}
          <AnimatePresence>
            {result !== null && !isSpinning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.85)',
                  zIndex: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '16px',
                  padding: '40px'
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{ 
                    fontSize: '60px', 
                    marginBottom: '20px', 
                    filter: `drop-shadow(0 0 20px ${result > 0 ? '#10b981' : '#dc2626'})` 
                  }}>
                    {result > 0 ? '🏆' : '💀'}
                  </div>
                  <h2 style={{ 
                    fontSize: '3rem', 
                    fontWeight: '900', 
                    fontFamily: 'Space Grotesk',
                    color: result > 0 ? '#10b981' : '#dc2626',
                    marginBottom: '10px'
                  }}>
                    {result > 0 ? 'WINNER!' : 'BETTER LUCK!'}
                  </h2>
                  <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                    {result > 0 ? `You won ${result} credits` : `You lost ${settings.cost} credits`}
                  </p>
                  <button 
                    onClick={() => setResult(null)}
                    className="btn-primary"
                    style={{ background: 'white', color: 'black', padding: '12px 32px' }}
                  >
                    CONTINUE
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info Side Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', border: `1px solid ${settings.color}40`, background: 'rgba(0,0,0,0.4)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: '#fbbf24' }}>
              <Trophy size={18} /> GAME INFO
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '800', display: 'block', marginBottom: '4px' }}>CONCEPT</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                  Spin the wheel to multiplier your credits. Land on the high-value segments or hit the jackpot for the ultimate prize!
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cost per Spin</span>
                <span style={{ fontWeight: '800' }}>{settings.cost} Credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Max Prize</span>
                <span style={{ fontWeight: '700', color: '#10b981' }}>{Math.max(...settings.prizes)} Credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Difficulty</span>
                <span style={{ fontWeight: '700', color: settings.color }}>{settings.label}</span>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', background: 'rgba(0,0,0,0.4)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: '#0ea5e9' }}>
              <History size={18} /> RECENT SPINS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentSpins.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>No spins yet</div>
              ) : (
                recentSpins.map(spin => (
                  <div key={spin.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px' }}>{spin.difficulty}</span>
                    <span style={{ fontSize: '14px', fontWeight: '900', color: spin.amount > 0 ? '#10b981' : '#dc2626' }}>
                      {spin.amount > 0 ? `+${spin.amount}` : spin.amount}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px', background: 'rgba(0,0,0,0.4)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '800', marginBottom: '20px', color: '#fbbf24' }}>
              <Trophy size={18} /> PRIZE TABLE
            </h4>
            <div style={{ gridTemplateColumns: 'repeat(3, 1fr)', display: 'grid', gap: '8px' }}>
              {[...new Set(settings.prizes)].sort((a,b) => b-a).map((prize, i) => (
                <div key={i} style={{ 
                  padding: '10px', 
                  borderRadius: '6px', 
                  background: 'rgba(255,255,255,0.05)',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '800',
                  color: prize > 0 ? '#10b981' : '#dc2626',
                  border: `1px solid ${prize > 0 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(220, 38, 38, 0.2)'}`
                }}>
                  {prize}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
