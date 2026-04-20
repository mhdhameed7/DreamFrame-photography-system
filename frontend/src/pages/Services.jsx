import { Link } from 'react-router-dom';
import './Services.css';

const packages = [
  {
    tier: 'Basic',
    price: '$1,200',
    sub: 'Perfect for intimate occasions',
    features: [
      { text: '4-hour session coverage', available: true },
      { text: 'Exclusive 1-on-1 Coverage', available: true },
      { text: '200+ edited images', available: true },
      { text: 'Private online gallery', available: true },
      { text: '14-day delivery', available: true },
      { text: 'Lighting Assistant', available: false },
      { text: 'Engagement session', available: false },
      { text: 'Photo album', available: false },
    ],
    featured: false
  },
  {
    tier: 'Premium',
    price: '$2,800',
    sub: 'My most popular choice',
    features: [
      { text: '8-hour session coverage', available: true },
      { text: 'Premium Focus (With Assistant)', available: true },
      { text: '500+ edited images', available: true },
      { text: 'Private online gallery', available: true },
      { text: '10-day delivery', available: true },
      { text: 'Lighting Assistant included', available: true },
      { text: 'Engagement session', available: true },
      { text: 'Photo album', available: false },
    ],
    featured: true
  },
  {
    tier: 'Custom',
    price: 'Tailored',
    sub: 'Bespoke to your vision',
    features: [
      { text: 'Flexible hours', available: true },
      { text: 'Dedicated Lead & Assistant', available: true },
      { text: 'Unlimited images', available: true },
      { text: 'Private online gallery', available: true },
      { text: 'Priority 7-day delivery', available: true },
      { text: 'Lighting Assistant included', available: true },
      { text: 'Engagement session', available: true },
      { text: 'Luxury photo album', available: true },
    ],
    featured: false
  }
];

const comparison = [
  { feature: 'Coverage Hours', basic: '4 hrs', premium: '8 hrs', custom: 'Unlimited' },
  { feature: 'Coverage Type', basic: 'Solo Lead', premium: 'Lead + Assistant', custom: 'Full Support' },
  { feature: 'Edited Images', basic: '200+', premium: '500+', custom: 'Unlimited' },
  { feature: 'Online Gallery', basic: true, premium: true, custom: true },
  { feature: 'Dedicated Assistant', basic: false, premium: true, custom: true },
  { feature: 'Engagement Session', basic: false, premium: true, custom: true },
  { feature: 'Photo Album', basic: false, premium: false, custom: true },
  { feature: 'Print Release', basic: true, premium: true, custom: true },
  { feature: 'Rush Delivery', basic: false, premium: false, custom: true },
  { feature: 'Delivery Time', basic: '14 days', premium: '10 days', custom: '7 days' },
];

export default function Services() {
  const renderCell = (val) => {
    if (val === true) return <span className="check">✦</span>;
    if (val === false) return <span className="cross">—</span>;
    return val;
  };

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="services-hero">
        <img className="page-hero-bg-img" src="/images/portfolio-event.png" alt="Services" />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <p className="hero-label">What I Offer</p>
          <h1>My <em>Services</em></h1>
        </div>
      </div>

      {/* Pricing */}
      <section className="pricing-section">
        <div style={{ textAlign: 'center' }}>
          <p className="section-label centered">Investment</p>
          <h2 className="section-title">Choose Your <em>Package</em></h2>
          <p className="pricing-intro">Every package is crafted to deliver an exceptional experience and imagery you'll treasure forever.</p>
        </div>
        <div className="pricing-grid">
          {packages.map((pkg, i) => (
            <div className={`pricing-card ${pkg.featured ? 'featured' : ''}`} key={i}>
              {pkg.featured && <div className="popular-badge">MOST POPULAR</div>}
              <div className="pricing-tier">{pkg.tier}</div>
              <div className="pricing-price">{pkg.price}</div>
              <div className="pricing-sub">{pkg.sub}</div>
              <div className="pricing-divider" />
              <ul className="pricing-features">
                {pkg.features.map((f, j) => (
                  <li key={j} className={f.available ? '' : 'unavailable'}>
                    {f.text}
                  </li>
                ))}
              </ul>
              <Link
                to={pkg.tier === 'Custom' ? '/contact' : '/booking'}
                className="pricing-btn"
              >
                {pkg.tier === 'Custom' ? 'Get a Quote' : 'Book This Package'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="comparison-section">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <p className="section-label centered">Compare</p>
          <h2 className="section-title">Package <em>Comparison</em></h2>
        </div>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Basic</th>
              <th>Premium</th>
              <th>Custom</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <tr key={i}>
                <td>{row.feature}</td>
                <td>{renderCell(row.basic)}</td>
                <td>{renderCell(row.premium)}</td>
                <td>{renderCell(row.custom)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/booking" className="btn-primary">Book Your Session Today</Link>
        </div>
      </section>
    </div>
  );
}
