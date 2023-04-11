import React from 'react'
import './footer.css'
import Fisio from './patrocinadores/2afisio.png'
import Baggio from './patrocinadores/baggio.png'
import Coc from './patrocinadores/coc.png'
import Espeto from './patrocinadores/espetodeouro.png'
import Giongo from './patrocinadores/giongo.png'
import Hugo from './patrocinadores/hugo.png'
import Macon from './patrocinadores/macon.png'
import Panificadora from './patrocinadores/panificadoratiosilva.png'
import Restaurante from './patrocinadores/restaurantedafamilia.png'
import Visax from './patrocinadores/visax.png'
import Yazigi from './patrocinadores/yazigi.png'





const Footer = () => {
  return (
    <div className='parceiros'>
      <div>
        <h1>Apoiadores</h1>
        <div className='patrocinadores'>
          <a href="#"><img src={Fisio}  alt="" className='imagem-grande' /></a>
          <a href="#"><img src={Baggio} alt="" /></a>
          <a href="#"><img src={Coc} alt="" /></a>
          <a href="#"><img src={Espeto} alt="" /></a>
          <a href="#"><img src={Giongo} alt="" /></a>
          <a href="#"><img src={Hugo} alt="" /></a>
          <a href="#"><img src={Macon} alt="" /></a>
          <a href="#"><img src={Panificadora} alt="" /></a>
          <a href="#"><img src={Restaurante} alt="" /></a>
          <a href="#"><img src={Visax} alt="" /></a>
          <a href="#"><img src={Yazigi} alt="" /></a>
        </div>
      </div>
    </div>
  )
}

export default Footer