
import './contas.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'

const PrestacaoPdf = () => {

    const [posts, setPosts] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        axios.get("https://king-prawn-app-bnxyc.ondigitalocean.app/api/prestacaos?populate=*")
            .then((response) => {
                const { data } = response.data;
                setPosts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <section>
            <main className='contas'>

                <h1> Prestação de Contas </h1>
                <hr size="6" width="100%" align="left" color="black"></hr>

                {posts.map((post, index) => (
                    <div className='provedor'>
                        <h4>Provedor: {post?.attributes?.provedor} </h4>
                        <h5> Data: {post?.attributes?.data}</h5>
                        <a href={"https://king-prawn-app-bnxyc.ondigitalocean.app" + post?.attributes.arquivo.data[0].attributes.url} target='_blank' download>Download PDF</a>
                    </div>
                ))}

            </main>
        </section>
    )
}

export default PrestacaoPdf