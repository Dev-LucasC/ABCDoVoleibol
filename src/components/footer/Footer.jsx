import React from 'react';
import './footer.css';
import Completo from './patrocinadores/rodape.jpg';

const Footer = () => {
  return (
    <footer>
      <div className='parceiros'>
        <div>
          <div className='patrocinadores'>
            <a href="#">
              <img 
                src={Completo} 
                alt="patrocinador" 
                className='imagem-grande'
                style={{ 
                  width: "100vw", 
               
                }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
