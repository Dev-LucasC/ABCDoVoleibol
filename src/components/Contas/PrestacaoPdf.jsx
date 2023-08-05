import './contas.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'

const PrestacaoPdf = () => {
    // Estado para armazenar os dados da API
    const [posts, setPosts] = useState([]);

    // Efeito que é executado após a renderização inicial para buscar os dados da API
    useEffect(() => {
        axios.get("https://shark-app-6myi8.ondigitalocean.app/api/prestacaos?populate=*")
            .then((response) => {
                const { data } = response.data;
                setPosts(data); // Atualiza o estado com os dados da API
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <section>
            <main className='contas'>
                {/* Título da seção */}
                <h1> Prestação de Contas </h1>
                <hr size="6" width="100%" align="left" color="black"></hr>

                {/* Mapeia os dados obtidos da API e renderiza cada item */}
                {posts.map((post, index) => (
                    <div className='provedor' key={index}>
                        {/* Mostra o provedor e a data */}
                        <h4>Provedor: {post?.attributes?.provedor} </h4>
                        <h5> Data: {post?.attributes?.data}</h5>

                        {/* Link para download do PDF */}
                        <a href={post?.attributes.pdf.data[0]?.attributes.url} target="_blank" rel="noopener noreferrer" download>Download PDF</a>
                    </div>
                ))}
            </main>
        </section>
    )
}

export default PrestacaoPdf
