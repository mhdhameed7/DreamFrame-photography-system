import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Booking from './pages/Booking';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
