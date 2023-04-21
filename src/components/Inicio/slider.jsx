import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import './App.css'

export const Slider = () => {
  const [confrontos, setConfrontos] = useState([]);
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    axios
      .get("https://king-prawn-app-bnxyc.ondigitalocean.app/api/calendarios?populate=*")
      .then((response) => {
        const { data } = response.data;
        setConfrontos(data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://king-prawn-app-bnxyc.ondigitalocean.app/api/noticias?populate=*")
      .then((response) => {
        const { data } = response.data;
        setNoticias(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="confrontos">
        <h1>Próximos jogos</h1>
        {confrontos.map((confronto) => (
          <div className="confronto" key={confronto.id}>
            <h2>{confronto.attributes.categoria}</h2>
            <div className="times">
              <img
                src={
                  "https://king-prawn-app-bnxyc.ondigitalocean.app" +
                  confronto.attributes.time1.data[0].attributes.formats.thumbnail.url
                }
                alt=""
              />
              <h1>X</h1>
              <img
                src={
                  "https://king-prawn-app-bnxyc.ondigitalocean.app" +
                  confronto.attributes.time2.data[0].attributes.formats.thumbnail.url
                }
                alt=""
              />
            </div>
            <h2>Local: {confronto.attributes.local}</h2>
            <p>Data: {confronto.attributes.data}</p>
          </div>
        ))}
      </div>
      <div className="noticias">
        <h1>Notícias</h1>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, bottom: 100 }}
        >
          {noticias.map((noticia) => (
            <SwiperSlide key={noticia.id}>
              <div className="noticia">
                <div className="imagem">
                  <img
                    src={
                      "https://king-prawn-app-bnxyc.ondigitalocean.app" +
                      noticia.attributes.imagem.data[0].attributes.url
                    }
                    alt={noticia.attributes.titulo}
                  />
                </div>
                <div className="conteudo">
                  <h2>{noticia.attributes.titulo}</h2>
                  <p>{noticia.attributes.texto}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};


