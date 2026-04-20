import './Contact.css';

export default function Contact() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="contact-hero">
        <img className="page-hero-bg-img" src="/images/hero-wedding.png" alt="Contact" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="hero-label">Get in Touch</p>
          <h1>Let's <em>Connect</em></h1>
        </div>
      </div>

      {/* Contact Layout */}
      <div className="contact-layout">
        <div className="contact-info">
          <p className="section-label">Studio Details</p>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Find <em>Us</em></h2>
          <div className="contact-divider" />

          <div className="contact-detail">
            <div className="contact-detail-icon">📍</div>
            <div>
              <div className="contact-detail-label">Studio Address</div>
              <div className="contact-detail-val">42 DreamFrame Avenue, Colombo 07<br />Western Province, Sri Lanka</div>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-icon">📞</div>
            <div>
              <div className="contact-detail-label">Phone</div>
              <div className="contact-detail-val">+94 77 123 4567</div>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-icon">✉️</div>
            <div>
              <div className="contact-detail-label">Email</div>
              <div className="contact-detail-val">hello@dreamframe.com</div>
            </div>
          </div>

          <div className="contact-detail">
            <div className="contact-detail-icon">⏰</div>
            <div>
              <div className="contact-detail-label">Studio Hours</div>
              <div className="contact-detail-val">Monday – Saturday: 9am – 7pm<br />Sunday: By appointment only</div>
            </div>
          </div>

          <div className="contact-social-links">
            <a className="social-link" href="#">IG</a>
            <a className="social-link" href="#">FB</a>
            <a className="social-link" href="#">PI</a>
            <a className="social-link" href="#">TW</a>
            <a className="social-link" href="#">YT</a>
          </div>

          <div className="map-embed">
            <div className="map-placeholder">
              <div className="map-placeholder-icon">🗺️</div>
              <p>42 DreamFrame Avenue · Colombo 07 · Sri Lanka</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap">
          <p className="section-label">Send a Message</p>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Write <em>to Us</em></h2>
          <div className="contact-divider" />

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="your@email.com" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input className="form-input" type="text" placeholder="How can we help?" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-textarea" style={{ minHeight: '160px' }} placeholder="Tell us about your project, ask us anything..." />
          </div>
          <button className="form-submit">Send Message ✦</button>
        </div>
      </div>
    </div>
  );
}
