import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-visual">
        <img className="login-visual-bg" src="/images/hero-wedding.png" alt="Sri Lankan Wedding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="login-visual-overlay" />
        <div className="login-visual-content" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#fff', padding: '3rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>✦ DreamFrame Studio</p>
          <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.4, marginBottom: '2rem' }}>
            "Preserving the essence of your <br/>most beautiful moments."
          </h2>
          <p style={{ fontSize: '0.85rem', letterSpacing: '0.1em', opacity: 0.9 }}>— Dihan Fernando</p>
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-form-container">
          <div className="login-logo">DREAM<span>FRAME</span></div>
          <p className="login-tagline">Client Portal Access</p>

          <div className="login-tabs">
            <button className={`login-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Sign In</button>
            <button className={`login-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>Create Account</button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '0.9rem 1.2rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '0.9rem 1.2rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div className="login-forgot">
                <a href="#">Forgot password?</a>
              </div>
              <button type="submit" style={{ width: '100%', padding: '1rem', background: 'var(--accent)', color: 'var(--white)', border: 'none', borderRadius: '4px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }}>Sign In ✦</button>
              
              <div className="login-divider">
                <span>or continue with</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" style={{ flex: 1, padding: '0.8rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.3s' }}>Google</button>
                <button type="button" style={{ flex: 1, padding: '0.8rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.3s' }}>Facebook</button>
              </div>
              <div className="login-bottom-link">
                Admin? <Link to="/admin">Access Admin Portal</Link>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>First Name</label>
                  <input type="text" placeholder="First" style={{ width: '100%', padding: '0.9rem 1.2rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>Last Name</label>
                  <input type="text" placeholder="Last" style={{ width: '100%', padding: '0.9rem 1.2rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                <input type="email" placeholder="your@email.com" style={{ width: '100%', padding: '0.9rem 1.2rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                <input type="password" placeholder="Create a strong password" style={{ width: '100%', padding: '0.9rem 1.2rem', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '1rem', background: 'var(--accent)', color: 'var(--white)', border: 'none', borderRadius: '4px', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s', marginTop: '1rem' }}>Create Account ✦</button>
              <div className="login-bottom-link">
                By registering, you agree to our <a href="#">Terms of Service</a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
