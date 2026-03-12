import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavItem = ({ children, active, onClick }) => (
  <div 
    onClick={onClick}
    style={{
      fontFamily: 'Inter, sans-serif',
      fontWeight: '800',
      fontSize: '0.85rem',
      border: '1px solid white',
      backgroundColor: active ? 'white' : 'transparent',
      color: active ? 'black' : 'white',
      padding: '8px 16px',
      cursor: 'pointer',
      letterSpacing: '1px',
      transition: 'all 0.2s ease'
    }}
  >
    {children}
  </div>
);

const FeatureBox = ({ icon, title }) => (
  <div style={{
    border: '1px solid white',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    flex: 1,
    minWidth: '200px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }}>
    <div style={{ color: 'white' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.1rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</h3>
  </div>
);

// Questions Array
const AGE_QUESTIONS = [
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answerIndex: 2
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    answerIndex: 2
  },
  {
    question: "What is the chemical symbol for Gold?",
    options: ["Ag", "Au", "Pb", "Fe"],
    answerIndex: 1
  }
];

export default function Content() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Guest';
  
  // High-Level State - Check localStorage on mount
  const [isLoungeActive, setIsLoungeActive] = useState(() => {
    return localStorage.getItem('isD4LoungeActive') === 'true';
  });

  // Modal State
  const [modalPhase, setModalPhase] = useState('none'); // 'none', 'username', 'age_verify'
  const [loungeName, setLoungeName] = useState(() => {
    return localStorage.getItem('d4LoungeUsername') || '';
  });
  
  // Age Verification State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isError, setIsError] = useState(false);

  // Chat/Active Lounge State
  const [messages, setMessages] = useState([
    { id: 1, user: "ChillVibes420", time: "6:30 PM", text: "yo this is such a vibe rn 🌿", type: "text" },
    { id: 2, user: "SmokeSignals", time: "6:32 PM", text: "just posted a sick smoke ring vid, check it", type: "text" },
    { id: 3, user: "CloudChaser", time: "6:35 PM", text: "this chat is immaculate fr fr", type: "text" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const fileInputRef = useRef(null);
  const chatScrollRef = useRef(null);

  // Scroll to bottom of chat when new message added
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isLoungeActive]);

  const navigateTo = (path) => {
    navigate(path, { state: { username }});
  };

  const handleContinueUsername = () => {
    if (loungeName.trim().length >= 3) {
      setModalPhase('age_verify');
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    if (selectedOption === AGE_QUESTIONS[currentQuestionIndex].answerIndex) {
      // Correct!
      setIsError(false);
      setSelectedOption(null);
      
      if (currentQuestionIndex < AGE_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Passed all 3 questions
        setIsLoungeActive(true);
        localStorage.setItem('isD4LoungeActive', 'true');
        localStorage.setItem('d4LoungeUsername', loungeName);
        setModalPhase('none');
        setCurrentQuestionIndex(0);
      }
    } else {
      // Incorrect!
      setIsError(true);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessage = {
      id: Date.now(),
      user: loungeName || username,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: chatInput,
      type: 'text'
    };
    setMessages([...messages, newMessage]);
    setChatInput("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newMessage = {
          id: Date.now(),
          user: loungeName || username,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: reader.result, // Data URL base64
          type: 'image'
        };
        setMessages([...messages, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ minHeight: '100vh', color: 'white', position: 'relative', margin : '0px 150px' }}>
      
      {/* Modal Overlay */}
      {modalPhase !== 'none' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#000',
            border: '2px solid white',
            padding: '40px',
            width: '100%',
            maxWidth: '500px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {/* Close Button */}
            <div 
              onClick={() => {
                setModalPhase('none');
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
                setIsError(false);
              }}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                cursor: 'pointer',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white'
              }}
            >
              ✕
            </div>

            {modalPhase === 'username' && (
              <>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>
                  CREATE USERNAME
                </h2>
                <p style={{ color: '#888', fontFamily: 'monospace', fontSize: '0.9rem', marginBottom: '10px' }}>
                  Choose a username to enter the lounge
                </p>

                <input 
                  type="text" 
                  placeholder="Enter username..."
                  value={loungeName}
                  onChange={(e) => setLoungeName(e.target.value)}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    color: 'white',
                    padding: '15px',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />

                <button 
                  onClick={handleContinueUsername}
                  disabled={loungeName.trim().length < 3}
                  style={{
                    backgroundColor: loungeName.trim().length >= 3 ? '#9ca3af' : '#4b5563',
                    color: 'black',
                    fontWeight: '900',
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    padding: '15px',
                    border: 'none',
                    cursor: loungeName.trim().length >= 3 ? 'pointer' : 'not-allowed',
                    textTransform: 'uppercase',
                    width: '100%',
                    marginTop: '10px'
                  }}
                >
                  CONTINUE
                </button>
                <div style={{ textAlign: 'center', color: '#0ea5e9', fontFamily: 'monospace', fontSize: '0.8rem', opacity: 0.7 }}>
                  Minimum 3 characters
                </div>
              </>
            )}

            {modalPhase === 'age_verify' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    AGE VERIFICATION
                  </h2>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <p style={{ color: '#0ea5e9', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    Answer 3 questions to verify you're 21+
                  </p>
                  <p style={{ color: '#888', fontFamily: 'monospace', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                    Question {currentQuestionIndex + 1} of 3
                  </p>
                </div>

                {isError && (
                  <div style={{ 
                    border: '1px solid #ef4444', 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                    color: '#ef4444', 
                    padding: '15px', 
                    fontWeight: 'bold',
                    marginTop: '10px'
                  }}>
                    INCORRECT - Please try again
                  </div>
                )}

                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginTop: '10px', marginBottom: '10px' }}>
                  {AGE_QUESTIONS[currentQuestionIndex].question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {AGE_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        setIsError(false); // Clear error on new selection
                      }}
                      style={{
                        border: '1px solid white',
                        padding: '15px 20px',
                        cursor: 'pointer',
                        backgroundColor: selectedOption === idx ? 'white' : 'transparent',
                        color: selectedOption === idx ? 'black' : 'white',
                        fontFamily: 'monospace',
                        fontSize: '0.95rem',
                        fontWeight: 'bold',
                        transition: 'all 0.1s ease'
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null}
                  style={{
                    backgroundColor: selectedOption !== null ? '#9ca3af' : '#4b5563',
                    color: 'black',
                    fontWeight: '900',
                    fontSize: '1rem',
                    letterSpacing: '1px',
                    padding: '15px',
                    border: 'none',
                    cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                    textTransform: 'uppercase',
                    width: '100%',
                    marginTop: '15px'
                  }}
                >
                  NEXT QUESTION
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '20px 30px',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--magenta)', padding: '5px 15px', color: 'var(--magenta)', fontWeight: 'bold' }}>
          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--magenta)', borderRadius: '50%' }}></div>
          {username}
        </div>

        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <NavItem onClick={() => navigateTo('/home')}>HOME</NavItem>
          <NavItem onClick={() => navigateTo('/info')}>D4 INFO</NavItem>
          <NavItem onClick={() => navigateTo('/gaming')}>GAMING</NavItem>
          <NavItem active onClick={() => navigateTo('/content')}>CONTENT</NavItem>
          <NavItem onClick={() => navigateTo('/partnerships')}>PARTNERSHIPS</NavItem>
          <NavItem>MINI GAMES</NavItem>
          <NavItem>SHOP</NavItem>
        </div>

        <div>
          <button className="btn-cyan" style={{ 
            padding: '8px 16px', 
            fontWeight: 'bold', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            fontSize: '0.85rem',
            letterSpacing: '1px'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            MEMBERS (1)
          </button>
        </div>
      </nav>


      {/* Main Content Area Routing */}
      {!isLoungeActive ? (
        <main style={{
          padding: '60px 50px 100px 50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px'
        }}>
          
          {/* Header Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', textAlign: 'center' }}>
            {/* Cigarette Icon */}
            <img 
              src="/Cigarette.png" 
              alt="Content Lounge Icon" 
              width="60" 
              style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }} 
            />
            
            <h1 className="text-glow" style={{ 
              fontSize: '4.5rem', 
              fontWeight: '900', 
              letterSpacing: '3px',
              textTransform: 'uppercase',
              lineHeight: '1.1'
            }}>
              CONTENT<br/>LOUNGE
            </h1>
            
            <p style={{ 
              color: '#a3b8cc',
              fontFamily: 'monospace', 
              fontSize: '1rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginTop: '10px'
            }}>
              21+ CHILL ZONE FOR STONERS, SMOKERS & DRINKERS
            </p>
          </div>

          {/* Main "ENTER THE LOUNGE" Box */}
          <div style={{
            border: '2px solid white',
            padding: '60px 40px',
            width: '100%',
            maxWidth: '900px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '25px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>
              ENTER THE LOUNGE
            </h2>
            <p style={{ color: '#a3b8cc', fontFamily: 'monospace', fontSize: '1rem' }}>
              Share clips, images, and vibe with the community
            </p>
            <button 
              onClick={() => setModalPhase('username')}
              style={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: '900',
                fontSize: '1.1rem',
                letterSpacing: '1px',
                padding: '15px 40px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '15px',
                textTransform: 'uppercase'
              }}
            >
              GET STARTED
            </button>
          </div>

          {/* Bottom Feature Grid */}
          <div style={{
            display: 'flex',
            gap: '20px',
            width: '100%',
            maxWidth: '900px',
            flexWrap: 'wrap'
          }}>
            <FeatureBox 
              title="SHARE PICS"
              icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>}
            />
            <FeatureBox 
              title="POST CLIPS"
              icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>}
            />
            <FeatureBox 
              title="LIVE CHAT"
              icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>}
            />
          </div>

        </main>
      ) : (
        <main style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 85px)' }}>
          {/* Active Lounge Top Header Section */}
          <div style={{ padding: '60px 120px 40px 120px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 className="text-glow" style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
                CONTENT LOUNGE
              </h1>
              <p style={{ color: '#a3b8cc', fontFamily: 'monospace', fontSize: '1rem' }}>
                Welcome back, {loungeName || username} 🌿
              </p>
            </div>
            <img src="/Cigarette.png" alt="Icon" width="100" style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }} />
          </div>

          {/* Active Lounge Main 2-Column Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '40px', padding: '0 120px 50px 120px', flex: 1, minHeight: 0 }}>
            
            {/* Left Column (Upload + Rules) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', overflowY: 'auto' }}>
              
              {/* Share Content */}
              <div style={{ border: '2px solid white', padding: '25px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '20px', textTransform: 'uppercase' }}>
                  SHARE CONTENT
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    onChange={handleImageUpload} 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '1px solid white',
                      backgroundColor: 'transparent',
                      color: 'white',
                      padding: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    UPLOAD IMAGE
                  </button>
                  
                  <button 
                    style={{
                      border: '1px solid white',
                      backgroundColor: 'transparent',
                      color: 'white',
                      padding: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      cursor: 'not-allowed', // Make it evident video isn't functional per request
                      opacity: 0.5
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                    UPLOAD VIDEO
                  </button>
                  
                  <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#888', marginTop: '5px', letterSpacing: '1px' }}>
                    MAX 50MB • MP4, JPG, PNG, GIF
                  </div>
                </div>
              </div>

              {/* Lounge Rules */}
              <div style={{ border: '1px solid rgba(255,255,255,0.5)', padding: '25px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '15px', textTransform: 'uppercase' }}>
                  LOUNGE RULES
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#a3b8cc', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                  <li>▹ Be respectful</li>
                  <li>▹ No spam</li>
                  <li>▹ Keep it chill</li>
                  <li>▹ Share the vibes</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Live Chat */}
            <div style={{ border: '2px solid white', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              {/* Chat Header */}
              <div style={{ padding: '20px', borderBottom: '1px solid white' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>
                  LIVE CHAT
                </h2>
                <p style={{ color: '#888', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  {messages.length} messages
                </p>
              </div>
              
              {/* Chat Messages */}
              <div ref={chatScrollRef} style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {messages.map(msg => (
                  <div key={msg.id} style={{ borderLeft: '2px solid #a3b8cc', paddingLeft: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{msg.user}</span>
                      <span style={{ fontSize: '0.7rem', color: '#888', fontFamily: 'monospace' }}>{msg.time}</span>
                    </div>
                    {msg.type === 'image' ? (
                      <img src={msg.text} alt="User Upload" style={{ maxWidth: '300px', maxHeight: '300px', borderRadius: '4px', marginTop: '5px', objectFit: 'contain' }} />
                    ) : (
                      <p style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: '1.4' }}>{msg.text}</p>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Chat Input */}
              <div style={{ padding: '20px', borderTop: '1px solid white', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    border: '1px solid white',
                    color: 'white',
                    padding: '15px',
                    fontFamily: 'monospace',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
                <button 
                  onClick={handleSendMessage}
                  style={{
                    backgroundColor: '#9ca3af',
                    border: '1px solid white',
                    padding: '0 25px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#d1d5db'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#9ca3af'; }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
