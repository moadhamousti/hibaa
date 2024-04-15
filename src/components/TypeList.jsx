"use client"

// TypeList.jsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TypeList = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/typePost", {
          cache: "no-store"
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setTypes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    if (selectedType) {
      router.push(`/feed?type=${encodeURIComponent(selectedType)}`);
    } else {
      router.push("/feed");
    }
  };

  return (
    <div className="mt-8">
      <div className="relative">
      <select
        value={selectedType}
        onChange={handleTypeChange}
        className="block appearance-none w-full text-white bg-[--darkishBlue] border  px-4 py-2 pr-8 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline h-10 overflow-y-auto"
      >
        <option value="">Post type</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type === 'DONATION' ? 'Donation' : type === 'REQUEST' ? 'Demande' : type}
          </option>
        ))}
      </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12.586l-6.293-6.293a1 1 0 0 1 1.414-1.414L10 10.172l5.879-5.879a1 1 0 1 1 1.414 1.414L10 12.586z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TypeList;
