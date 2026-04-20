import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Dashboard.css';

const defaultBookings = [
  { id: 1, client: 'Isabella Rossi', type: 'Wedding', date: 'June 14, 2025', package: 'Premium', status: 'Scheduled', photos: [] },
  { id: 2, client: 'Marcus Chen', type: 'Portrait', date: 'May 22, 2025', package: 'Basic', status: 'Pending', photos: [] },
  { id: 3, client: 'Sophia Williams', type: 'Event', date: 'May 30, 2025', package: 'Custom', status: 'Editing', photos: [
     'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
     'https://images.unsplash.com/photo-1529636560338-22f71c29f869?w=400&q=80',
     'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80'
  ] },
  { id: 4, client: 'David Park', type: 'Wedding', date: 'April 5, 2025', package: 'Premium', status: 'Delivered', photos: [
     'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400&q=80',
     'https://images.unsplash.com/photo-1542596594-649edbc13630?w=400&q=80',
     'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&q=80'
  ] },
];

const STAGES = ['Pending', 'Scheduled', 'Shooting', 'Editing', 'Delivered'];

export default function Dashboard() {
  const [activeSidebarTab, setActiveSidebarTab] = useState('Sessions Tracker');
  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('dreamframe_bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    } else {
      localStorage.setItem('dreamframe_bookings', JSON.stringify(defaultBookings));
      setBookings(defaultBookings);
    }
  }, []);

  const TABS = ['All', 'Scheduled', 'Shooting', 'Editing', 'Delivered'];
  const userBookings = bookings.filter(b => b.client === 'Isabella Rossi');
  
  const filteredBookings = activeTab === 'All' 
    ? userBookings 
    : userBookings.filter(b => b.status === activeTab);

  const getStageIndex = (status) => STAGES.indexOf(status);

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">DREAM<span>FRAME</span></div>
        <ul className="sidebar-nav">
          <li>
            <button 
              className={activeSidebarTab === 'Sessions Tracker' ? 'active' : ''} 
              onClick={() => setActiveSidebarTab('Sessions Tracker')}
            >
              <span className="nav-icon">✧</span> Sessions Tracker
            </button>
          </li>
          <li>
            <button 
              className={activeSidebarTab === 'Calendar' ? 'active' : ''} 
              onClick={() => setActiveSidebarTab('Calendar')}
            >
              <span className="nav-icon">◷</span> Calendar
            </button>
          </li>
          <li>
            <button 
              className={activeSidebarTab === 'Messaging' ? 'active' : ''} 
              onClick={() => setActiveSidebarTab('Messaging')}
            >
              <span className="nav-icon">✐</span> Messaging
            </button>
          </li>
          <li>
            <button 
              className={activeSidebarTab === 'Invoices & Contracts' ? 'active' : ''} 
              onClick={() => setActiveSidebarTab('Invoices & Contracts')}
            >
              <span className="nav-icon">⚲</span> Invoices & Contracts
            </button>
          </li>
          <li>
            <button 
              className={activeSidebarTab === 'Profile Settings' ? 'active' : ''} 
              onClick={() => setActiveSidebarTab('Profile Settings')}
            >
              <span className="nav-icon">⊚</span> Profile Settings
            </button>
          </li>
          <li style={{ marginTop: 'auto' }}>
            <Link to="/"><span className="nav-icon">⇱</span> Back to Site</Link>
          </li>
        </ul>
      </aside>

      {/* ── Main Area ── */}
      <main className="dashboard-main">
        <motion.div 
          className="dashboard-greeting"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="section-label" style={{ marginBottom: '0.8rem', letterSpacing: '0.3em' }}>Client Portal</p>
          <h2>{activeSidebarTab === 'Sessions Tracker' ? 'Welcome,' : activeSidebarTab} <em>{activeSidebarTab === 'Sessions Tracker' ? 'Isabella' : ''}</em></h2>
          <p className="dashboard-sub">
            {activeSidebarTab === 'Sessions Tracker' && "Seamlessly track your photography sessions and curated galleries."}
            {activeSidebarTab === 'Calendar' && "View your upcoming scheduled events and booking dates."}
            {activeSidebarTab === 'Messaging' && "Communicate directly with the studio regarding your sessions."}
            {activeSidebarTab === 'Invoices & Contracts' && "Review your billing history and signed agreements."}
            {activeSidebarTab === 'Profile Settings' && "Manage your account preferences and personal details."}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeSidebarTab === 'Sessions Tracker' && (
            <motion.div
              key="tracker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* ── Tabs ── */}
              <div className="tracker-tabs">
                {TABS.map(tab => (
                  <button 
                    key={tab} 
                    className={`tracker-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* ── Tracking List ── */}
              <div className="tracking-list" style={{ marginTop: '2rem' }}>
                <AnimatePresence mode="popLayout">
                  {filteredBookings.length === 0 ? (
                    <motion.div 
                      key="empty"
                      className="empty-state"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="empty-icon">✧</div>
                      <h3>No sessions found</h3>
                      <p>You don't have any active sessions in the '{activeTab}' stage.</p>
                      <Link to="/booking" className="btn-primary" style={{ marginTop: '1.5rem', padding: '0.8rem 2.5rem' }}>Book a Session</Link>
                    </motion.div>
                  ) : (
                    filteredBookings.map((booking, idx) => {
                      const currentStageIdx = getStageIndex(booking.status);
                      
                      return (
                        <motion.div 
                          className="tracking-card" 
                          key={booking.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20, scale: 0.98 }}
                          transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 100 }}
                        >
                          {/* Glowing Accent Ring */}
                          <div className="card-ambient-glow" />

                          <div className="tracking-header">
                            <div>
                              <span className="tracking-type">{booking.type} Photography</span>
                              <h3 className="tracking-date">{booking.date}</h3>
                            </div>
                            <div className="tracking-meta-right">
                              <span className="tracking-id">Order Ref: #{booking.id * 1024}</span>
                              <div className="tracking-status-badge">{booking.status}</div>
                            </div>
                          </div>

                          {/* Progress Pipeline */}
                          <div className="progress-pipeline">
                            {STAGES.map((stage, i) => {
                              const isCompleted = i <= currentStageIdx;
                              const isCurrent = i === currentStageIdx;
                              return (
                                <div key={stage} className={`pipeline-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                                  <div className="step-circle">{isCompleted ? '✓' : ''}</div>
                                  <div className="step-label">{stage}</div>
                                  {i < STAGES.length - 1 && <div className="step-line" />}
                                </div>
                              )
                            })}
                          </div>

                          {/* Photos Preview */}
                          <AnimatePresence>
                            {currentStageIdx >= 3 && (
                              <motion.div 
                                className="tracking-photos"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                              >
                                <p className="photos-title">
                                  {currentStageIdx === 3 ? "Sneak Peeks (Post-Production in Progress...)" : "Your Masterpiece Gallery is Ready"}
                                </p>
                                <div className="photo-grid">
                                  {booking.photos?.length > 0 ? (
                                    booking.photos.map((url, i) => (
                                      <motion.div 
                                        className="photo-thumb" 
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                                      >
                                        <img src={url} alt={`Gallery ${i}`} loading="lazy"/>
                                      </motion.div>
                                    ))
                                  ) : (
                                    <div className="no-photos-yet">Optimizing light and color. Images will appear here shortly...</div>
                                  )}
                                </div>
                                
                                {currentStageIdx === 4 && (
                                  <motion.div 
                                    style={{ marginTop: '1.5rem' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                  >
                                    <button className="btn-primary" style={{ padding: '0.8rem 2rem', letterSpacing: '0.15em' }}>Download High-Res Gallery</button>
                                  </motion.div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Action Footer */}
                          <div className="tracking-footer">
                            <button className="btn-outline tracking-btn">Message Studio</button>
                            <button className="btn-outline tracking-btn">View Contract</button>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeSidebarTab === 'Calendar' && (
            <motion.div key="calendar" className="empty-state" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="empty-icon">◷</div>
              <h3>No Upcoming Appointments</h3>
              <p>Your calendar is currently clear. Book a new session to see dates here.</p>
              <Link to="/booking" className="btn-outline tracking-btn" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Schedule Consultation</Link>
            </motion.div>
          )}

          {activeSidebarTab === 'Messaging' && (
            <motion.div key="messaging" className="empty-state" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="empty-icon">✐</div>
              <h3>Message Inbox</h3>
              <p>You have no new messages from Eleanor.</p>
              <button className="btn-outline tracking-btn" style={{ marginTop: '1.5rem' }}>Compose New Message</button>
            </motion.div>
          )}

          {activeSidebarTab === 'Invoices & Contracts' && (
            <motion.div key="invoices" className="empty-state" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="empty-icon">⚲</div>
              <h3>Invoices & Contracts</h3>
              <p>All your invoices are fully paid! No pending documents to sign.</p>
            </motion.div>
          )}

          {activeSidebarTab === 'Profile Settings' && (
            <motion.div key="profile" className="empty-state" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="empty-icon">⊚</div>
              <h3>Profile Information</h3>
              <p style={{ margin: '1rem 0' }}><strong>Name:</strong> Isabella Rossi</p>
              <p style={{ margin: '1rem 0' }}><strong>Email:</strong> isabella@example.com</p>
              <p style={{ margin: '1rem 0' }}><strong>Preferences:</strong> Email Notifications (Enabled)</p>
              
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn-outline tracking-btn">Edit Details</button>
                <button className="btn-outline tracking-btn" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>Change Password</button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
