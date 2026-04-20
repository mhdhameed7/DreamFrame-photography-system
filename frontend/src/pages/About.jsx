import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="about-hero">
        <img className="page-hero-bg-img" src="/images/cta-camera.png" alt="About me" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content" style={{ maxWidth: '550px' }}>
          <p className="hero-label">My Story</p>
          <h1>Behind<br /><em>the Lens</em></h1>
          <p className="about-hero-sub">A decade of capturing life's most extraordinary moments with artistry, passion, and purpose.</p>
        </div>
      </div>

      {/* Story */}
      <div className="about-story">
        <div className="about-story-img">
          <img src="/images/cta-camera.png" alt="Photographer" />
        </div>
        <div className="about-text">
          <p className="section-label">My Journey</p>
          <h2 className="section-title" style={{ fontSize: '2.8rem' }}>Dihan <em>Fernando</em></h2>
          <p>Photography found me long before I found it. Growing up in the lush, sun-drenched hills of Kandy, I was captivated by the way tropical light transformed ordinary scenes into something transcendent.</p>
          <p>After studying Fine Arts in Colombo and apprenticing with legendary portrait photographers, I built a singular vision: to create imagery that endures beautifully, reflecting the rich, vibrant culture and natural beauty of Sri Lanka.</p>
          <p>Over 10 years and 800+ sessions later, DreamFrame Studio has grown into a boutique atelier dedicated to the art of authentic storytelling. Every image I produce is a collaboration between light, emotion, and the irreplaceable human spirit.</p>
          <p className="about-quote">"I don't take photographs. I receive them — from the light, from you, from the moment itself."</p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/booking" className="btn-primary">Book with Dihan</Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats">
        <div className="stat-item">
          <div className="stat-num">800+</div>
          <div className="stat-label">Sessions Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">10</div>
          <div className="stat-label">Years of Experience</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">98%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
      </div>

      {/* Awards */}
      <section className="awards-section">
        <p className="section-label centered">Awards & Recognition</p>
        <h2 className="section-title">Celebrated <em>Excellence</em></h2>
        <div className="awards-grid">
          <div className="award-item">
            <div className="award-icon">🏆</div>
            <div className="award-name">Wedding Photographer of the Year</div>
            <div className="award-org">International Photography Awards 2023</div>
          </div>
          <div className="award-item">
            <div className="award-icon">✦</div>
            <div className="award-name">Top 50 Luxury Studios</div>
            <div className="award-org">Vogue Wedding Directory 2024</div>
          </div>
          <div className="award-item">
            <div className="award-icon">🎖️</div>
            <div className="award-name">Excellence in Portrait Art</div>
            <div className="award-org">Fine Art Photography Collective 2022</div>
          </div>
        </div>
      </section>
    </div>
  );
}
