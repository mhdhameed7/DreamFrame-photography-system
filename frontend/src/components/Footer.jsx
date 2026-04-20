import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const location = useLocation();
  const hideFooter = ['/dashboard', '/admin', '/login'].includes(location.pathname);
  if (hideFooter) return null;

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">Dream<span>Frame</span></div>
          <p>Fine art photography capturing life's most precious moments with elegance, artistry, and heartfelt dedication to your story.</p>
          <div className="footer-social">
            <a href="#" className="social-link">IG</a>
            <a href="#" className="social-link">FB</a>
            <a href="#" className="social-link">PI</a>
            <a href="#" className="social-link">TW</a>
            <a href="#" className="social-link">YT</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link to="/services">Wedding Photography</Link></li>
            <li><Link to="/services">Portrait Sessions</Link></li>
            <li><Link to="/services">Event Coverage</Link></li>
            <li><Link to="/services">Custom Packages</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Studio</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/reviews">Client Reviews</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Account</h4>
          <ul>
            <li><Link to="/booking">Book a Session</Link></li>
            <li><Link to="/dashboard">Client Dashboard</Link></li>
            <li><Link to="/admin">Admin Portal</Link></li>
            <li><Link to="/login">Login / Register</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 DreamFrame Photography. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
