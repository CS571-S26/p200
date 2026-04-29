import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import dorms from '../data/dorms'

// Real GPS coordinates for all 21 UW-Madison residence halls
const dormCoords = {
  'Adams Hall':      [43.0779, -89.412248],
  'Barnard Hall':    [43.073686, -89.402278],
  'Bradley Hall':    [43.078047, -89.416375],
  'Chadbourne Hall': [43.073755, -89.401245],
  'Cole Hall':       [43.077332, -89.414890],
  'Dejope Hall':     [43.077752, -89.417859],
  'Humphrey Hall':   [43.077448, -89.412958],
  'Jorns Hall':      [43.077775, -89.413353],
  'Kronshage Hall':  [43.0777, -89.4069],
  'Leopold Hall':    [43.077579, -89.413948],
  'Lowell Hall':     [43.076188, -89.395685],
  'Merit Hall':      [43.070743, -89.401524],
  'Ogg Hall':        [43.0708, -89.4000038],
  'Phillips Hall':   [43.0771, -89.4061],
  'Sellery Hall':    [43.071670, -89.400379],
  'Slichter Hall':   [43.077158, -89.412256],
  'Smith Hall':      [43.069005, -89.400623],
  'Sullivan Hall':   [43.077615, -89.415729],
  'Tripp Hall':      [43.077444, -89.412285],
  'Waters Hall':     [43.076874, -89.406851],
  'Witte Hall':      [43.071468, -89.397058],
}

function MapPage({ reviews }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    // Load Leaflet JS then init map
    const initMap = () => {
      if (mapInstanceRef.current) return
      const L = window.L
      if (!L || !mapRef.current) return

      const map = L.map(mapRef.current, {
        center: [43.0753, -89.4034],
        zoom: 15,
      })

      mapInstanceRef.current = map

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      // Custom UW red marker icon
      const redIcon = L.divIcon({
        className: '',
        html: `<div style="
          background: #c5050c;
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -36],
      })

      dorms.forEach((dorm) => {
        const coords = dormCoords[dorm.name]
        if (!coords) return

        const dormReviews = reviews ? reviews.filter(r => r.dormId === dorm.id) : []
        const reviewCount = dormReviews.length

        const marker = L.marker(coords, { icon: redIcon }).addTo(map)

        marker.bindPopup(`
          <div style="font-family: 'DM Sans', sans-serif; min-width: 180px;">
            <h3 style="font-size: 1rem; margin: 0 0 4px; color: #1a1a1a;">${dorm.name}</h3>
            <p style="color: #555; font-size: 0.8rem; margin: 0 0 4px;">📍 ${dorm.location} · 🚶 ${dorm.distance}</p>
            <p style="margin: 0 0 8px;">
              <span style="color: #e8a020; font-weight: 600;">⭐ ${dorm.rating.toFixed(1)}</span>
              <span style="color: #777; font-size: 0.8rem; margin-left: 6px;">${reviewCount} review${reviewCount !== 1 ? 's' : ''}</span>
            </p>
            <button
              onclick="window.__navigateToDorm(${dorm.id})"
              style="
                background: #c5050c;
                color: #fff;
                border: none;
                padding: 6px 14px;
                border-radius: 6px;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
              "
            >
              View Reviews →
            </button>
          </div>
        `, { maxWidth: 220 })
      })

      // Expose navigate to window so popup button can use it
      window.__navigateToDorm = (id) => {
        navigate(`/dorms/${id}`)
      }
    }

    if (window.L) {
      initMap()
    } else {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.onload = initMap
      document.body.appendChild(script)
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
      delete window.__navigateToDorm
    }
  }, [])

  return (
    <div className="dorms-page">
      <Container>
        <div className="page-header">
          <h1 className="page-title">Dorm Map</h1>
          <p className="page-subtitle">Click any pin to see dorm info and reviews.</p>
        </div>
      </Container>

      <div
        ref={mapRef}
        style={{ height: '70vh', width: '100%', borderRadius: '0', zIndex: 0 }}
        role="application"
        aria-label="Interactive map of UW-Madison residence halls"
      />

      <Container>
        <div className="map-legend">
          <div className="map-legend-item">
            <div className="map-legend-dot southeast" />
            <span>Southeast Neighborhood</span>
          </div>
          <div className="map-legend-item">
            <div className="map-legend-dot lakeshore" />
            <span>Lakeshore Neighborhood</span>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default MapPage