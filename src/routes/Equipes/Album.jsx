import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Album = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/albums?populate=*")
      .then((response) => {
        const { data } = response.data;
        console.log("Data:", data);
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const filteredData = sortedData.slice(0, 9);
        console.log("Filtered Data:", filteredData);
        setPosts(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="news-container">
      <div>
        <h1>Noticias</h1>
        <hr size="6" width="100%" align="left" color="black" />
      </div>
      <div className="news-grid">
        {posts.map((post, index) => (
          <div key={post.id} className="news-item">
            <div className="news-img-container">
           
                <img
                  src={post?.attributes?.fotos?.data?.[0]?.attributes?.url}
                  alt="Imagem"
                />
              )
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
