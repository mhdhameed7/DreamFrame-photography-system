import { useState } from 'react';
import './Gallery.css';

const galleryImages = [
  { src: '/images/hero-wedding.png', cat: 'wedding', alt: 'Wedding couple embracing' },
  { src: '/images/service-portrait.png', cat: 'portrait', alt: 'Portrait session' },
  { src: '/images/portfolio-event.png', cat: 'event', alt: 'Grand event' },
  { src: '/images/portfolio-wedding.png', cat: 'wedding', alt: 'Wedding ceremony' },
  { src: '/images/portfolio-portrait.png', cat: 'portrait', alt: 'Portrait beauty' },
  { src: '/images/cta-camera.png', cat: 'event', alt: 'Photography session' },
  { src: '/images/featured-couple.png', cat: 'wedding', alt: 'Wedding couple outdoors' },
];

const filters = ['all', 'wedding', 'portrait', 'event'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);

  const filtered = activeFilter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.cat === activeFilter);

  const openModal = (idx) => {
    setModalIdx(idx);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  const navModal = (dir) => {
    setModalIdx(prev => (prev + dir + filtered.length) % filtered.length);
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="gallery-hero">
        <img className="page-hero-bg-img" src="/images/portfolio-portrait.png" alt="Gallery" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="hero-label">Our Portfolio</p>
          <h1>The <em>Gallery</em></h1>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="gallery-filters">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${f === activeFilter ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f === 'all' ? 'All Work' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {filtered.map((img, i) => (
          <div
            className="masonry-item"
            key={`${img.src}-${i}`}
            onClick={() => openModal(i)}
          >
            <img src={img.src} alt={img.alt} />
            <div className="masonry-overlay">
              <div className="masonry-expand">⊕</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal open" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <button className="modal-close" onClick={closeModal}>✕</button>
          <button className="modal-nav modal-prev" onClick={() => navModal(-1)}>←</button>
          <img className="modal-img" src={filtered[modalIdx].src} alt={filtered[modalIdx].alt} />
          <button className="modal-nav modal-next" onClick={() => navModal(1)}>→</button>
        </div>
      )}
    </div>
  );
}
