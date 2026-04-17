import React, { useState } from 'react';
import { initialProducts } from '../data/mockData';
import { X, ShoppingCart, Star, Tag, ChevronRight, Search, Package } from 'lucide-react';

/* ─────────────────────────────── Product Detail Fullscreen ─────────── */
const ProductDetail = ({ product, onClose, onAddToCart }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="overlay-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="product-detail-inner">
          {/* Image */}
          <div className="product-detail-image-wrap">
            <img src={product.image} alt={product.name} className="product-detail-image" />
            <div className="product-detail-badge">
              <Tag size={13} /> {product.category}
            </div>
          </div>

          {/* Info */}
          <div className="product-detail-info">
            <div className="product-detail-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < 4 ? '#f59e0b' : 'none'} color="#f59e0b" />
              ))}
              <span style={{ color: '#9ca3af', fontSize: '13px', marginLeft: '8px' }}>4.0 (128 reviews)</span>
            </div>

            <h2 className="product-detail-name">{product.name}</h2>
            <div className="product-detail-price">${product.price.toFixed(2)}</div>

            <p className="product-detail-desc">{product.description}</p>

            <div className="product-detail-divider" />

            {/* Quantity */}
            <div className="product-detail-qty-row">
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>Quantity</span>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Add to cart */}
            <button className={`product-detail-cart-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
              {added ? (
                <><Package size={18} /> Added to Cart!</>
              ) : (
                <><ShoppingCart size={18} /> Add to Cart — ${(product.price * qty).toFixed(2)}</>
              )}
            </button>

            <button className="product-detail-wishlist-btn">♡ &nbsp;Save to Wishlist</button>

            {/* Tags */}
            <div className="product-detail-tags">
              {product.tags.map(t => (
                <span key={t} className="product-tag">#{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────── Search Results List ───────────────── */
const SearchResultsList = ({ results, query, onSelect, onClose }) => (
  <div className="search-overlay" onClick={onClose}>
    <div className="search-results-panel glass-panel" onClick={e => e.stopPropagation()}>
      <div className="search-results-header">
        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>
          {results.length} result{results.length !== 1 ? 's' : ''} for "<span style={{ color: '#a78bfa' }}>{query}</span>"
        </h2>
        <button className="overlay-close-btn" style={{ position: 'static' }} onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
          <Search size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
          <p>No products match your search.</p>
        </div>
      ) : (
        <div className="search-results-grid">
          {results.map(product => (
            <div key={product.id} className="search-result-card glass-panel" onClick={() => onSelect(product)}>
              <img src={product.image} alt={product.name} className="search-result-img" />
              <div className="search-result-body">
                <span className="search-result-cat">{product.category}</span>
                <h3 className="search-result-name">{product.name}</h3>
                <p className="search-result-desc">{product.description.slice(0, 90)}…</p>
                <div className="search-result-footer">
                  <span className="search-result-price">${product.price.toFixed(2)}</span>
                  <button className="search-result-view">View Details <ChevronRight size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

/* ─────────────────────────────── Main Export ───────────────────────── */
const SearchOverlay = ({ query, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const results = initialProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleAddToCart = (product, qty) => {
    setCart(prev => [...prev, { ...product, qty }]);
  };

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    );
  }

  return (
    <SearchResultsList
      results={results}
      query={query}
      onSelect={setSelectedProduct}
      onClose={onClose}
    />
  );
};

export default SearchOverlay;
export { ProductDetail };
