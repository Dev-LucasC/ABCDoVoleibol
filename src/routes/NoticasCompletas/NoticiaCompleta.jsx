import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import './noticiacompleta.css'
import Header from '../../components/Header/index'
import NavHeader from '../../components/NavHeader/NavHeader';

const NoticiaCompleta = () => {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // aqui está a declaração de imageUrl
  
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`https://hammerhead-app-5cwy4.ondigitalocean.app/api/noticias/${id}?populate=*`)
      .then((response) => {
        const { data } = response.data;
        console.log("Teste", data)
        setPost(data);
        axios
          .get(`https://hammerhead-app-5cwy4.ondigitalocean.app/api/upload/files`)
          .then((response) => {
            const { data } = response;
            const filteredData = data.filter((file) => file.caption === "teste");
            if (filteredData.length > 0) {
              const url = "https://hammerhead-app-5cwy4.ondigitalocean.app" + filteredData[0].url;
              setImageUrl(url);
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);




  return (
    <>
      <NavHeader />
      <Header />
      <section>
        <div className="container-noticias__individual">
          <div className="main-news">
            {post && (
              <div className="container_noticias__individual">
                {imageUrl && <div className="portofolio__item-img__individual">
                  <img src={"https://hammerhead-app-5cwy4.ondigitalocean.app" + post.attributes.image.data.attributes.url} alt={post?.attributes?.titulo} />
                </div>}
                <h2>{post?.attributes?.titulo}</h2>
                <p>{post?.attributes?.texto}</p>
                <div className="portofolio__item-cta__individual">
                  <Link to={`/noticias`} className="btn">
                    Voltar
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NoticiaCompleta;
