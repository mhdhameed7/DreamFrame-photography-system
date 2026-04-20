import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Reviews.css';

const reviews = [
  { stars: 5, text: '"Working with DreamFrame was like having a friend capture our most cherished moments. They have an extraordinary gift for finding the emotion in every scene."', name: 'Nipuni Perera', type: 'Wedding — July 2024', img: '/images/hero-wedding.png' },
  { stars: 5, text: '"My portrait session was transformative. The team made me feel completely at ease and the results are simply stunning. I couldn\'t be happier."', name: 'Kavinda Silva', type: 'Studio Portrait — March 2024', img: '/images/portfolio-portrait.png' },
  { stars: 5, text: '"The gallery delivered for our corporate event was exceptional. Every important moment was captured with such artistry and professionalism. Highly recommended for premium events."', name: 'Dilumi Wijesinghe', type: 'Gala Event — Nov 2024', img: '/images/portfolio-event.png' },
  { stars: 5, text: '"From the initial consultation to receiving our wedding gallery, every interaction was flawless. DreamFrame exceeded every expectation we had. Absolute perfection."', name: 'Ashan & Shenali', type: 'Wedding — September 2024', img: '/images/portfolio-wedding.png' },
  { stars: 5, text: '"DreamFrame has a rare talent for storytelling through imagery. Our anniversary session produced images that feel like fine art. We\'ll treasure them always."', name: 'Shanika Dissanayake', type: 'Anniversary — May 2024', img: '/images/service-portrait.png' },
  { stars: 5, text: '"I\'ve hired many photographers over the years, but DreamFrame is in a class of its own. The attention to detail, the warm lighting, the composition — all extraordinary."', name: 'Chaminda Rathnayake', type: 'Engagement — Feb 2024', img: '/images/cta-camera.png' },
];

export default function Reviews() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000); // auto advance every 7s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="reviews-slideshow-page page-enter">
      <div className="reviews-slideshow-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="review-slide-active"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="review-slide-bg">
              <img src={reviews[currentSlide].img} alt="Review Background" />
              <div className="review-slide-overlay"></div>
            </div>
            
            <div className="review-slide-content">
              <motion.div 
                className="review-slide-box"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <p className="hero-label">Client Stories</p>
                <div className="review-stars-large">{'★'.repeat(reviews[currentSlide].stars)}</div>
                <h2 className="review-quote-large">{reviews[currentSlide].text}</h2>
                <div className="review-meta-large">
                  <span className="review-name-large">{reviews[currentSlide].name}</span>
                  <span className="review-type-large">{reviews[currentSlide].type}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="review-nav-area">
          <button className="review-nav-btn prev-btn" onClick={prevSlide}>&larr;</button>
          <div className="review-dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`review-dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(i)}
              />
            ))}
          </div>
          <button className="review-nav-btn next-btn" onClick={nextSlide}>&rarr;</button>
        </div>
      </div>
      
      {/* Leave a review section */}
      <section className="add-review-minimal">
          <h2>Share Your <em>Experience</em></h2>
          <p>If we've had the pleasure of capturing your beautiful moments, we'd love to hear from you.</p>
          <button className="btn-outline">Write a Review</button>
      </section>
    </div>
  );
}
