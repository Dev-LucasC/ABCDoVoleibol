
import './contas.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'

const PrestacaoPdf = () => {

    const [posts, setPosts] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        axios.get("https://hammerhead-app-5cwy4.ondigitalocean.app/api/prestacaos")
            .then((response) => {
                const { data } = response.data;
                setPosts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("https://hammerhead-app-5cwy4.ondigitalocean.app/api/upload/files")
            .then((response) => {
                const { data } = response;
                const filteredData = data.filter((file) => file.caption === "prestacao");
                const urls = filteredData.map((file) => 'https://hammerhead-app-5cwy4.ondigitalocean.app' + file.url);
                setImageUrls(urls);
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
                        <a  href={imageUrls[index]} download > Download PDF</a>
                    </div>
                ))}

            </main>
        </section>
    )
}

export default PrestacaoPdf