import React, { useState, useEffect } from 'react';


const TestApi = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('https://www.hibaaatae.com/api/posts/donatePosts');
  
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
  
          const jsonData = await res.json();
          setData(jsonData);
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchData();
    }, []);
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!data) {
      return <p>Loading data...</p>;
    }
  
    console.log('Fetched Data:', data); // This line logs the fetched data
  
    return (
      <div>
        {/* You can optionally render the data here for visual inspection */}
      </div>
    );
  };
  
  export default TestApi;