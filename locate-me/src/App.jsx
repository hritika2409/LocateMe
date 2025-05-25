import React, { useState, useMemo, useEffect } from 'react';

// Initial profiles data
const initialProfiles = [
  {
    id: 1,
    name: 'Ananya Sharma',
    description: 'Full Stack Developer',
    address: 'No. 12, MG Road, Bengaluru, Karnataka',
    photo: 'https://randomuser.me/api/portraits/women/65.jpg',
    details: 'Ananya has 7+ years of experience building scalable web apps with React, Node.js, and AWS. Specializes in e-commerce and SaaS platforms.',
    lat: 12.9716,
    lng: 77.5946,
    rating: 4.9,
    projects: 42
  },
  {
    id: 2,
    name: 'Rohit Verma',
    description: 'Digital Marketing Strategist',
    address: 'Flat 5B, Andheri West, Mumbai, Maharashtra',
    photo: 'https://randomuser.me/api/portraits/men/52.jpg',
    details: 'Rohit specializes in SEO, SEM, and data-driven campaigns. Has helped 40+ startups boost user acquisition by over 250%.',
    lat: 19.0760,
    lng: 72.8777,
    rating: 4.8,
    projects: 36
  },
  {
    id: 3,
    name: 'Priya Nair',
    description: 'Creative Photographer',
    address: '5A, Marine Drive, Kochi, Kerala',
    photo: 'https://randomuser.me/api/portraits/women/72.jpg',
    details: 'Priya captures stunning moments for brands and individuals. Award-winning photographer with expertise in fashion and commercial shoots.',
    lat: 9.9312,
    lng: 76.2673,
    rating: 4.9,
    projects: 58
  },
  {
    id: 4,
    name: 'Arjun Singh',
    description: 'Mobile App Developer',
    address: 'Plot No. 23, Sector 62, Noida, Uttar Pradesh',
    photo: 'https://randomuser.me/api/portraits/men/48.jpg',
    details: 'Arjun builds cross-platform apps with React Native and Flutter. Published 12+ apps with over 800K downloads.',
    lat: 28.5355,
    lng: 77.3910,
    rating: 4.7,
    projects: 30
  },
  {
    id: 5,
    name: 'Shreya Patel',
    description: 'UX/UI Designer',
    address: 'Block C, SG Highway, Ahmedabad, Gujarat',
    photo: 'https://randomuser.me/api/portraits/women/54.jpg',
    details: 'Shreya creates intuitive user experiences. Former Infosys designer with deep expertise in design systems and user research.',
    lat: 23.0225,
    lng: 72.5714,
    rating: 4.9,
    projects: 44
  },
  {
    id: 6,
    name: 'Vikram Rao',
    description: 'AI/ML Engineer',
    address: '143, HITEC City, Hyderabad, Telangana',
    photo: 'https://randomuser.me/api/portraits/men/60.jpg',
    details: 'Vikram develops cutting-edge ML solutions. PhD in CS with focus on NLP and computer vision, has several papers in top conferences.',
    lat: 17.3850,
    lng: 78.4867,
    rating: 4.8,
    projects: 24
  },

];

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          background: '#fee2e2', 
          borderRadius: '8px',
          margin: '1rem',
          color: '#dc2626'
        }}>
          <h2>🚨 Something went wrong</h2>
          <p>We encountered an unexpected error. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Spinner Component
const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    gap: '1rem'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f4f6',
      borderTop: '4px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ color: '#6b7280' }}>{message}</p>
  </div>
);

