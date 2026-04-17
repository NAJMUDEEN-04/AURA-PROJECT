import React, { useState } from 'react';
import { TrendingUp, Package, AlertTriangle, Users, X, FileText, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { inventoryAlerts, salesData } from '../data/mockData';

const fullReportData = [
  { product: 'Oxford Shirt', sold: 320, revenue: 41574, restock: 'Yes' },
  { product: 'Backpack', sold: 210, revenue: 18795, restock: 'No' },
  { product: 'Smart Watch', sold: 95, revenue: 23655, restock: 'Yes' },
  { product: 'Linen Trousers', sold: 180, revenue: 13500, restock: 'No' },
  { product: 'Running Shoes', sold: 440, revenue: 63800, restock: 'Yes' },
  { product: 'Earrings', sold: 247, revenue: 11115, restock: 'No' },
];

const FullReportModal = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      animation: 'fadeIn 0.2s ease'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(135,206,235,0.85) 0%, rgba(178,240,200,0.85) 100%)',
        border: '1px solid rgba(255,255,255,0.85)',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '860px',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '32px',
        position: 'relative',
        animation: 'slideUp 0.3s ease'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <FileText size={22} color="#8b5cf6" />
              <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Full Inventory Report</h2>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>Generated on {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(8, 145, 178, 0.15)', border: '1px solid rgba(8, 145, 178, 0.4)',
              color: '#0891b2', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', fontSize: '14px'
            }}>
              <Download size={15} /> Export CSV
            </button>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.7)',
              color: '#3d6b80', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex'
            }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Summary Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total Revenue', value: '$162,439', trend: '+12.5%', up: true },
            { label: 'Units Sold', value: '1,492', trend: '+8.1%', up: true },
            { label: 'Restock Needed', value: '3 Items', trend: 'Action required', up: false },
          ].map((item, i) => (
            <div key={i} style={{ background: 'linear-gradient(135deg, rgba(135,206,235,0.45), rgba(178,240,200,0.45))', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.7)' }}>
              <p style={{ color: '#3d6b80', fontSize: '13px', marginBottom: '6px' }}>{item.label}</p>
              <p style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px', color: '#0f2a3a' }}>{item.value}</p>
              <p style={{ fontSize: '13px', color: item.up ? '#10b981' : '#f59e0b' }}>{item.trend}</p>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Revenue by Product</h3>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fullReportData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="product" stroke="#9ca3af" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(20, 20, 30, 0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Table */}
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Product Breakdown</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ color: '#9ca3af', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ textAlign: 'left', padding: '10px 12px', fontWeight: 500 }}>Product</th>
              <th style={{ textAlign: 'right', padding: '10px 12px', fontWeight: 500 }}>Units Sold</th>
              <th style={{ textAlign: 'right', padding: '10px 12px', fontWeight: 500 }}>Revenue</th>
              <th style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 500 }}>Restock?</th>
            </tr>
          </thead>
          <tbody>
            {fullReportData.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(135,206,235,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px', color: '#0f2a3a' }}>{row.product}</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#0891b2' }}>{row.sold}</td>
                <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#0f2a3a' }}>${row.revenue.toLocaleString()}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                    background: row.restock === 'Yes' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                    color: row.restock === 'Yes' ? '#fca5a5' : '#6ee7b7'
                  }}>
                    {row.restock === 'Yes' ? '⚠ Restock' : '✓ OK'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OperationsDashboard = () => {
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <h1>Operations Center</h1>
      <p className="subtitle">Real-time store analytics and inventory prediction</p>

      {showReport && <FullReportModal onClose={() => setShowReport(false)} />}

      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span style={{ fontWeight: 500 }}>Total Revenue</span>
            <div className="stat-icon purple">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="stat-value">$124,563</div>
          <div className="stat-trend up">↑ 12.5% vs last week</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span style={{ fontWeight: 500 }}>Active Users</span>
            <div className="stat-icon blue">
              <Users size={24} />
            </div>
          </div>
          <div className="stat-value">2,845</div>
          <div className="stat-trend up">↑ 5.2% vs last week</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span style={{ fontWeight: 500 }}>Items Sold</span>
            <div className="stat-icon green">
              <Package size={24} />
            </div>
          </div>
          <div className="stat-value">1,492</div>
          <div className="stat-trend up">↑ 8.1% vs last week</div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-header">
            <span style={{ fontWeight: 500 }}>Restock Alerts</span>
            <div className="stat-icon red">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="stat-value">3</div>
          <div className="stat-trend down">Requires attention</div>
        </div>

        <div className="glass-panel chart-card">
          <h2 className="card-title">Omnichannel Sales Trend</h2>
          <ResponsiveContainer width="100%" height="100%" minHeight={300}>
            <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInStore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
              <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(20, 20, 30, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="online" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorOnline)" name="Online Sales" />
              <Area type="monotone" dataKey="inStore" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInStore)" name="In-Store Sales" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel side-card">
          <h2 className="card-title">AI Inventory Predictions</h2>
          <div className="inventory-list">
            {inventoryAlerts.map(item => (
              <div key={item.id} className="inventory-item">
                <div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-stock">Stock: {item.stock} units</div>
                </div>
                <div className={`status-badge ${item.status}`}>
                  {item.status === 'critical' ? 'Restock Now' : item.status === 'warning' ? 'Low Stock' : 'Healthy'}
                </div>
              </div>
            ))}
          </div>
          <button
            id="view-full-report-btn"
            onClick={() => setShowReport(true)}
            style={{
              marginTop: 'auto',
              padding: '12px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              border: 'none',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
              transition: 'opacity 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <FileText size={16} />
            View Full Report
          </button>
        </div>
      </div>
    </>
  );
};

export default OperationsDashboard;
