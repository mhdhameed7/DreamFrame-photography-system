import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isDashboard = ['/dashboard', '/admin', '/login'].includes(location.pathname);
  if (isDashboard) return null;

  const isHome = location.pathname === '/';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isHome ? 'navbar-home' : 'navbar-inner'}`}>
        <Link to="/" className="nav-logo">
          Dream<span>Frame</span>
        </Link>

        <ul className="nav-links">
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
          <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link></li>
          <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
          <li><Link to="/reviews" className={location.pathname === '/reviews' ? 'active' : ''}>Reviews</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
        </ul>

        <Link to="/booking" className="nav-cta">Book a Session</Link>

        <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <HiOutlineMenuAlt3 />
        </button>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <span className="mobile-nav-logo">DreamFrame</span>
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)}>
            <HiX />
          </button>
        </div>
        <ul className="mobile-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/booking">Book a Session</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">My Dashboard</Link></li>
          <li><Link to="/login">Login / Register</Link></li>
        </ul>
      </div>
    </>
  );
}
