import React from 'react';
import './footer.css';
import Completo from './patrocinadores/rodape.png';

const Footer = () => {
  return (
    <footer>
      <div className='parceiros'>
        <div>
          <div className='patrocinadores'>
              <img 
                src={Completo} 
                alt="Patrocinadores e apoiadores da ABC do Voleibol"
                className='imagem-grande'
                style={{ 
                  width: "100vw", 
               
                }}
              />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
