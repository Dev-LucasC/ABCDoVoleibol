import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './associacao.css';

const anniversaryPhoto = 'https://res.cloudinary.com/demf3h51n/image/upload/v1785495041/medium_IMG_20260731_WA_0002_23890159e6.jpg';

const objectives = [
  'Desenvolver o voleibol em Balneário Camboriú, em Santa Catarina e no Brasil por meio de treinamentos e participações em campeonatos.',
  'Desenvolver o pensamento crítico dos atletas na tomada de decisões diante de situações difíceis no jogo.',
  'Contribuir para a formação dos atletas com alimentação e hospedagem adequadas.',
];

const guideObjectives = [
  'Reunir calendários, resultados e notícias em um só lugar.',
  'Facilitar a navegação pelo celular e promover a inclusão digital.',
  'Melhorar a comunicação com atletas, famílias e torcedores.',
  'Incentivar o acompanhamento de eventos e valorizar atletas e atividades locais.',
];

const values = [
  ['Ética e respeito', 'na convivência, nos treinos e nas competições.'],
  ['Dedicação e aprendizado', 'para evoluir com a prática e aprender com os resultados.'],
  ['Trabalho em equipe', 'para desenvolver cooperação e responsabilidade.'],
  ['Compromisso com a comunidade', 'para incentivar a participação esportiva de crianças e adolescentes.'],
];

function Associacao() {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <main className="association">
      <header className="association-hero">
        <div>
          <p className="association-label">A Associação</p>
          <h1>A.B.C. do Voleibol</h1>
          <p>Associação esportiva sem fins lucrativos de Balneário Camboriú que promove a formação de crianças e adolescentes por meio do voleibol.</p>
          <nav aria-label="Nesta página">
            <a href="#nossa-historia">Nossa história</a>
            <a href="#guia-digital">Guia Digital</a>
            <a href="#participacao">Como participar</a>
          </nav>
        </div>
        <figure>
          <div className="association-visual">
            {showPhoto ? (
              <img src={anniversaryPhoto} alt="Registro da comemoração dos 10 anos do ABC do Voleibol" onError={() => setShowPhoto(false)} />
            ) : (
              <img className="association-logo" src={logo} alt="Escudo do A.B.C. do Voleibol" />
            )}
          </div>
          {showPhoto && <figcaption><Link to="/noticias/69">Comemoração dos 10 anos do ABC do Voleibol</Link></figcaption>}
        </figure>
      </header>

      <section id="nossa-historia" aria-labelledby="titulo-historia">
        <h2 id="titulo-historia">Nossa história</h2>
        <p>Fundada em 2016, a A.B.C. do Voleibol foi declarada de utilidade pública em Balneário Camboriú em 2020. O projeto de lei, apresentado pelo vereador David La Barrica, foi aprovado por unanimidade pela Câmara Municipal.</p>
        <p>A participação em campeonatos regionais, estaduais e sul-americanos faz parte da trajetória da associação. A experiência em quadra ajuda os atletas a avaliar resultados, reconhecer o esforço nos treinos e identificar o que precisam melhorar na técnica e no comportamento.</p>
      </section>

      <section aria-labelledby="titulo-missao">
        <h2 id="titulo-missao">Missão, visão e valores</h2>
        <div className="association-columns">
          <div>
            <h3>Missão</h3>
            <p>Promover a formação esportiva e humana de crianças e adolescentes por meio do voleibol, incentivando a prática esportiva, a convivência e a tomada de decisões com ética e responsabilidade.</p>
            <h3>Visão</h3>
            <p>Ser referência na formação de jovens atletas e no desenvolvimento do voleibol em Balneário Camboriú e região, ampliando as oportunidades de participação e fortalecendo o vínculo entre atletas, famílias e comunidade.</p>
          </div>
          <div>
            <h3>Valores</h3>
            <ul>
              {values.map(([value, description]) => <li key={value}><strong>{value}</strong> {description}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-comunidade">
        <h2 id="titulo-comunidade">Atuação na comunidade</h2>
        <p>O trabalho social atende estudantes de 7 a 13 anos de Balneário Camboriú e região. A associação também prepara adolescentes de 13 a 18 anos para representar o município em competições oficiais regionais, estaduais e nacionais.</p>
        <h3>Objetivos</h3>
        <ul>{objectives.map(objective => <li key={objective}>{objective}</li>)}</ul>
      </section>

      <section id="guia-digital" className="association-guide" aria-labelledby="titulo-guia">
        <p className="association-label">Projeto de extensão universitária</p>
        <h2 id="titulo-guia">Guia Digital do Atleta ABC</h2>
        <p>Informações sobre jogos, resultados e atividades esportivas podem ficar espalhadas por diferentes canais digitais. O projeto propõe aprimorar a plataforma do ABC do Voleibol para que a comunidade encontre essas informações de forma gratuita, organizada e acessível.</p>
        <h3>Objetivos do projeto</h3>
        <ul>{guideObjectives.map(objective => <li key={objective}>{objective}</li>)}</ul>
      </section>

      <section id="participacao" aria-labelledby="titulo-participacao">
        <h2 id="titulo-participacao">Participe da comunidade</h2>
        <p>Atletas, familiares, treinadores e torcedores podem acompanhar as atividades, participar das seletivas ou apoiar a associação.</p>
        <ul className="association-links">
          <li><Link to="/calendario">Consultar calendário</Link></li>
          <li><Link to="/noticias">Ler notícias</Link></li>
          <li><Link to="/seletiva">Inscrever-se na seletiva</Link></li>
          <li><Link to="/associados">Tornar-se associado</Link></li>
        </ul>
        <h3>Contato</h3>
        <p>Use o formulário do site para enviar sugestões ou avisar sobre informações que precisam de correção.</p>
        <ul className="association-links">
          <li><Link to="/#formulario">Abrir formulário de contato</Link></li>
          <li><a href="https://www.instagram.com/abcdovoleibol/">Instagram</a></li>
          <li><a href="https://www.facebook.com/abcdovoleibol">Facebook</a></li>
        </ul>
      </section>
    </main>
  );
}

export default Associacao;
