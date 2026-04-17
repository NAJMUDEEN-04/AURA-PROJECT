import React from 'react';
import { ShoppingBag, LayoutDashboard, Settings, User, X } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div style={{ minWidth: '30px', height: '30px', background: 'var(--accent-gradient)', borderRadius: '8px' }}></div>
          <span className="nav-text">AURA</span>
          <button className="close-sidebar-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="nav-links">
          <button 
            className={`nav-btn ${currentView === 'shopper' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setCurrentView('shopper'); onClose(); }}
          >
            <ShoppingBag size={20} style={{ minWidth: '20px' }} />
            <span className="nav-text">Personal Shopper</span>
          </button>
          <button 
            className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setCurrentView('dashboard'); onClose(); }}
          >
            <LayoutDashboard size={20} style={{ minWidth: '20px' }} />
            <span className="nav-text">Operations</span>
          </button>
        </div>

        <div className="nav-links" style={{ marginTop: 'auto' }}>
          <button className="nav-btn" onClick={(e) => e.stopPropagation()}>
            <User size={20} style={{ minWidth: '20px' }} />
            <span className="nav-text">Profile</span>
          </button>
          <button className="nav-btn" onClick={(e) => e.stopPropagation()}>
            <Settings size={20} style={{ minWidth: '20px' }} />
            <span className="nav-text">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
