import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import BlurText from '../components/BlurText';
import './Home.css';

const portfolioItems = [
  { src: '/images/hero-wedding.png', label: 'Kavindi & Nuwan', cat: 'Wedding' },
  { src: '/images/portfolio-portrait.png', label: 'Shenali P.', cat: 'Portrait' },
  { src: '/images/portfolio-event.png', label: 'Grand Gala 2024', cat: 'Event' },
  { src: '/images/portfolio-wedding.png', label: 'Dinithi & Kusal', cat: 'Wedding' },
  { src: '/images/service-portrait.png', label: 'Studio Series', cat: 'Portrait' },
  { src: '/images/cta-camera.png', label: 'Behind the Lens', cat: 'Studio' },
];

const testimonials = [
  { quote: "DreamFrame didn't just photograph our wedding — they preserved our love story in the most breathtaking way. Every image is a masterpiece.", author: 'Anuki & Heshan Fernando', type: 'Wedding 2024' },
  { quote: "The portrait session was transformative. I've never felt so comfortable in front of a camera, and the results left me speechless.", author: 'Hashini Silva', type: 'Portrait Session' },
  { quote: "Our corporate gala photography exceeded every expectation. Professional, unobtrusive, and extraordinary imagery.", author: 'Rohan de Silva', type: 'The Grand Summit 2024' },
];

const services = [
  { icon: '💍', name: 'Wedding Photography', desc: 'Full-day coverage capturing every emotion, from preparations to the final dance.', img: '/images/portfolio-wedding.png' },
  { icon: '📸', name: 'Portrait Sessions', desc: 'Revealing the authentic essence of every individual through studio and natural light.', img: '/images/service-portrait.png' },
  { icon: '🎉', name: 'Event Coverage', desc: 'Corporate gatherings, galas, launches — capturing the energy of your occasion.', img: '/images/portfolio-event.png' },
];

const steps = [
  { num: '01', title: 'Book', desc: 'Choose your session type and select a date through our booking system.' },
  { num: '02', title: 'Consult', desc: 'We discuss your vision, style preferences, and all the details.' },
  { num: '03', title: 'Shoot', desc: 'Experience a relaxed, guided session capturing authentic moments.' },
  { num: '04', title: 'Delivery', desc: 'Receive your gallery within 2–4 weeks via your private online portal.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-enter">
      {/* ── Hero ── */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero-bg-wrapper" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.img
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="hero-bg-img"
            src="/images/hero-wedding.png"
            alt="Beautiful wedding photography"
          />
          <div className="hero-overlay" />
        </motion.div>

        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUp} className="hero-label">DreamFrame Photography</motion.p>
          <motion.h1 variants={fadeUp} className="hero-title">
            <BlurText text="Your Story." delay={0.2} animateBy="word" direction="top" />
            <br />
            <em>
              <BlurText text="Perfectly Framed" delay={0.5} animateBy="word" direction="bottom" />
            </em>
          </motion.h1>
          <motion.p variants={fadeUp} className="hero-sub">
            Fine art photography that transforms fleeting moments into timeless stories. Welcome to a world where every frame speaks.
          </motion.p>
          <motion.div variants={fadeUp} className="hero-btns">
            <Link to="/gallery" className="btn-primary">View Portfolio</Link>
            <Link to="/booking" className="btn-outline hero-outline">Book a Session</Link>
          </motion.div>
        </motion.div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="services-section">
        <motion.div
          className="services-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="section-label centered">What I Offer</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>My <em>Services</em></h2>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((s, i) => (
            <motion.div className="service-card" key={i} variants={fadeUp}>
              <div className="service-card-img">
                <img src={s.img} alt={s.name} loading="lazy" />
                <div className="service-card-overlay">
                  <span className="service-icon">{s.icon}</span>
                </div>
              </div>
              <div className="service-card-body">
                <h3>{s.name}</h3>
                <p>{s.desc}</p>
                <Link to="/services" className="service-link">Learn More →</Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── About Split ── */}
      <section className="about-preview">
        <motion.div
          className="about-preview-img"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img src="/images/cta-camera.png" alt="DreamFrame photographer" />
        </motion.div>
        <motion.div
          className="about-preview-text"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="section-label">About DreamFrame</p>
          <h2 className="section-title">
            <BlurText text="The Art of" delay={0.2} animateBy="word" direction="top" />
            <br />
            <em><BlurText text="Visual Storytelling" delay={0.4} animateBy="word" direction="bottom" /></em>
          </h2>
          <p className="about-intro">Photography found me long before I found it. With over a decade of experience, DreamFrame transforms ordinary scenes into something transcendent — capturing the emotions, the light, and the irreplaceable human spirit.</p>
          <p className="about-quote">"I don't take photographs. I receive them — from the light, from you, from the moment itself."</p>
          <Link to="/about" className="btn-outline">Read My Story</Link>
        </motion.div>
      </section>

      {/* ── Portfolio Bento ── */}
      <section className="portfolio-preview">
        <motion.div
          style={{ textAlign: 'center', marginBottom: '3rem' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="section-label centered">Featured Work</p>
          <h2 className="section-title">The <em>Portfolio</em></h2>
        </motion.div>

        <motion.div
          className="bento-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {portfolioItems.map((item, i) => (
            <motion.div className={`bento-item bento-${i + 1}`} key={i} variants={fadeUp}>
              <img src={item.src} alt={item.label} loading="lazy" />
              <div className="bento-overlay">
                <span className="bento-cat">{item.cat}</span>
                <span className="bento-label">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/gallery" className="btn-outline">View Full Gallery →</Link>
        </motion.div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-label centered">Client Love</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>What They <em>Say</em></h2>

          <div className="testimonials-wrapper">
            <button className="slider-arrow prev-arrow" onClick={() => setCurrentSlide(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}>&larr;</button>
            <div className="testimonials-track">
              {testimonials.map((t, i) => (
                <div className={`testimonial-slide ${i === currentSlide ? 'active' : ''}`} key={i}>
                  <div className="testimonial-stars">{'★'.repeat(5)}</div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-author-wrapper">
                     <div className="testimonial-author">{t.author}</div>
                     <div className="testimonial-type">{t.type}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="slider-arrow next-arrow" onClick={() => setCurrentSlide(prev => (prev + 1) % testimonials.length)}>&rarr;</button>
          </div>
          
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                className={`dot ${i === currentSlide ? 'active' : ''}`}
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Process ── */}
      <section className="process-section">
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label centered">How It Works</p>
          <h2 className="section-title">The <em>Process</em></h2>
        </motion.div>

        <motion.div
          className="process-steps"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((s, i) => (
            <motion.div className="process-step" key={i} variants={fadeUp}>
              <div className="step-num">{s.num}</div>
              <h4 className="step-title">{s.title}</h4>
              <p className="step-desc">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <motion.img
          src="/images/featured-couple.png"
          alt="Book a session"
          className="cta-bg-img"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <div className="cta-overlay" />
        <motion.div
          className="cta-content"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeUp} className="cta-label">Ready to Begin?</motion.p>
          <motion.h2 variants={fadeUp} className="cta-title">Let's Create Something <em>Beautiful</em></motion.h2>
          <motion.p variants={fadeUp} className="cta-sub">Book your dream session today and let me capture moments that will last a lifetime.</motion.p>
          <motion.div variants={fadeUp} className="cta-btns">
            <Link to="/booking" className="btn-primary">Book a Session</Link>
            <Link to="/contact" className="btn-outline cta-outline">Get in Touch</Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
