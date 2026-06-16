import { ShopProvider } from '../../context/ShopContext';
import { CartProvider } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartDrawer from '../../components/CartDrawer';

export default function MainLayout({ children }) {
  return (
    <ShopProvider>
      <CartProvider>
        <Header />
        <CartDrawer />
        {children}
        <Footer />
      </CartProvider>
    </ShopProvider>
  );
}
