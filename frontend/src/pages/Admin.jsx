import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Admin.css';

const STAGES = ['Pending', 'Scheduled', 'Shooting', 'Editing', 'Delivered'];

const packagesData = [
  { name: 'Basic', price: '$1,200', hours: '4 hrs', images: '200+', status: 'Active' },
  { name: 'Premium', price: '$2,800', hours: '8 hrs', images: '500+', status: 'Active' },
  { name: 'Custom', price: 'Variable', hours: 'Flexible', images: 'Unlimited', status: 'Active' },
];

const reviewsData = [
  { client: 'Isabella Rossi', rating: '★★★★★', review: '"Eleanor is a true artist and professional..."', date: 'July 2024' },
  { client: 'Marcus Chen', rating: '★★★★★', review: '"My portrait session was transformative..."', date: 'Mar 2024' },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Pipeline Overview');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('dreamframe_bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  const updateBookingState = (newBookings) => {
    setBookings(newBookings);
    localStorage.setItem('dreamframe_bookings', JSON.stringify(newBookings));
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = bookings.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    );
    updateBookingState(updated);
  };

  const simulatePhotoUpload = (id) => {
    const samplePhotos = [
      `https://images.unsplash.com/photo-1542596594-649edbc13630?w=400&q=80&sig=${Math.random()}`,
      `https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80&sig=${Math.random()}`,
      `https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80&sig=${Math.random()}`
    ];
    
    const updated = bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          photos: [...(b.photos || []), ...samplePhotos],
          status: 'Editing'
        };
      }
      return b;
    });
    updateBookingState(updated);
    alert('Mock photos successfully uploaded to client gallery!');
  };

  return (
    <div className="dashboard-layout admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">DREAM<span>FRAME</span> <span className="admin-badge">Admin</span></div>
        <ul className="sidebar-nav">
          <li>
            <button 
              className={activeTab === 'Pipeline Overview' ? 'active' : ''} 
              onClick={() => setActiveTab('Pipeline Overview')}
            >
              <span className="nav-icon">✧</span> Pipeline Overview
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'Session Management' ? 'active' : ''} 
              onClick={() => setActiveTab('Session Management')}
            >
              <span className="nav-icon">◷</span> Session Management
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'Delivered Galleries' ? 'active' : ''} 
              onClick={() => setActiveTab('Delivered Galleries')}
            >
              <span className="nav-icon">⚲</span> Delivered Galleries
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'Pricing Plans' ? 'active' : ''} 
              onClick={() => setActiveTab('Pricing Plans')}
            >
              <span className="nav-icon">⊚</span> Pricing Plans
            </button>
          </li>
          <li>
            <button 
              className={activeTab === 'Testimonials' ? 'active' : ''} 
              onClick={() => setActiveTab('Testimonials')}
            >
              <span className="nav-icon">✐</span> Testimonials
            </button>
          </li>
          <li style={{ marginTop: 'auto' }}>
            <Link to="/"><span className="nav-icon">⇱</span> Return to Live Site</Link>
          </li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <motion.div 
          className="dashboard-greeting"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="section-label" style={{ marginBottom: '0.8rem', letterSpacing: '0.3em' }}>Admin Portal</p>
          <h2>{activeTab === 'Pipeline Overview' ? 'Command' : activeTab.split(' ')[0]} <em>{activeTab === 'Pipeline Overview' ? 'Center' : activeTab.split(' ').slice(1).join(' ')}</em></h2>
          <p className="dashboard-sub">
            {activeTab === 'Pipeline Overview' && "Manage active workflow sessions and track them effortlessly through the delivery pipeline."}
            {activeTab === 'Session Management' && "Configure availability configurations and booking rules."}
            {activeTab === 'Delivered Galleries' && "Archive and browse previously finalized client galleries."}
            {activeTab === 'Pricing Plans' && "Control pricing structure, packages, and seasonal offers."}
            {activeTab === 'Testimonials' && "Approve and manage public client reviews on your platform."}
          </p>
        </motion.div>

        {activeTab === 'Pipeline Overview' && (
          <motion.div 
            className="admin-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="admin-stat-card">
              <div className="admin-stat-num">{bookings.length}</div>
              <div className="admin-stat-label">Active Orders</div>
              <div className="admin-stat-change positive">Syncs directly with client</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-num">
                {bookings.filter(b => b.status === 'Shooting' || b.status === 'Editing').length}
              </div>
              <div className="admin-stat-label">In Progress</div>
              <div className="admin-stat-change attention">Awaiting final delivery</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-num">
                {bookings.filter(b => b.status === 'Pending').length}
              </div>
              <div className="admin-stat-label">Pending Intake</div>
              <div className="admin-stat-change positive">Needs immediate action</div>
            </div>
          </motion.div>
        )}

        {/* ── Tab Contents ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="tab-content-wrapper"
          >
            {activeTab === 'Pipeline Overview' && (
              <div className="tab-content">
                <p className="dashboard-section-title">Session Pipeline Management</p>
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Client Detail</th>
                        <th>Package</th>
                        <th>Current Status</th>
                        <th>Tracker Control</th>
                        <th>Gallery Mock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>No bookings found in local storage.</td>
                        </tr>
                      ) : (
                        bookings.map((booking) => (
                          <motion.tr key={booking.id} layout>
                            <td>
                              <strong>{booking.client}</strong><br/>
                              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{booking.type} · {booking.date}</span>
                            </td>
                            <td><span style={{ fontWeight: 500 }}>{booking.package}</span></td>
                            <td>
                              <span className={`status-badge-inline ${booking.status.toLowerCase()}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td>
                              <select 
                                className="status-dropdown" 
                                value={booking.status}
                                onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                              >
                                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                            </td>
                            <td>
                              <button 
                                className="btn-outline tracking-btn" 
                                onClick={() => simulatePhotoUpload(booking.id)}
                              >
                                + Inject Sneak Peek
                              </button>
                              {booking.photos && booking.photos.length > 0 && (
                                <span style={{ display: 'block', fontSize: '0.6rem', marginTop: '6px', color: 'var(--sage-dark)', fontWeight: 600 }}>
                                  {booking.photos.length} photos synced
                                </span>
                              )}
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'Session Management' && (
              <motion.div className="empty-state" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="empty-icon">◷</div>
                <h3>Session Management</h3>
                <p>Manage your availability schedules and block out off-days.</p>
                <button className="btn-outline tracking-btn" style={{ marginTop: '1.5rem' }}>Sync with Google Calendar</button>
              </motion.div>
            )}

            {activeTab === 'Delivered Galleries' && (
              <motion.div className="empty-state" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <div className="empty-icon">⚲</div>
                <h3>Delivered Galleries Archive</h3>
                <p>View historical sessions and free up cloud space.</p>
              </motion.div>
            )}

            {activeTab === 'Pricing Plans' && (
              <div className="tab-content">
                <p className="dashboard-section-title">Manage Service Packages</p>
                <div style={{ marginBottom: '2rem' }}>
                  <button className="btn-primary" style={{ padding: '0.8rem 2.5rem', letterSpacing: '0.1em' }}>+ Add New Package</button>
                </div>
                <div className="table-container">
                  <table className="data-table">
                    <thead><tr><th>Package Tier</th><th>Investment</th><th>Duration</th><th>Deliverables</th><th>Status</th></tr></thead>
                    <tbody>
                      {packagesData.map((p, i) => (
                        <tr key={i}>
                          <td><strong>{p.name}</strong></td>
                          <td>{p.price}</td>
                          <td>{p.hours}</td>
                          <td>{p.images}</td>
                          <td><span className="status-badge-inline delivered" style={{ background: 'transparent' }}>{p.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'Testimonials' && (
              <div className="tab-content">
                <p className="dashboard-section-title">Client Review Protocol</p>
                <div className="table-container">
                  <table className="data-table">
                    <thead><tr><th>Client Origin</th><th>Rating</th><th>Quotation</th><th>Submission</th></tr></thead>
                    <tbody>
                      {reviewsData.map((r, i) => (
                        <tr key={i}>
                          <td><strong>{r.client}</strong></td>
                          <td style={{ color: 'var(--accent)' }}>{r.rating}</td>
                          <td style={{ maxWidth: '300px', color: 'var(--text-muted)' }}><em>{r.review}</em></td>
                          <td>{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}