// Enhanced Map Component with Error Handling
const MapComponent = ({ profile, onError }) => {
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [profile]);

  const handleMapError = () => {
    setMapError(true);
    setMapLoading(false);
    if (onError) onError('Failed to load map');
  };

  if (mapError) {
    return (
      <div style={{
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fee2e2',
        borderRadius: '12px',
        color: '#dc2626',
        gap: '1rem'
      }}>
        <span style={{ fontSize: '2rem' }}>🗺️</span>
        <p>Unable to load map for this location</p>
        <button 
          onClick={() => {
            setMapError(false);
            setMapLoading(true);
          }}
          style={{
            padding: '0.5rem 1rem',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: '300px' }}>
      {mapLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.9)',
          zIndex: 10,
          borderRadius: '12px'
        }}>
          <LoadingSpinner message="Loading map..." />
        </div>
      )}
      <iframe
        title="map"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0, borderRadius: '12px' }}
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${profile.lng-0.02}%2C${profile.lat-0.02}%2C${profile.lng+0.02}%2C${profile.lat+0.02}&layer=mapnik&marker=${profile.lat}%2C${profile.lng}`}
        allowFullScreen
        onError={handleMapError}
        onLoad={() => setMapLoading(false)}
      />
    </div>
  );
};

// Profile Form Component for Admin
const ProfileForm = ({ profile = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    description: profile?.description || '',
    address: profile?.address || '',
    photo: profile?.photo || '',
    details: profile?.details || '',
    lat: profile?.lat?.toString() || '',
    lng: profile?.lng?.toString() || '',
    rating: profile?.rating?.toString() || '4.0',
    projects: profile?.projects?.toString() || '0'
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.photo.trim()) newErrors.photo = 'Photo URL is required';
    if (!formData.details.trim()) newErrors.details = 'Details are required';
    
    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.lng);
    if (isNaN(lat) || lat < -90 || lat > 90) newErrors.lat = 'Valid latitude (-90 to 90) required';
    if (isNaN(lng) || lng < -180 || lng > 180) newErrors.lng = 'Valid longitude (-180 to 180) required';
    
    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) newErrors.rating = 'Rating must be between 0 and 5';
    
    const projects = parseInt(formData.projects);
    if (isNaN(projects) || projects < 0) newErrors.projects = 'Projects must be a positive number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      const profileData = {
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        rating: parseFloat(formData.rating),
        projects: parseInt(formData.projects),
        id: profile?.id || Date.now()
      };
      await onSave(profileData);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem'
  };

  const errorStyle = {
    color: '#dc2626',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>
        {profile ? 'Edit Profile' : 'Add New Profile'}
      </h2>
      
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={{...inputStyle, borderColor: errors.name ? '#dc2626' : '#d1d5db'}}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Description *</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            style={{...inputStyle, borderColor: errors.description ? '#dc2626' : '#d1d5db'}}
          />
          {errors.description && <div style={errorStyle}>{errors.description}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Address *</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            style={{...inputStyle, borderColor: errors.address ? '#dc2626' : '#d1d5db'}}
          />
          {errors.address && <div style={errorStyle}>{errors.address}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Photo URL *</label>
          <input
            type="url"
            value={formData.photo}
            onChange={(e) => setFormData({...formData, photo: e.target.value})}
            style={{...inputStyle, borderColor: errors.photo ? '#dc2626' : '#d1d5db'}}
          />
          {errors.photo && <div style={errorStyle}>{errors.photo}</div>}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Details *</label>
          <textarea
            value={formData.details}
            onChange={(e) => setFormData({...formData, details: e.target.value})}
            rows={4}
            style={{...inputStyle, borderColor: errors.details ? '#dc2626' : '#d1d5db'}}
          />
          {errors.details && <div style={errorStyle}>{errors.details}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Latitude *</label>
            <input
              type="number"
              step="any"
              value={formData.lat}
              onChange={(e) => setFormData({...formData, lat: e.target.value})}
              style={{...inputStyle, borderColor: errors.lat ? '#dc2626' : '#d1d5db'}}
            />
            {errors.lat && <div style={errorStyle}>{errors.lat}</div>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Longitude *</label>
            <input
              type="number"
              step="any"
              value={formData.lng}
              onChange={(e) => setFormData({...formData, lng: e.target.value})}
              style={{...inputStyle, borderColor: errors.lng ? '#dc2626' : '#d1d5db'}}
            />
            {errors.lng && <div style={errorStyle}>{errors.lng}</div>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Rating (0-5) *</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: e.target.value})}
              style={{...inputStyle, borderColor: errors.rating ? '#dc2626' : '#d1d5db'}}
            />
            {errors.rating && <div style={errorStyle}>{errors.rating}</div>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Projects *</label>
            <input
              type="number"
              min="0"
              value={formData.projects}
              onChange={(e) => setFormData({...formData, projects: e.target.value})}
              style={{...inputStyle, borderColor: errors.projects ? '#dc2626' : '#d1d5db'}}
            />
            {errors.projects && <div style={errorStyle}>{errors.projects}</div>}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          style={{
            padding: '0.75rem 1.5rem',
            border: '1px solid #d1d5db',
            background: 'white',
            borderRadius: '6px',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.5 : 1
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '0.75rem 1.5rem',
            background: saving ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {saving && <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>}
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ profiles, onAddProfile, onEditProfile, onDeleteProfile, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleSave = (profileData) => {
    if (editingProfile) {
      onEditProfile(editingProfile.id, profileData);
    } else {
      onAddProfile(profileData);
    }
    setShowForm(false);
    setEditingProfile(null);
  };

  const handleDelete = (id) => {
    onDeleteProfile(id);
    setDeleteConfirm(null);
  };

  if (showForm) {
    return (
      <ProfileForm
        profile={editingProfile}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingProfile(null);
        }}
      />
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1f2937' }}>👑 Admin Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            ➕ Add Profile
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ← Back to App
          </button>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ 
          background: '#f9fafb', 
          padding: '1rem 1.5rem', 
          borderBottom: '1px solid #e5e7eb',
          fontWeight: 'bold',
          color: '#374151'
        }}>
          Profiles ({profiles.length})
        </div>
        
        {profiles.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
            <p>No profiles yet. Add your first profile!</p>
          </div>
        ) : (
          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {profiles.map((profile) => (
              <div key={profile.id} style={{ 
                padding: '1.5rem', 
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <img 
                  src={profile.photo} 
                  alt={profile.name}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAzMEM0MS4wNDU3IDMwIDUwIDIxLjA0NTcgNTAgMTBDNTAgLTEuMDQ1NyA0MS4wNDU3IC0xMCAzMCAtMTBDMTguOTU0MyAtMTAgMTAgLTEuMDQ1NyAxMCAxMEMxMCAyMS4wNDU3IDE4Ljk1NDMgMzAgMzAgMzBaIiBmaWxsPSIjRDFEM0Q2Ii8+Cjx0ZXh0IHg9IjMwIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzZCNzI4MCIgZm9udC1zaXplPSIxMCI+Tm8gSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.25rem 0', color: '#1f2937' }}>{profile.name}</h3>
                  <p style={{ margin: '0 0 0.25rem 0', color: '#6b7280' }}>{profile.description}</p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: '#9ca3af' }}>
                    📍 {profile.address} | ⭐ {profile.rating} | 💼 {profile.projects} projects
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setEditingProfile(profile);
                      setShowForm(true);
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(profile)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#dc2626' }}>⚠️ Confirm Delete</h3>
            <p style={{ margin: '0 0 1.5rem 0', color: '#374151' }}>
              Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Enhanced ProfileCard component
const ProfileCard = ({ profile, onViewMap, onViewDetails, onLike, isLiked }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid #f3f4f6'
    }}>
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img 
          src={imageError ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiNEMUQzRDYiLz4KPHR4ZXQgeD0iMTUwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2QjcyODAiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K' : profile.photo}
          alt={profile.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={() => setImageError(true)}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', color: 'white', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>⭐</span>
              <span>{profile.rating}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span>💼</span>
              <span>{profile.projects}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
          {profile.name}
        </h2>
        <p style={{ margin: '0 0 0.75rem 0', color: '#6b7280', fontWeight: '500' }}>
          {profile.description}
        </p>
        <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span>📍</span>
          {profile.address}
        </p>
        
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <button
            onClick={() => onLike(profile.id)}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: isLiked ? 'none' : '1px solid #e5e7eb',
              background: isLiked ? '#ef4444' : 'white',
              color: isLiked ? 'white' : '#6b7280',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{isLiked ? '❤️' : '🤍'}</span>
            {isLiked ? 'Liked' : 'Like'}
          </button>
          <button
            onClick={() => onViewMap(profile)}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #3b82f6',
              background: 'white',
              color: '#3b82f6',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <span>📍</span>
            Map
          </button>
        </div>
        
        <button
          onClick={() => onViewDetails(profile)}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          View Profile
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

// Enhanced Modal component
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            zIndex: 10,
            color: '#6b7280'
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const categories = [
  'All',
  'Full Stack Developer',
  'Digital Marketing Strategist',
  'Creative Photographer',
  'Mobile App Developer',
  'UX/UI Designer',
  'AI/ML Engineer',
  'Content Creator',
  'Data Scientist',
  'Brand Strategist',
  'DevOps Engineer',
  'Product Manager',
  'Cybersecurity Expert'
];

const App = () => {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('profiles');
    return saved ? JSON.parse(saved) : initialProfiles;
  });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem('likedProfiles');
    return saved ? JSON.parse(saved) : [];
  });
  const [mapProfile, setMapProfile] = useState(null);
  const [detailsProfile, setDetailsProfile] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [error, setError] = useState(null);

  // Save to localStorage whenever profiles or liked changes
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('likedProfiles', JSON.stringify(liked));
  }, [liked]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      const matchesSearch =
        profile.name.toLowerCase().includes(search.toLowerCase()) ||
        profile.description.toLowerCase().includes(search.toLowerCase()) ||
        profile.address.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        filter === 'All' || profile.description.includes(filter);
      return matchesSearch && matchesFilter;
    });
  }, [search, filter, profiles]);

  const handleLike = (id) => {
    setLiked(prev =>
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setError(null);
    } else {
      setError('Invalid password. Hint: admin123');
    }
  };

  const handleAddProfile = (profileData) => {
    setProfiles(prev => [...prev, { ...profileData, id: Date.now() }]);
  };

  const handleEditProfile = (id, updatedData) => {
    setProfiles(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
  };

  const handleDeleteProfile = (id) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    setLiked(prev => prev.filter(l => l !== id));
  };

  const handleMapError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  };

  if (showAdmin) {
    return (
      <ErrorBoundary>
        <AdminDashboard
          profiles={profiles}
          onAddProfile={handleAddProfile}
          onEditProfile={handleEditProfile}
          onDeleteProfile={handleDeleteProfile}
          onClose={() => setShowAdmin(false)}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Global Styles */}
        <style>
          {`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
          `}
        </style>

        {/* Error Banner */}
        {error && (
          <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            background: '#fee2e2',
            color: '#dc2626',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            maxWidth: '300px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚠️</span>
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#dc2626', 
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{
          background: 'white',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🗺</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>LocateMe</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#1f2937' }}>{profiles.length}</span> Talents
                </div>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#ef4444' }}>{liked.length}</span> Liked
                </div>
              </div>
              <button
                onClick={() => setShowAdminLogin(true)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                👑 Admin
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              margin: '0 0 1rem 0',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Discover Amazing <span style={{ color: '#fbbf24' }}>Talents</span>
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              margin: '0 0 3rem 0',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              Connect with world-class professionals, creatives, and innovators in your area.
              Find the perfect collaborator for your next big project.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              maxWidth: '600px', 
              margin: '0 auto',
              flexWrap: 'wrap'
            }}>
              <div style={{ 
                flex: '2', 
                position: 'relative',
                minWidth: '250px'
              }}>
                <span style={{ 
                  position: 'absolute', 
                  left: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  fontSize: '1.25rem'
                }}>
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search by name, skill, or location..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
              <div style={{ 
                position: 'relative',
                minWidth: '200px'
              }}>
                <span style={{ 
                  position: 'absolute', 
                  left: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  fontSize: '1.25rem'
                }}>
                  🎯
                </span>
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    background: 'white'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Profiles Section */}
        <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0 0 0.5rem 0'
            }}>
              {filteredProfiles.length} Talented Professional{filteredProfiles.length !== 1 ? 's' : ''}
              {filter !== 'All' && (
                <span style={{
                  marginLeft: '1rem',
                  padding: '0.25rem 0.75rem',
                  background: '#3b82f6',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: 'normal'
                }}>
                  {filter}
                </span>
              )}
            </h2>
          </div>
          
          {filteredProfiles.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: '#1f2937', margin: '0 0 0.5rem 0' }}>No profiles found</h3>
              <p style={{ color: '#6b7280', margin: 0 }}>Try adjusting your search terms or filters</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {filteredProfiles.map(profile => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onViewMap={setMapProfile}
                  onViewDetails={setDetailsProfile}
                  onLike={handleLike}
                  isLiked={liked.includes(profile.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Map Modal */}
        <Modal open={!!mapProfile} onClose={() => setMapProfile(null)}>
          {mapProfile && (
            <div style={{ width: '800px', maxWidth: '90vw' }}>
              <div style={{ 
                padding: '2rem 2rem 1rem 2rem',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img 
                    src={mapProfile.photo} 
                    alt={mapProfile.name}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h2 style={{ margin: '0 0 0.25rem 0', color: '#1f2937' }}>
                      {mapProfile.name}
                    </h2>
                    <p style={{ margin: 0, color: '#6b7280' }}>
                      {mapProfile.description}
                    </p>
                  </div>
                </div>
                <div style={{ 
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#6b7280'
                }}>
                  <span>📍</span>
                  <span>{mapProfile.address}</span>
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <MapComponent 
                  profile={mapProfile} 
                  onError={handleMapError}
                />
              </div>
            </div>
          )}
        </Modal>

        {/* Details Modal */}
        <Modal open={!!detailsProfile} onClose={() => setDetailsProfile(null)}>
          {detailsProfile && (
            <div style={{ width: '600px', maxWidth: '90vw' }}>
              <div style={{ 
                padding: '2rem',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <img
                    src={detailsProfile.photo}
                    alt={detailsProfile.name}
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h2 style={{ 
                      margin: '0 0 0.5rem 0', 
                      fontSize: '1.5rem',
                      color: '#1f2937' 
                    }}>
                      {detailsProfile.name}
                    </h2>
                    <p style={{ 
                      margin: '0 0 1rem 0', 
                      color: '#6b7280',
                      fontSize: '1.125rem',
                      fontWeight: '500'
                    }}>
                      {detailsProfile.description}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      gap: '1.5rem',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span>⭐</span>
                        <span>{detailsProfile.rating} Rating</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span>💼</span>
                        <span>{detailsProfile.projects} Projects</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ 
                  marginTop: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  <span>📍</span>
                  <span>{detailsProfile.address}</span>
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h3 style={{ 
                  margin: '0 0 1rem 0',
                  color: '#1f2937',
                  fontSize: '1.125rem'
                }}>
                  About
                </h3>
                <p style={{ 
                  margin: '0 0 2rem 0',
                  color: '#374151',
                  lineHeight: 1.6
                }}>
                  {detailsProfile.details}
                </p>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => handleLike(detailsProfile.id)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      border: liked.includes(detailsProfile.id) ? 'none' : '1px solid #e5e7eb',
                      background: liked.includes(detailsProfile.id) ? '#ef4444' : 'white',
                      color: liked.includes(detailsProfile.id) ? 'white' : '#6b7280',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {liked.includes(detailsProfile.id) ? '❤️ Liked' : '🤍 Like'}
                  </button>
                  <button
                    onClick={() => {
                      setDetailsProfile(null);
                      setMapProfile(detailsProfile);
                    }}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    📍 View Location
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Admin Login Modal */}
        <Modal open={showAdminLogin} onClose={() => {
          setShowAdminLogin(false);
          setAdminPassword('');
          setError(null);
        }}>
          <div style={{ width: '400px', maxWidth: '90vw', padding: '2rem' }}>
            <h2 style={{ margin: '0 0 1.5rem 0', textAlign: 'center', color: '#1f2937' }}>
              👑 Admin Access
            </h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
                placeholder="Enter admin password"
                autoFocus
              />
              {error && (
                <div style={{ 
                  color: '#dc2626', 
                  fontSize: '0.875rem', 
                  marginTop: '0.5rem' 
                }}>
                  {error}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPassword('');
                  setError(null);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdminLogin}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Login
              </button>
            </div>
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              background: '#f3f4f6', 
              borderRadius: '6px',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              💡 Demo password: <code style={{ background: '#e5e7eb', padding: '0.125rem 0.25rem', borderRadius: '3px' }}>admin123</code>
            </div>
          </div>
        </Modal>
      </div>
    </ErrorBoundary>
  );
};

export default App;