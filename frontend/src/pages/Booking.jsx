import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Booking.css';

const bookedDays = [5, 12, 19, 26, 8, 15];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [calDate, setCalDate] = useState(new Date(2025, 3, 1));
  const [selectedDay, setSelectedDay] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', shootType: '', date: '', package: '', location: '', notes: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in at least your name and email.');
      return;
    }
    setSubmitted(true);
  };

  const calNav = (dir) => {
    const newDate = new Date(calDate);
    newDate.setMonth(newDate.getMonth() + dir);
    setCalDate(newDate);
  };

  const renderCalendar = () => {
    const year = calDate.getFullYear();
    const month = calDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();
    const today = new Date();
    const cells = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push(<div key={`prev-${i}`} className="cal-day other-month">{daysInPrev - i}</div>);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const isBooked = bookedDays.includes(d);
      const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
      const isSelected = selectedDay === d;

      cells.push(
        <div
          key={`cur-${d}`}
          className={`cal-day ${isBooked ? 'booked' : 'available'} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => !isBooked && setSelectedDay(d)}
        >
          {d}
        </div>
      );
    }

    // Next month days
    const remaining = 42 - (firstDay + daysInMonth);
    for (let d = 1; d <= remaining; d++) {
      cells.push(<div key={`next-${d}`} className="cal-day other-month">{d}</div>);
    }

    return cells;
  };

  if (submitted) {
    return (
      <div className="page-enter">
        <div className="booking-hero">
          <img className="page-hero-bg-img" src="/images/featured-couple.png" alt="Booking" />
          <div className="page-hero-overlay" />
          <div className="page-hero-content">
            <p className="hero-label">Reserve Your Date</p>
            <h1>Book a <em>Session</em></h1>
          </div>
        </div>
        <div className="confirmation-msg show">
          <div className="confirmation-icon">✦</div>
          <h3>Booking Request Received</h3>
          <p>Thank you for choosing DreamFrame. We've received your booking request and will confirm your session within 24 hours. A confirmation email has been sent to your address.</p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/dashboard" className="btn-primary">View My Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="booking-hero">
        <img className="page-hero-bg-img" src="/images/featured-couple.png" alt="Booking" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="hero-label">Reserve Your Date</p>
          <h1>Book a <em>Session</em></h1>
        </div>
      </div>

      {/* Booking Form */}
      <div className="booking-layout">
        <form onSubmit={handleSubmit}>
          <p className="section-label">Your Details</p>
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Session <em>Information</em></h2>
          <div className="form-divider" />

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input className="form-input" type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" type="tel" name="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Shoot Type *</label>
              <select className="form-select" name="shootType" value={formData.shootType} onChange={handleChange}>
                <option value="">Select type...</option>
                <option>Wedding Photography</option>
                <option>Portrait Session</option>
                <option>Event Coverage</option>
                <option>Engagement Session</option>
                <option>Corporate Headshots</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Preferred Date *</label>
              <input className="form-input" type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Package</label>
              <select className="form-select" name="package" value={formData.package} onChange={handleChange}>
                <option value="">Select package...</option>
                <option>Basic — $1,200</option>
                <option>Premium — $2,800</option>
                <option>Custom — Contact us</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Location / Venue</label>
            <input className="form-input" type="text" name="location" placeholder="City, venue, or address" value={formData.location} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Additional Notes</label>
            <textarea className="form-textarea" name="notes" placeholder="Tell us about your vision, special requests, or any details we should know..." value={formData.notes} onChange={handleChange} />
          </div>

          <button type="submit" className="form-submit">Send Booking Request ✦</button>
        </form>

        {/* Calendar Sidebar */}
        <div>
          <p className="section-label">Availability</p>
          <h3 className="cal-title">Check <em>Dates</em></h3>
          <div className="calendar-widget">
            <div className="cal-header">
              <button className="cal-nav-btn" type="button" onClick={() => calNav(-1)}>‹</button>
              <span className="cal-month">{months[calDate.getMonth()]} {calDate.getFullYear()}</span>
              <button className="cal-nav-btn" type="button" onClick={() => calNav(1)}>›</button>
            </div>
            <div className="cal-days-header">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                <span className="cal-day-label" key={d}>{d}</span>
              ))}
            </div>
            <div className="cal-days">
              {renderCalendar()}
            </div>
            <div className="cal-legend">
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--accent)' }} />Selected</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--text-light)', opacity: 0.3 }} />Booked</div>
              <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--text-primary)' }} />Available</div>
            </div>
          </div>

          <div className="studio-info-card">
            <p className="studio-info-label">Studio Info</p>
            <p className="studio-info-text">
              📍 42 DreamFrame Avenue, Colombo 07<br />
              📞 +94 77 123 4567<br />
              ✉️ hello@dreamframe.com<br />
              ⏰ Mon–Sat · 9am – 7pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
