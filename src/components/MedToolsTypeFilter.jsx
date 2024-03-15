import React from 'react'

const MedToolsTypeFilter = () => {
    const majorCities = [
        "Mobility Aids",
        "Assistive Devices",
        "Patient Transfer Equipment",
        "Home Care Supplies",
        "Rehabilitation Equipment",
        "Orthopedic Aids",
      ];
  return (
    <div className="relative">
      <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-10 overflow-y-auto">
        {majorCities.map((city, index) => (
          <option key={index} value={city}>{city}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        {/* Optional: Add a dropdown icon */}
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12.586l-6.293-6.293a1 1 0 0 1 1.414-1.414L10 10.172l5.879-5.879a1 1 0 1 1 1.414 1.414L10 12.586z"/></svg>
      </div>
    </div>
  )
}

export default MedToolsTypeFilter