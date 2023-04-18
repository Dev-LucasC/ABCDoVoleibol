import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHeader from '../../components/NavHeader/NavHeader';
import Header from '../../components/Header';
import { PainelNoticias } from '../../components/Noticias/PainelNoticias';
import Footer from '../../components/footer/Footer';
export const Equipes = () => {
  const [posts, setPosts] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    axios.get("https://hammerhead-app-5cwy4.ondigitalocean.app/api/calendarios")
      .then((response) => {
        const { data } = response.data;
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://hammerhead-app-5cwy4.ondigitalocean.app/api/upload/files`)
      .then((response) => {
        const { data } = response;
        const filteredData1 = data.filter((file) => file.caption === "equipe1");
        const filteredData2 = data.filter((file) => file.caption === "equipe2");

        filteredData1.forEach((file) => {
          const url = "https://hammerhead-app-5cwy4.ondigitalocean.app" + file.url;
          console.log("url1:", url); // Verificar os valores de file.associatedId e url
          setImages(prevState => ({
            ...prevState,
            [file.associatedId]: url
          }));
        });


        filteredData2.forEach((file) => {
          const url = "https://hammerhead-app-5cwy4.ondigitalocean.app" + file.url;
          setImages(prevState => ({
            ...prevState,
            [file.associatedId]: url
          }));
        });

      })

      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <>
      <NavHeader />
      <Header />
      {posts.map((post, index) => {
        const image1Url = images[`${post.id}-equipe1`];
        const image2Url = images[`${post.id}-equipe2`];
        console.log("TESTE", image1Url)
        return (
          <div className='container_noticias' key={post.id}>
            <h2>{post?.attributes?.local}</h2>
            <p>{post?.attributes?.data}</p>
            {Object.keys(images).includes(`${post.id}-equipe1`) && Object.keys(images).includes(`${post.id}-equipe2`) && (
              <div className="container_imagens">
                <img src={image1Url} alt="" />
                <img src={image2Url} alt="" />
              </div>
            )}

          </div>
        );
      })}
      <Footer />

    </>
  );

};
