import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Link } from 'react-router-dom';

const NoticiaIndividual = () => {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(`https://hammerhead-app-5cwy4.ondigitalocean.app/api/noticias/${id}`)
      .then((response) => {
        const { data } = response.data;
        setPost(data);

        axios
          .get("https://hammerhead-app-5cwy4.ondigitalocean.app/api/upload/files")
          .then((response) => {
            const { data } = response;
            const filteredData = data.filter((file) => file.caption === post?.attributes?.titulo);
            if (filteredData.length > 0) {
              const url = 'https://hammerhead-app-5cwy4.ondigitalocean.app' + filteredData[0].url;
              setImageUrl(url);
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);


  return (
    <section>
      {post && (
        <div className="container_noticias">
          <div className="portofolio__item-img">
            <img src={imageUrl} alt={post?.attributes?.titulo} />
          </div>
          <h2>{post?.attributes?.titulo}</h2>
          <p>{post?.attributes?.texto}</p>
          <div className="portofolio__item-cta">
            <Link to={`/noticias`} className="btn">
              Voltar
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default NoticiaIndividual;
