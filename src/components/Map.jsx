'use client'


import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Pin from './pin/Pin';
import Link from 'next/link';
import pin from '../../public/pin.png'
import Image from 'next/image';

// Define custom marker icon
const customMarkerIcon = L.icon({
  iconUrl: "https://static.vecteezy.com/system/resources/previews/010/157/991/original/pin-location-icon-sign-symbol-design-free-png.png",
  iconSize: [32, 32], 
});

const Map = ({ items }) => {
  if (!items || items.length === 0) {
    return <div>No items to display on the map</div>;
  }

  return (
    <div>
      <MapContainer style={{ height: '100vh', width: '100%', borderRadius: "20px" }} center={[items[0].latitude, items[0].longitude]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {items.map(item => (
          <Marker position={[item.latitude, item.longitude]} icon={customMarkerIcon} key={item.id}>
            <Popup>
                <div className="popupContainer">
                    <span className='name'>{item.phaName}</span><br />
                    <Image height={1000} width={1000} className='image' src={item.img} alt='' />
                    <div className="textContainer">
                        <Link href={`${item.id}`}>{item.address}</Link>
                        <b>{item.location}</b>
                    </div>
                </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map;

