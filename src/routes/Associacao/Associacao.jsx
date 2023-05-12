import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header';
import Teste from '../../components/NavHeader/NavHeader';
import './associacao.css';

const Associacao = () => {
  return (
    <>
      <Teste />
      <Header />

      <section>
        <h1 className='associacao_hr'>A Associação</h1>

        <div className='introducao'>
          <div className='associacao_titulo'>
            <h1>Defenda essa ideia você também!</h1>
          </div>
          <div className='associacao_texto'>
            <p>
              A Associação – A.B.C. do Voleibol, que no ano de 2020 teve no Projeto de Lei apresentado pelo Vereador David
              La Barrica e aprovado com unanimidade pelos demais Vereadores de Balneário Camboriú, foi DECLARADA UTILIDADE
              PÚBLICA. É uma associação esportiva sem fins lucrativos, fundada no ano de 2016 e tem por finalidade, através do
              voleibol, formar indivíduos e atletas com valores morais guiados pelo caráter e pela ética, fruto do próprio
              ambiente do esporte. As participações em campeonatos desde regionais, estaduais e sul americanos acabam
              fortalecendo essa formação e incentivam não só a busca por melhoria, mas também permitem avaliar os resultados,
              mesmo que negativos, clarificando os ajustes necessários, sejam de ordem técnica e/ou comportamental. O
              reconhecimento pelo mérito da dedicação e dos esforços durante os treinamentos são frequentes, dadas as
              conquistas significativas em campeonatos, refletindo positivamente no convívio social. O público-alvo são
              crianças e adolescentes na faixa etária de 7 a 13 anos, atingindo alunos em idade escolar da cidade e região com
              um caráter social. Adolescentes entre 13 e 18 anos, para representar o município em eventos oficiais de nível
              regional, estadual e nacional, também são englobados pelo trabalho.
            </p>
          </div>

          <div className='associacao_objetivos'>
            <h1>Objetivos</h1>
            <ul>
              <li>
                Desenvolver o voleibol dentro do município de Balneário Camboriú, no Estado de Santa Catarina e no Brasil
                através de treinamentos e participações de Campeonatos.
              </li>
              <li>
                Influenciar positivamente os atletas no desenvolvimento de sua formação crítica nas tomadas de decisões diante
                de situações de dificuldades no jogo.
              </li>
              <li>Contribuir para a formação dos atletas através de uma boa alimentação e hospedagem.</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Associacao;
