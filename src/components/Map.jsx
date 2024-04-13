"use client"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  // Define the position for the map center
  const position = [51.505, -0.09];
  
  return (
    <>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} className='h-[100%] w-[100%] rounded-sm'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </>
  );
}

export default Map;
