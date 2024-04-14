import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import './pin.css';
import Link from 'next/link';

const Pin = ({ item }) => {
    if (!item || !item.latitude || !item.longitude) {
        // If item or its latitude/longitude are missing, return null
        return null;
    }

    return (
        <Marker position={[item.latitude, item.longitude]}>
            <Popup>
                <div className="popupContainer">
                    <span className='name'>{item.phaName}</span><br />
                    <img className='image' src={item.img} alt='' />
                    <div className="textContainer">
                        <Link href={`${item.id}`}>{item.address}</Link>
                        <b>{item.location}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export default Pin;
