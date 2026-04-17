import React, { useState } from 'react';
import { Send, ShoppingCart, Sparkles } from 'lucide-react';
import { initialProducts } from '../data/mockData';

const ShopperView = ({ addToCart }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Aura, your AI stylist. What are you looking for today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState(initialProducts);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMessages = [...messages, { id: Date.now(), text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const isEvening = newMessages[newMessages.length - 1].text.toLowerCase().includes('evening');
      
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: isEvening ? "I've curated some elegant evening options for you. The Midnight Silk Blouse is a favorite!" : "I've updated the selection based on your preferences. Let me know what catches your eye!", 
        sender: 'bot' 
      }]);

      if (isEvening) {
        setProducts(initialProducts.filter(p => p.tags.includes('evening') || p.tags.includes('jewelry')));
      } else {
        setProducts(initialProducts);
      }
    }, 1000);
  };

  return (
    <>
      <h1>Discover</h1>
      <p className="subtitle">Personalized recommendations powered by AI</p>
      
      <div className="shopper-layout">
        <div className="glass-panel chat-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--accent-primary)' }}>
            <Sparkles size={20} />
            <span style={{ fontWeight: '600' }}>Aura Assistant</span>
          </div>
          
          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              className="chat-input"
              placeholder="E.g., I need a summer outfit..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px', overflowY: 'auto' }}>
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="glass-panel product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-price">${product.price.toFixed(2)}</div>
                  <button className="add-to-cart" onClick={() => addToCart(product)}>
                    <ShoppingCart size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopperView;
