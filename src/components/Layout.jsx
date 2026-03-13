import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlassNavbar from './GlassNavbar';
import Background3D from './Background3D';

const Layout = ({ children }) => {
  const location = useLocation();
  const username = location.state?.username || 'GUEST';
  const isLoginPage = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <Background3D />
      
      {!isLoginPage && <GlassNavbar username={username} />}
      
      <main 
        className="main-content"
        style={{
          paddingTop: isLoginPage ? 0 : '100px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ width: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <style>{`
        /* Global Page Transitions & Layout Fixes */
        .page-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }
        @media (max-width: 768px) {
          .main-content {
            padding-top: ${isLoginPage ? '0' : '80px'} !important;
          }
          .page-container {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
