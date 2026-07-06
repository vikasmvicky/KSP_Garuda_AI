import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const crimeHotspots = [
  ["Bengaluru City", 12.9716, 77.5946, 37181],
  ["Mysuru City", 12.2958, 76.6394, 2224],
  ["Mangaluru City", 12.9141, 74.8560, 2278],
  ["Hubballi-Dharwad", 15.3647, 75.1240, 1488],
  ["Belagavi City", 15.8522, 74.4984, 1655],
  ["Kalaburagi City", 17.3297, 76.8343, 1730],
  ["Tumakuru", 13.0674, 77.1019, 5961],
  ["Shivamogga", 13.9299, 75.5681, 4840],
  ["Davanagere", 14.4632, 75.9210, 3385],
  ["Ballari", 15.1395, 76.9280, 1924],
]

function CrimeMap() {
  return (
    <MapContainer 
      center={[15.3173, 75.7139]} 
      zoom={7} 
      style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {crimeHotspots.map((city, index) => (
        <CircleMarker
          key={index}
          center={[city[1], city[2]]}
          radius={Math.sqrt(city[3]) / 4} 
          pathOptions={{
            color: '#ef4444',
            fillColor: '#ef4444',
            fillOpacity: 0.4,
            weight: 1
          }}
        >
          <Tooltip>
            <div style={{ color: 'black', fontWeight: 'bold' }}>
              {city[0]}: {city[3].toLocaleString()} IPC Crimes
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default CrimeMap