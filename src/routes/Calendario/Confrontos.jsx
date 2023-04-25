import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './calendario.css'

export const Confrontos = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    axios.get("https://king-prawn-app-bnxyc.ondigitalocean.app/api/calendarios?populate=*")
      .then((response) => {
        const { data } = response.data;
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
   
      <div className='container_posts'>
        {posts.map((post, index) => {
          <h1> PROXIMOS JOGOS </h1>
          return (
            <div className='container_calendario'>
              <div className='container_confronto'>
                <h2>{post?.attributes?.categoria}</h2>
                <div className='confronto'>
                  <img src={"https://king-prawn-app-bnxyc.ondigitalocean.app" + post?.attributes.time1.data[0].attributes.formats.thumbnail.url} alt="" />
                  <h1>X</h1>
                  <img src={"https://king-prawn-app-bnxyc.ondigitalocean.app" + post?.attributes.time2.data[0].attributes.formats.thumbnail.url} alt="" />
                  </div>
                <h2>Local: {post?.attributes?.local}</h2>
                <p>Data: {post?.attributes?.data}</p>
               
               
              </div>
            </div>
          );
        })}
      </div>
  );
  
};
