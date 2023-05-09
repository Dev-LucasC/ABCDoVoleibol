import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dropdownequipes.css'


const Album = () => {
  const [posts, setPosts] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    axios
      .get('https://shark-app-6myi8.ondigitalocean.app/api/albums?populate=*')
      .then((response) => {
        const { data } = response.data;
        console.log('Data:', data);

        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log('Sorted Data:', sortedData);

        // Separar as fotos por ano
        const photosByYear = {};
        sortedData.forEach((post) => {
          const year = post.attributes.Ano;
          if (!photosByYear[year]) {
            photosByYear[year] = [];
          }
          photosByYear[year].push(...post.attributes.fotos.data);
        });

        setPosts(photosByYear);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  return (
    <div className="album-container">
      <h1>Álbum</h1>
      <hr size="6" width="100%" align="left" color="black" />

      <div className="year-list">
        {Object.keys(posts).map((year) => (
          <button
            key={year}
            className={`year-button ${selectedYear === year ? 'selected' : ''}`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="photo-grid">
        {selectedYear && (
          <>
            {posts[selectedYear].map((photo) => (
              <div key={photo.id} className="photo-item">
                <img src={photo.attributes.url} alt="Imagem" />
              </div>
            ))}
          </>
        )}
      </div>

     
    </div>
  );
};

export default Album;
