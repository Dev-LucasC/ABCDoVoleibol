import React from 'react'
import Testevolei1 from './logo512.jpg'
import './galeria.css'

const Galeria = () => {
    return (
        <section>
            <div>
                <h1> Noticias </h1>
                <hr size="6" width="100%" align="left" color="black"></hr>
            </div>
            <div className="container container__fotos">

                <div className="container__fotos-galeria">
                    <a href="https://www.linked.in.com">
                        <img src={Testevolei1} alt="" />
                        <h5>09/02/2023</h5>
                        <h4>Balneário X Blumenau</h4>
                    </a>
                </div>
                <div className="container__fotos-galeria">
                    <a href="https://www.linked.in.com">
                        <img src={Testevolei1} alt="" />
                        <h5>09/02/2023</h5>
                        <h4>Balneário X Blumenau</h4>
                    </a>
                </div>
                <div className="container__fotos-galeria">
                    <a href="https://www.linked.in.com">
                        <img src={Testevolei1} alt="" />
                        <h5>09/02/2023</h5>
                        <h4>Balneário X Blumenau</h4>
                    </a>
                </div>
                <div className="container__fotos-galeria">
                    <a href="https://www.linked.in.com">

                        <img src={Testevolei1} alt="" />
                        <h5>09/02/2023</h5>
                        <h4>Balneário X Blumenau</h4>
                    </a>
                </div>
                <div className="container__fotos-galeria">
                    <a href="https://www.linked.in.com">
                        <img src={Testevolei1} alt="" />
                        <h5>09/02/2023</h5>
                        <h4>Balneário X Blumenau</h4>
                    </a>
                </div>
                <div className="container__fotos-galeria">
                    <a href="https://www.linked.in.com">
                        <img src={Testevolei1} alt="" />
                        <h5>09/02/2023</h5>
                        <h4>Balneário X Blumenau</h4>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Galeria