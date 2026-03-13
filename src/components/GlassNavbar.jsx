import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, LayoutGrid, Gamepad2, PlaySquare, Users, ShoppingBag, Joystick, LogOut } from 'lucide-react';

const GlassNavbar = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any lounge session data if desired
    localStorage.removeItem('isD4LoungeActive');
    localStorage.removeItem('d4LoungeUsername');
    // Clear main username
    localStorage.removeItem('d4_username');
    // Reset Dev Mode and Credits
    localStorage.removeItem('d4_credits');
    localStorage.removeItem('d4_is_dev');
    navigate('/');
  };

  const navLinks = [
    { name: 'HOME', path: '/home', icon: LayoutGrid },
    { name: 'INFO', path: '/info', icon: Shield },
    { name: 'GAMING', path: '/gaming', icon: Gamepad2 },
    { name: 'CONTENT', path: '/content', icon: PlaySquare },
    { name: 'PARTNERSHIPS', path: '/partnerships', icon: Users },
    { name: 'MINI GAMES', path: '/minigames', icon: Joystick },
    { name: 'SHOP', path: '/shop', icon: ShoppingBag },
  ];

  const secondaryLinks = [
    { name: 'MINI GAMES', path: '#', icon: Joystick },
    { name: 'SHOP', path: '#', icon: ShoppingBag },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        margin: '0 auto',
        maxWidth: '1400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        {/* Logo/Username */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'gray',
            padding: '1px'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px'
            }}>
              <img src="/Skull.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
          <span style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            fontSize: '14px',
            color: 'white'
          }}>
            {username?.toUpperCase() || 'GUEST'}
          </span>
        </div>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-only">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Space Grotesk',
                fontWeight: '600',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <link.icon size={14} />
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} />
              MEMBERS (1)
            </button>

            <button 
              onClick={handleLogout}
              className="navbar-link" 
              style={{ 
                background: 'none',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-primary)',
                transition: 'all 0.2s ease'
              }}
              title="SIGN OUT"
            >
              <LogOut size={18} />
            </button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'none',
              padding: '8px',
              marginRight: '-8px'
            }}
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: '10px',
              right: '10px',
              marginTop: '10px',
              zIndex: 999
            }}
            className="desktop-hidden"
          >
            <div className="glass-panel" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              border: '1px solid var(--border-bright)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontFamily: 'Space Grotesk',
                    fontWeight: '700',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <link.icon size={18} />
                  {link.name}
                </NavLink>
              ))}
              
              <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '8px 0' }} />
              
              <button 
                className="btn-primary"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '14px', 
                  borderRadius: '12px',
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '14px'
                }}
              >
                <Users size={18} />
                MEMBERS (1)
              </button>

              <button 
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontFamily: 'Space Grotesk',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  justifyContent: 'center',
                  marginTop: '4px'
                }}
              >
                <LogOut size={18} />
                SIGN OUT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar-link {
          color: var(--text-secondary);
        }
        .navbar-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }
        .navbar-link.active {
          background: white;
          color: black;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 1024px) {
          .desktop-only { display: none !important; }
          .mobile-toggle { display: block !important; }
          nav { padding: 10px !important; }
          .glass-panel { padding: 8px 16px !important; }
        }
      `}</style>
    </nav>
  );
};

export default GlassNavbar;
