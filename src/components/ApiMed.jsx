"use client"
import React, { useState, useEffect } from 'react';

const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=ma&category=health&apiKey=f64239a349844fac8536b4b0738d42b2`;

const IndexPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Top Health Headlines in Morocco</h1>
      <div className="flex flex-wrap -mx-4">
        {articles.map((article, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
            <div className="border border-gray-200 rounded p-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {article.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;




// "use client"

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const FetchDataComponent = () => {
//   const [centers, setCenters] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCenters = async () => {
//       try {
//         // Fetching centers data using axios
//         const response = await axios.get('https://moroccan-blood-donation.sifeddineeddr.repl.co/centers');

//         // Once data is fetched, set it to state
//         setCenters(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching centers data:', error);
//         setLoading(false);
//       }
//     };

//     fetchCenters();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading centers data...</p>
//       ) : (
//         <div>
//           <h2>Centers</h2>
//           <ul>
//             {centers.map(center => (
//               <li key={center.id}>
//                 {center.name} - {center.location}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FetchDataComponent;
