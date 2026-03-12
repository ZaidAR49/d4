import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, MessageSquare, Image as ImageIcon, Video, Send, AlertCircle, Cigarette, HelpCircle, X } from 'lucide-react';

const AGE_QUESTIONS = [
  { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], answer: 2 },
  { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
  { question: "Chemical symbol for Gold?", options: ["Ag", "Au", "Pb", "Fe"], answer: 1 }
];

export default function Content() {
  const location = useLocation();
  const username = location.state?.username || 'Guest';
  
  const [isLoungeActive, setIsLoungeActive] = useState(() => localStorage.getItem('isD4LoungeActive') === 'true');
  const [modalPhase, setModalPhase] = useState('none');
  const [loungeName, setLoungeName] = useState(() => localStorage.getItem('d4LoungeUsername') || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isError, setIsError] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: "ChillVibes420", time: "6:30 PM", text: "yo this is such a vibe rn 🌿", type: "text" },
    { id: 2, user: "SmokeSignals", time: "6:32 PM", text: "just posted a sick smoke ring vid, check it", type: "text" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatScrollRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatScrollRef.current) chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [messages, isLoungeActive]);

  const handleNextQuestion = () => {
    if (selectedOption === AGE_QUESTIONS[currentQuestionIndex].answer) {
      setIsError(false);
      setSelectedOption(null);
      if (currentQuestionIndex < AGE_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsLoungeActive(true);
        localStorage.setItem('isD4LoungeActive', 'true');
        localStorage.setItem('d4LoungeUsername', loungeName);
        setModalPhase('none');
      }
    } else {
      setIsError(true);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, {
      id: Date.now(),
      user: loungeName || username,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: chatInput,
      type: 'text'
    }]);
    setChatInput("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.startsWith('video/') ? 'video' : 'image';
      const reader = new FileReader();
      reader.onload = (event) => {
        setMessages([...messages, {
          id: Date.now(),
          user: loungeName || username,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: event.target.result,
          type: type
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="page-container" style={{ paddingBottom: '80px' }}>
      <AnimatePresence>
        {modalPhase !== 'none' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          >
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-panel" style={{ padding: '40px', maxWidth: '450px', width: '100%', position: 'relative' }}>
              <button onClick={() => setModalPhase('none')} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={20} /></button>
              
              {modalPhase === 'username' ? (
                <>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px' }}>IDENTITY REQUIRED</h2>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>Choose an alias to enter the restricted zone.</p>
                  <input 
                    type="text" placeholder="IDENTITY" value={loungeName} onChange={(e) => setLoungeName(e.target.value)}
                    style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', color: 'white', marginBottom: '20px', outline: 'none' }}
                  />
                  <button onClick={() => setModalPhase('age_verify')} className="btn-primary" style={{ width: '100%' }}>CONTINUE</button>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <HelpCircle className="text-cyan" size={24} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>RESTRICTION CHECK</h2>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>VERIFICATION {currentQuestionIndex + 1} / 3</p>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>{AGE_QUESTIONS[currentQuestionIndex].question}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                    {AGE_QUESTIONS[currentQuestionIndex].options.map((opt, i) => (
                      <button key={i} onClick={() => setSelectedOption(i)} className={selectedOption === i ? "btn-primary" : "btn-outline"} style={{ textAlign: 'left', padding: '12px 20px' }}>{opt}</button>
                    ))}
                  </div>
                  {isError && <p style={{ color: 'var(--accent-magenta)', fontSize: '0.8rem', marginBottom: '10px' }}>Security rejection. Incorrect response.</p>}
                  <button onClick={handleNextQuestion} className="btn-primary" style={{ width: '100%' }}>SUBMIT RESPONSE</button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoungeActive ? (
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '60px auto' }}>
          <Cigarette size={60} style={{ marginBottom: '30px', color: 'var(--accent-cyan)' }} />
          <h1 className="text-gradient" style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '20px' }}>CONTENT LOUNGE</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '50px' }}>The restricted 21+ sanctuary for the D4 family. Vibe, share, and connect.</p>
          <div className="glass-panel" style={{ padding: '60px 40px', border: '1px solid var(--border-bright)' }}>
             <Lock size={32} style={{ marginBottom: '20px' }} />
             <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '30px' }}>ACCESS CONTROL ACTIVE</h2>
             <button onClick={() => setModalPhase('username')} className="btn-primary" style={{ padding: '16px 40px' }}>INITIATE ACCESS PROTOCOL</button>
          </div>
        </div>
      ) : (
        <div>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h1 className="text-gradient" style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '20px' }}>CONTENT LOUNGE</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Secure session active: {loungeName || username}</p>
            </div>
            <Unlock className="text-cyan" size={32} />
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '30px' }}>
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '20px' }}>PROTOCOLS</h3>
                <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li>• Keep the vibe chill</li>
                  <li>• No malicious metadata</li>
                  <li>• Respect the family</li>
                </ul>
              </div>
              <div className="glass-card" style={{ padding: '24px', borderRadius: '16px', flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '20px' }}>GALLERY</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '20px' }}>Direct upload protocols active. JPEG, PNG, MP4 support.</p>
                
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  onChange={handleFileUpload} 
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-outline" 
                    style={{ fontSize: '0.8rem', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}
                  >
                    <ImageIcon size={16} />
                    SHARE IMAGE
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-outline" 
                    style={{ fontSize: '0.8rem', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}
                  >
                    <Video size={16} />
                    SHARE VIDEO
                  </button>
                </div>
              </div>
            </aside>

            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border-bright)', minHeight: '600px' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MessageSquare className="text-cyan" size={18} />
                <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>LIVE HUB</span>
              </div>
              
              <div ref={chatScrollRef} style={{ flex: 1, padding: '30px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {messages.map(m => (
                  <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'white' }}>{m.user}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{m.time}</span>
                    </div>
                    {m.type === 'text' && (
                       <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '0 12px 12px 12px', borderLeft: '2px solid var(--accent-cyan)', maxWidth: '80%' }}>{m.text}</p>
                    )}
                    {m.type === 'image' && (
                      <div style={{ maxWidth: '80%', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-bright)' }}>
                        <img src={m.text} alt="Upload" style={{ width: '100%', height: 'auto', display: 'block' }} />
                      </div>
                    )}
                    {m.type === 'video' && (
                      <div style={{ maxWidth: '80%', overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--border-bright)' }}>
                        <video controls src={m.text} style={{ width: '100%', display: 'block' }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ padding: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <ImageIcon size={20} />
                </button>
                <input 
                  type="text" placeholder="TRANSMIT MESSAGE..." value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px', outline: 'none', color: 'white' }}
                />
                <button onClick={handleSendMessage} className="btn-primary" style={{ padding: '12px' }}><Send size={20} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
