import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ShoppingBag, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ShopperView from './components/ShopperView';
import OperationsDashboard from './components/OperationsDashboard';
import SearchOverlay from './components/SearchOverlay';
import CartModal from './components/CartModal';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('shopper');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowSearch(val.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
    inputRef.current?.focus();
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    
    setToastMessage(`"${product.name}" added to cart`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const checkoutCart = () => {
    alert(`Processing payment for $${cart.reduce((s, i) => s + (i.price * i.quantity), 0).toFixed(2)}...`);
    setCart([]);
    setIsCartOpen(false);
  };

  // Close overlay on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') clearSearch(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="app-container">
      {/* Background glow effects */}
      <div className="glow-blob glow-1"></div>
      <div className="glow-blob glow-2"></div>

      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* ── Top Header ── */}
        <header className="top-header">
          <button className="menu-toggle-btn" style={{ position: 'absolute', left: '40px' }} onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="header-logo-centered" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', letterSpacing: '6px' }}>AURA</span>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}>Elevate your style</span>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main className="main-content">
          <div className="body-top-bar">
            <div className="search-bar-wrapper">
              <Search size={18} className="search-icon-left" />
              <input
                ref={inputRef}
                id="global-search"
                type="text"
                className="global-search-input"
                placeholder="Search products, categories, or tags…"
                value={searchQuery}
                onChange={handleSearch}
                autoComplete="off"
              />
              {searchQuery && (
                <button className="search-clear-btn" onClick={clearSearch}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="header-right">
              <button className="header-icon-btn cart-btn-white" title="Cart" onClick={() => setIsCartOpen(true)} style={{ position: 'relative' }}>
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                  <span style={{ position: 'absolute', top: '-6px', right: '-6px', background: '#f43f5e', color: 'white', fontSize: '11px', fontWeight: 'bold', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {currentView === 'shopper' ? <ShopperView addToCart={addToCart} /> : <OperationsDashboard />}
        </main>
      </div>

      {/* ── Search Overlay ── */}
      {showSearch && (
        <SearchOverlay query={searchQuery} onClose={clearSearch} addToCart={addToCart} />
      )}

      {/* ── Cart Modal ── */}
      {isCartOpen && (
        <CartModal cart={cart} onClose={() => setIsCartOpen(false)} onRemove={removeFromCart} onCheckout={checkoutCart} />
      )}

      {/* ── Toast Notification ── */}
      <div className={`toast-notification ${toastMessage ? 'show' : ''}`}>
        <ShoppingBag size={18} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '8px' }} />
        {toastMessage}
      </div>
    </div>
  );
}

export default App;
