"use client"

// CategoryList.jsx
import React, { useState, useEffect } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import { Button } from "./ui/button";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/location", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const LocationList = () => {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getData();
        setLocation(data);
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, []);

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setSelectedLocation(selectedLocation);
  };

  return (
    <div className='mt-8'>
      <h1 className='my-3'>Villes:</h1>
      <div className='relative'>
        <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-10 overflow-y-auto"
        >
            <option value="">Sélectionnez ville</option>
            {location.map((location) => (
            <option key={location.id} value={location.title}>
                {location.title}
            </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            {/* Optional: Add a dropdown icon */}
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 12.586l-6.293-6.293a1 1 0 0 1 1.414-1.414L10 10.172l5.879-5.879a1 1 0 1 1 1.414 1.414L10 12.586z" />
            </svg>
        </div>
      </div>
      {selectedLocation && (
        <div className="flex gap-5">
            <Link href={`/feed?loc=${selectedLocation}`}>
                <button className="block mt-2 text-white bg-[#00A4BF] w-[105px] h-[44px] px-26 rounded-md">Filtrer villes</button>
            </Link>
        </div>
      )}
    </div>
  );
};

export default LocationList;
