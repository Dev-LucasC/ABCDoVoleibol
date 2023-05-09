import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './calendario.css'

export const Confrontos = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://shark-app-6myi8.ondigitalocean.app/api/calendarios?populate=*")
      .then((response) => {
        const { data } = response.data;
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {posts.slice(0, 6).map((post, index) => {
        return (
          <div key={index} className='container_calendario'>
            <div className='container_confronto'>
              <h2>{post?.attributes?.categoria}</h2>
              <div className='confronto'>
                  <img src={post?.attributes.time2.data[0].attributes.url}  loading="lazy" />
                <h1>X</h1>
                  <img src={post?.attributes.time1.data.attributes.url}  loading="lazy" />
              </div>
              <h2>Local: {post?.attributes?.local}</h2>
              <p>Data: {post?.attributes?.data.split('-').reverse().join('/')}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
