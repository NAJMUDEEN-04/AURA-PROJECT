import React from 'react';
import { X, ShoppingBag, CreditCard, Trash2 } from 'lucide-react';

const CartModal = ({ cart, onClose, onRemove, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div className="sidebar-backdrop" onClick={onClose} style={{ zIndex: 110 }}></div>
      <div className="cart-modal">
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={24} color="#e2e8f0" />
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#ffffff' }}>Your Cart</h2>
            <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '2px 8px', borderRadius: '12px', fontSize: '13px', fontWeight: 600 }}>
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button className="close-sidebar-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} color="rgba(255,255,255,0.1)" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-qty">Qty: {item.quantity}</div>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="cart-remove-btn" onClick={() => onRemove(item.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span style={{ color: '#94a3b8' }}>Subtotal</span>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>${total.toFixed(2)}</span>
            </div>
            <button className="pay-now-btn" onClick={onCheckout}>
              <CreditCard size={20} /> Pay Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
