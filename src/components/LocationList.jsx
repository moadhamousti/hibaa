"use client"

// CategoryList.jsx
import React, { useState, useEffect } from "react";
import styles from "./categoryList.module.css";
import { useRouter } from "next/navigation";

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
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getData();
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    setSelectedLocation(selectedLocation);
    // Filter immediately after location selection
    if (selectedLocation) {
      router.push(`/feed?loc=${encodeURIComponent(selectedLocation)}`);
    } else {
      router.push("/feed");
    }
  };

  return (
    <div className='mt-8'>
      <h1 className='my-3'>Villes:</h1>
      <div className='relative'>
        <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="block appearance-none w-full bg-white border border-gray-200  px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline h-10 overflow-y-auto"

        >
            <option value="">Sélectionnez ville</option>
            {locations.map((location) => (
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
    </div>
  );
};

export default LocationList;

