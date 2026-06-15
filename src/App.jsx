import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import Courses from './pages/Courses';
import Knowledge from './pages/Knowledge';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';

function App() {
  return (
    <ShopProvider>
      <CartProvider>
        <Router>
        <div className="app">
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/len-soi" element={<Products productType="len-soi" />} />
            <Route path="/thu-bong" element={<Products productType="thu-bong" />} />
            <Route path="/day-nghe" element={<Courses />} />
            <Route path="/kien-thuc" element={<Knowledge />} />
            <Route path="/gioi-thieu" element={<About />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gio-hang" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
        </Router>
      </CartProvider>
    </ShopProvider>
  );
}

export default App;
