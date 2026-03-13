import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Trophy, Sparkles, Dices, Package, Check, Clock, Lock, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ title, icon: Icon, description, rewards, borderColor, glowColor, onPlay, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    onClick={() => onPlay(rewards[1].bet, rewards[1].win, title)}
    className="glass-card"
    style={{
      padding: '32px',
      borderRadius: '24px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      border: `1px solid ${borderColor}`,
      boxShadow: `0 0 30px ${glowColor}15`,
      cursor: 'pointer'
    }}
  >
    <div style={{
      width: '56px',
      height: '56px',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      border: `2px solid ${borderColor}`
    }}>
      <Icon size={28} />
    </div>
    
    <div>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '800', 
        color: 'white',
        fontFamily: 'Space Grotesk',
        marginBottom: '12px'
      }}>
        {title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>

    <div style={{ marginTop: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {rewards.map((reward, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onPlay(reward.bet, reward.win, title);
            }}
            className="navbar-link"
            style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 16px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: borderColor }} />
              <span style={{ fontWeight: '700' }}>{reward.difficulty.toUpperCase()}</span>
            </div>
            <div style={{ fontFamily: 'Space Grotesk' }}>
              {reward.bet} credits → <span style={{ color: 'white' }}>Win {reward.win}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);

export default function MiniGames() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('d4_credits');
    return saved ? parseInt(saved) : 200;
  });
  const [lastBonusTime, setLastBonusTime] = useState(() => {
    return localStorage.getItem('d4_last_bonus') || 0;
  });
  const [timeLeft, setTimeLeft] = useState('');
  const [canClaim, setCanClaim] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showDevModal, setShowDevModal] = useState(false);
  const [devPassword, setDevPassword] = useState('');
  const [isDev, setIsDev] = useState(() => {
    return localStorage.getItem('d4_is_dev') === 'true';
  });
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    localStorage.setItem('d4_credits', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('d4_last_bonus', lastBonusTime.toString());
  }, [lastBonusTime]);

  const updateCooldown = useCallback(() => {
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;
    const diff = now - parseInt(lastBonusTime);
    
    if (diff >= cooldown) {
      setCanClaim(true);
      setTimeLeft('READY TO CLAIM');
    } else {
      setCanClaim(false);
      const remaining = cooldown - diff;
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }
  }, [lastBonusTime]);

  useEffect(() => {
    updateCooldown();
    const timer = setInterval(updateCooldown, 1000);
    return () => clearInterval(timer);
  }, [updateCooldown]);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const claimBonus = () => {
    if (!canClaim) return;
    setBalance(prev => prev + 100);
    setLastBonusTime(Date.now());
    showFeedback('+100 CREDITS COLLECTED!');
  };

  const handleDevAuth = (e) => {
    e.preventDefault();
    if (devPassword === 'zaidopen') {
      setBalance(99999999);
      setIsDev(true);
      localStorage.setItem('d4_is_dev', 'true');
      setShowDevModal(false);
      setDevPassword('');
      setModalError('');
      showFeedback('DEV MODE ACTIVATED: INFINITE TOKENS GRANTED!', 'info');
    } else {
      setModalError('ACCESS DENIED: INVALID MASTER PASSWORD');
      setTimeout(() => setModalError(''), 3000);
    }
  };

  const handlePlay = (bet, winRange, gameName) => {
    if (balance < bet) {
      showFeedback('NOT ENOUGH CREDITS!', 'error');
      return;
    }

    if (gameName === 'SPIN THE WHEEL') {
      navigate('/minigames/spin');
      return;
    }

    if (gameName === 'MYSTERY BOX') {
      navigate('/minigames/box');
      return;
    }

    if (gameName === 'DICE ROLL') {
      navigate('/minigames/dice');
      return;
    }

    setBalance(prev => prev - bet);
    
    // Simulate delay for excitement
    setTimeout(() => {
      const [min, max] = winRange.split('-').map(Number);
      const win = Math.floor(Math.random() * (max - min + 1)) + min;
      setBalance(prev => prev + win);
      
      const profit = win - bet;
      if (profit > 0) {
        showFeedback(`JACKPOT! YOU WON ${win} CREDITS!`);
      } else if (profit === 0) {
        showFeedback(`BREAK EVEN! RETURNED ${win} CREDITS`, 'info');
      } else {
        showFeedback(`BAD LUCK! RETURNED ${win} CREDITS`, 'error');
      }
    }, 500);
  };

  const creditGames = [
    {
      title: 'SPIN THE WHEEL',
      icon: Sparkles,
      description: 'Spin for credits! Higher bets = bigger prizes',
      borderColor: 'var(--text-primary)',
      glowColor: 'var(--text-primary)',
      rewards: [
        { difficulty: 'Easy', bet: 25, win: '30-50' },
        { difficulty: 'Medium', bet: 50, win: '75-100' },
        { difficulty: 'Hard', bet: 100, win: '125-150' },
      ],
      delay: 0.1
    },
    {
      title: 'DICE ROLL',
      icon: Dices,
      description: 'Roll the dice & match the target number',
      borderColor: 'var(--text-secondary)',
      glowColor: 'var(--text-secondary)',
      rewards: [
        { difficulty: 'Easy', bet: 25, win: '25-40' },
        { difficulty: 'Medium', bet: 50, win: '75-100' },
        { difficulty: 'Hard', bet: 100, win: '125-150' },
      ],
      delay: 0.2
    },
    {
      title: 'MYSTERY BOX',
      icon: Package,
      description: 'Choose a mystery box for random rewards!',
      borderColor: 'var(--text-muted)',
      glowColor: 'var(--text-muted)',
      rewards: [
        { difficulty: 'Easy', bet: 20, win: '10-50' },
        { difficulty: 'Medium', bet: 40, win: '20-120' },
        { difficulty: 'Hard', bet: 80, win: '50-300' },
      ],
      delay: 0.3
    }
  ];

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      {/* Feedback Toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              zIndex: 2000,
              padding: '16px 32px',
              borderRadius: '16px',
              background: feedback.type === 'error' ? 'var(--accent-magenta)' : 
                         feedback.type === 'info' ? 'var(--accent-indigo)' : 'var(--accent-cyan)',
              color: 'black',
              fontWeight: '900',
              fontFamily: 'Space Grotesk',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              letterSpacing: '0.05em'
            }}
          >
            {feedback.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dev Auth Modal */}
      <AnimatePresence>
        {showDevModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backdropFilter: 'blur(8px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '450px',
                padding: '40px',
                border: '2px solid #10b981',
                boxShadow: '0 0 50px rgba(16, 185, 129, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Lock size={24} color="#10b981" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#10b981', fontFamily: 'Space Grotesk', letterSpacing: '0.05em' }}>
                  DEV AUTHENTICATION
                </h2>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.95rem' }}>
                Enter the master password to activate DEV mode
              </p>

              {modalError && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(220, 38, 38, 0.1)',
                    border: '1px solid #dc2626',
                    color: '#dc2626',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}
                >
                  {modalError}
                </motion.div>
              )}

              <form onSubmit={handleDevAuth}>
                <input
                  type="password"
                  placeholder="Enter password..."
                  value={devPassword}
                  onChange={(e) => setDevPassword(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    padding: '16px',
                    color: 'white',
                    fontFamily: 'Space Grotesk',
                    fontSize: '1rem',
                    marginBottom: '32px',
                    outline: 'none'
                  }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      background: '#10b981',
                      color: 'black',
                      padding: '14px',
                      borderRadius: '8px',
                      fontWeight: '800'
                    }}
                  >
                    AUTHENTICATE
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDevModal(false);
                      setDevPassword('');
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid #dc2626',
                      color: '#dc2626',
                      padding: '14px',
                      borderRadius: '8px',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header & Balance */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        marginBottom: '60px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900' }}>
          MINI GAMES
        </h1>
        
        <div className="glass-panel" style={{ 
          padding: '12px 24px', 
          border: '2px solid #fbbf24',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)'
        }}>
          {!isDev && (
            <button 
              onClick={() => setShowDevModal(true)}
              style={{ 
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: 0.5, 
                borderRight: '1px solid var(--border-subtle)', 
                paddingRight: '12px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Lock size={16} color="#fbbf24" />
            </button>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: isDev ? '0' : '0' }}>
            <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: '800', letterSpacing: '0.1em' }}>BALANCE</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Coins size={18} color="#fbbf24" />
              <span style={{ fontSize: '24px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>{balance.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Bonus Section */}
      <div className="glass-panel" style={{ 
        padding: '32px', 
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
        background: canClaim ? 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(10,10,10,0.8) 100%)' :
                              'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(10,10,10,0.8) 100%)',
        border: canClaim ? '1px solid var(--text-primary)' : '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            background: canClaim ? 'var(--text-primary)' : 'var(--text-secondary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: canClaim ? '0 0 20px rgba(255, 255, 255, 0.4)' : '0 0 20px rgba(255,255,255,0.1)'
          }}>
            <Clock size={28} color={canClaim ? 'black' : 'white'} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'Space Grotesk' }}>DAILY BONUS</h3>
            <p style={{ 
              color: canClaim ? 'var(--text-primary)' : 'var(--text-secondary)', 
              fontSize: '0.9rem', 
              fontWeight: '600' 
            }}>
              {canClaim ? 'AVAILABLE NOW!' : `Next bonus in: ${timeLeft}`}
            </p>
          </div>
        </div>
        <button 
          onClick={claimBonus}
          className="btn-primary" 
          style={{ 
            opacity: canClaim ? 1 : 0.5, 
            cursor: canClaim ? 'pointer' : 'not-allowed',
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px' 
          }}
        >
          <Coins size={18} />
          {canClaim ? 'CLAIM 100 CREDITS' : 'CLAIMED'}
        </button>
      </div>

      {/* Welcome Section */}
      <div className="glass-panel" style={{ 
        padding: '32px', 
        marginBottom: '60px',
        border: '1px solid var(--accent-indigo)',
        boxShadow: '0 0 30px rgba(99, 102, 241, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Sparkles size={24} color="var(--text-primary)" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Space Grotesk' }}>WELCOME TO MINI GAMES!</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '1.1rem' }}>
          Test your luck and skills with our collection of fun mini-games!
        </p>
        <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '12px' }}>
          Earn credits through games and challenges, or claim your daily bonus every 24 hours.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#fbbf24', fontWeight: '700' }}>
          <div style={{ padding: '4px', borderRadius: '4px', background: 'rgba(251, 191, 36, 0.1)' }}>💰</div>
          Starting balance: 200 credits | Get 100 more credits every day!
        </div>
      </div>

      {/* Credit Games Section */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Coins size={28} color="var(--text-primary)" />
          <h2 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Space Grotesk' }}>CREDIT GAMES</h2>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {creditGames.map((game, index) => (
            <GameCard key={index} {...game} onPlay={handlePlay} />
          ))}
        </div>
      </div>

      {/* Party Games Section */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Trophy size={28} color="var(--accent-magenta)" />
          <h2 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Space Grotesk' }}>PARTY GAMES</h2>
        </div>
        
        <div className="glass-panel" style={{ 
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '24px', 
            background: 'rgba(255,255,255,0.05)', 
            border: '2px solid var(--accent-indigo)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src="/Skull.png" alt="Cards" style={{ width: '60px', height: '60px' }} />
          </div>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: '900', fontFamily: 'Space Grotesk', marginBottom: '12px' }}>D4 VIBE CARDS</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem', maxWidth: '800px' }}>
              Hilarious card game with gaming & adult-themed content. Fill in the blanks with the funniest white cards!
            </p>
            <div style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '32px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', flex: 1 }}>
                <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />3-10 players supported</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />200+ black cards</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />600+ white cards</li>
                </ul>
                <ul style={{ listStyle: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-primary)' }} />Create/join lobbies</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-primary)' }} />Play with bots or friends</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-primary)' }} />Cost: 10 credits per game</li>
                </ul>
              </div>
              
              <button 
                onClick={() => handlePlay(10, '0-0', 'VIBE CARDS')}
                className="btn-primary"
                style={{
                  padding: '20px 40px',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'white',
                  color: 'black'
                }}
              >
                <Play size={24} fill="black" />
                PLAY NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Game Tips Section */}
      <div className="glass-panel" style={{ 
        padding: '40px',
        border: '1px solid var(--accent-indigo)',
        background: 'rgba(10, 10, 10, 0.5)'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '24px', fontFamily: 'Space Grotesk' }}>GAME TIPS</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px' 
        }}>
          {[
            'Claim daily bonus for free credits',
            'Higher difficulty = bigger rewards',
            'Manage your credits wisely',
            'Play party games with friends',
            'Have fun & enjoy the games!',
            'Check back daily for bonuses'
          ].map((tip, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '1rem' }}>
              <Check size={18} color="var(--accent-cyan)" />
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
