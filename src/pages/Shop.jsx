import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Crown, TrendingUp, Palette, BadgeCheck, Zap, Heart, Sparkles, Gift, Shirt, MousePointer, MessageSquare, Monitor, Image, Trophy, Coins, Info, Check } from 'lucide-react';

const ShopItem = ({ item, onPurchase, canAfford }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="glass-card"
    style={{
      padding: '24px',
      borderRadius: '16px',
      border: `2px solid ${item.borderColor}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%',
      transition: 'all 0.3s ease'
    }}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          color: item.borderColor, 
          background: `${item.borderColor}15`, 
          padding: '10px', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <item.icon size={24} />
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'Space Grotesk' }}>{item.name}</h3>
      </div>
      {item.stock && (
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '600' }}>
          Stock: {item.stock} left
        </span>
      )}
    </div>

    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', flex: 1 }}>{item.description}</p>

    <div style={{ 
      padding: '8px 12px', 
      background: 'rgba(255,255,255,0.03)', 
      borderRadius: '8px', 
      fontSize: '11px', 
      color: item.borderColor,
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: item.borderColor }} />
      Duration: {item.duration}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Coins size={16} color="#fbbf24" />
      <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#fbbf24', fontFamily: 'Space Grotesk' }}>{item.price}</span>
    </div>

    <button
      onClick={() => canAfford && onPurchase(item)}
      disabled={!canAfford}
      className="btn-primary"
      style={{
        width: '100%',
        padding: '12px',
        fontSize: '0.85rem',
        opacity: canAfford ? 1 : 0.5,
        cursor: canAfford ? 'pointer' : 'not-allowed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: canAfford ? 'white' : 'rgba(255, 255, 255, 0.05)',
        color: canAfford ? 'black' : 'var(--text-muted)',
        border: 'none',
        fontWeight: '800'
      }}
    >
      {item.id === 'custom-color' ? (
        <><Palette size={16} /> CHOOSE COLOR</>
      ) : canAfford ? (
        <><ShoppingCart size={16} /> PURCHASE ITEM</>
      ) : (
        <><ShoppingCart size={16} /> NOT ENOUGH CREDITS</>
      )}
    </button>
  </motion.div>
);

export default function Shop() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('d4_credits');
    return saved ? parseInt(saved) : 200;
  });
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    localStorage.setItem('d4_credits', balance.toString());
  }, [balance]);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const categories = ['All Items', 'Perks', 'Boosts', 'Real-Life Items', 'Cosmetics'];
  
  const shopItems = [
    {
      id: 'vip-status',
      name: 'VIP Status',
      category: 'Perks',
      description: 'Special VIP badge, priority support, exclusive chat rooms',
      duration: '30 days',
      price: 1000,
      icon: Crown,
      borderColor: 'var(--accent-indigo)'
    },
    {
      id: 'double-xp',
      name: 'Double XP Weekend',
      category: 'Boosts',
      description: 'Earn 2x credits from challenges and games',
      duration: '3 days',
      price: 500,
      icon: TrendingUp,
      borderColor: 'var(--accent-indigo)'
    },
    {
      id: 'custom-color',
      name: 'Custom Username Color',
      category: 'Cosmetics',
      description: 'Change your username color to any RGB value you want',
      duration: 'Permanent',
      price: 350,
      icon: Palette,
      borderColor: 'var(--accent-indigo)'
    },
    {
      id: 'exclusive-badge',
      name: 'Exclusive D4 Badge',
      category: 'Perks',
      description: 'Show off your D4 supporter status with a unique badge',
      duration: 'Permanent',
      price: 750,
      icon: BadgeCheck,
      borderColor: 'var(--text-primary)'
    },
    {
      id: 'credit-multiplier',
      name: 'Credit Multiplier x2',
      category: 'Boosts',
      description: 'Double all credit earnings for 24 hours',
      duration: '24 hours',
      price: 800,
      icon: Zap,
      borderColor: '#fbbf24'
    },
    {
      id: 'lucky-boost',
      name: 'Lucky Boost',
      category: 'Boosts',
      description: 'Increase your chances in all games by 25%',
      duration: '12 hours',
      price: 1200,
      icon: Heart,
      borderColor: '#fbbf24'
    },
    {
      id: 'streak-saver',
      name: 'Streak Saver',
      category: 'Boosts',
      description: 'Protects your daily login streak if you miss a day',
      duration: 'One-time use',
      price: 400,
      icon: Sparkles,
      borderColor: '#fbbf24'
    },
    {
      id: 'energy-refill',
      name: 'Instant Energy Refill',
      category: 'Boosts',
      description: 'Instantly refresh all cooldowns and energy limits',
      duration: 'Instant',
      price: 600,
      icon: Zap,
      borderColor: 'var(--text-secondary)'
    },
    {
      id: 'sticker-pack',
      name: 'D4 Sticker Pack',
      category: 'Real-Life Items',
      description: 'Physical sticker pack with 10 unique D4 designs shipped to you',
      duration: 'Physical Item',
      price: 1500,
      stock: 50,
      icon: Gift,
      borderColor: '#10b981'
    },
    {
      id: 'tshirt',
      name: 'D4 Community T-Shirt',
      category: 'Real-Life Items',
      description: 'Exclusive black & white cyberpunk design tee (S-XXL available)',
      duration: 'Physical Item',
      price: 3000,
      stock: 25,
      icon: Shirt,
      borderColor: '#10b981'
    },
    {
      id: 'mousepad',
      name: 'Custom Gaming Mousepad',
      category: 'Real-Life Items',
      description: 'D4 branded RGB mousepad with your custom username printed',
      duration: 'Physical Item',
      price: 2500,
      stock: 30,
      icon: MousePointer,
      borderColor: '#10b981'
    },
    {
      id: 'discord-nitro',
      name: 'Discord Nitro (1 Month)',
      category: 'Real-Life Items',
      description: 'Get a Discord Nitro code delivered via DM instantly',
      duration: 'Digital Gift',
      price: 5000,
      stock: 10,
      icon: Gift,
      borderColor: '#10b981'
    },
    {
      id: 'gaming-headset',
      name: 'D4 Gaming Headset',
      category: 'Real-Life Items',
      description: 'Premium RGB gaming headset with D4 branding',
      duration: 'Physical Item',
      price: 10000,
      stock: 5,
      icon: Monitor,
      borderColor: '#a1a1aa'
    },
    {
      id: 'neon-border',
      name: 'Neon Profile Border',
      category: 'Cosmetics',
      description: 'Animated neon border around your profile picture',
      duration: 'Permanent',
      price: 2000,
      icon: Image,
      borderColor: '#ff00e5'
    },
    {
      id: 'premium-emotes',
      name: 'Premium Chat Emotes',
      category: 'Cosmetics',
      description: 'Unlock 50+ exclusive animated emotes for chat',
      duration: 'Permanent',
      price: 2500,
      icon: MessageSquare,
      borderColor: '#ff00e5'
    },
    {
      id: 'animated-name',
      name: 'Animated Username Effect',
      category: 'Cosmetics',
      description: 'Your username glows and pulses with RGB colors',
      duration: 'Permanent',
      price: 4000,
      icon: Sparkles,
      borderColor: '#ff00e5'
    },
    {
      id: 'profile-theme',
      name: 'Custom Profile Theme',
      category: 'Cosmetics',
      description: 'Unlock 10 premium profile background themes',
      duration: 'Permanent',
      price: 1800,
      icon: Palette,
      borderColor: '#ff00e5'
    },
    {
      id: 'victory-anim',
      name: 'Victory Animation',
      category: 'Cosmetics',
      description: 'Custom explosion animation when you win games',
      duration: 'Permanent',
      price: 3500,
      icon: Trophy,
      borderColor: '#ffffff'
    },
  ];

  const filteredItems = shopItems.filter(item => 
    activeCategory === 'All Items' || item.category === activeCategory
  );

  const handlePurchase = (item) => {
    if (balance < item.price) {
      showFeedback('NEEDS MORE CREDITS!', 'error');
      return;
    }
    setBalance(prev => prev - item.price);
    showFeedback(`PURCHASED: ${item.name.toUpperCase()}!`);
  };

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
            animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              zIndex: 2000,
              padding: '16px 32px',
              borderRadius: '16px',
              background: feedback.type === 'error' ? 'var(--accent-magenta)' : 'var(--accent-cyan)',
              color: 'black',
              fontWeight: '900',
              fontFamily: 'Space Grotesk',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              letterSpacing: '0.05em'
            }}
          >
            {feedback.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        <h1 className="text-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900' }}>SHOP</h1>
        <div className="glass-panel" style={{ padding: '12px 24px', border: '2px solid #fbbf24', display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <span style={{ fontSize: '10px', color: '#fbbf24', fontWeight: '800' }}>BALANCE</span>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Coins size={18} color="#fbbf24" />
               <span style={{ fontSize: '24px', fontWeight: '900', fontFamily: 'Space Grotesk' }}>{balance}</span>
             </div>
           </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px', marginBottom: '40px', border: '2px solid var(--text-primary)', background: 'rgba(255, 255, 255, 0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <ShoppingCart color="var(--text-primary)" size={24} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>SPEND YOUR CREDITS</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '1rem' }}>
          Purchase perks, boosts, exclusive real-life items, and cosmetics to enhance your D4 experience!
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Info size={12} /> All purchases are final. Real-life items require shipping information via Discord DM.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="navbar-link"
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '800',
              fontFamily: 'Space Grotesk',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              background: activeCategory === cat ? 'white' : 'rgba(255,255,255,0.03)',
              color: activeCategory === cat ? 'black' : 'var(--text-secondary)',
              border: 'none',
              transition: 'all 0.2s ease',
              boxShadow: activeCategory === cat ? '0 0 20px rgba(255,255,255,0.2)' : 'none'
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px',
        marginBottom: '60px'
      }}>
        <AnimatePresence mode="popLayout">
          {filteredItems.map(item => (
            <ShopItem 
              key={item.id} 
              item={item} 
              onPurchase={handlePurchase} 
              canAfford={balance >= item.price} 
            />
          ))}
        </AnimatePresence>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--text-secondary)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sparkles size={20} /> PRO TIP
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Earn more credits by completing daily challenges, winning games, and claiming your daily bonus! Save up for exclusive real-life items or invest in boosts to earn credits faster.
          </p>
        </div>
        
        <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--text-secondary)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Gift size={20} /> REAL-LIFE ITEMS
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            All real-life items are shipped worldwide! After purchase, a D4 staff member will DM you on Discord to collect your shipping address. Items typically ship within 7-14 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
