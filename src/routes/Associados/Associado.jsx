import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import "./associado.css";
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header'
import Teste from '../../components/NavHeader/NavHeader';
import parceiro1 from './imgs/2afisiobranca.jpg'
import parceiro2 from "./imgs/klinebranca.jpg"

function ContactForm() {
  const [state, handleSubmit] = useForm("xaygbyln");
  if (state.succeeded) {
    alert('Obrigado por se juntar!');
  }
  return (
    <>
      <Teste />
      <Header />

      <main className='form-associado'>

        <h2>Seja um associado</h2>
        <p>A mensalidade para se tornar um associado é de R$30. Ao se tornar um associado, você estará apoiando nosso clube de voleibol e ajudando a promover o esporte.</p>
        <a href="#parceiros" className='button-vantagens'>Veja nossas Vantagens</a>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            name="nome"
          />
          <ValidationError
            prefix="Nome"
            field="nome"
            errors={state.errors}
          />
          <label htmlFor="telefone">
            Telefone / WhatsApp
          </label>
          <input
            id="telefone"
            type="tel"
            name="telefone"
          />
          <ValidationError
            prefix="Telefone"
            field="telefone"
            errors={state.errors}
          />
          <label htmlFor="email">
            Endereço de Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
          <label htmlFor="cpf">
            CPF
          </label>
          <input
            id="cpf"
            type="text"
            name="cpf"
          />
          <ValidationError
            prefix="CPF"
            field="cpf"
            errors={state.errors}
          />
          <label htmlFor="dataNascimento">
            Data de Nascimento
          </label>
          <input
            id="dataNascimento"
            type="date"
            name="dataNascimento"
          />
          <ValidationError
            prefix="Data de Nascimento"
            field="dataNascimento"
            errors={state.errors}
          />
          <label htmlFor="responsavel">
            Responsável por qual atleta(s):
          </label>
          <input
            id="responsavel"
            type="text"
            name="responsavel"
          />
          <ValidationError
            prefix="Responsável por qual atleta(s)"
            field="responsavel"
            errors={state.errors}
          />
          <label htmlFor="tempo">
            Tempo de Associação
          </label>
          <select id="tempo" name="tempo">
            <option value="">Selecione...</option>
            <option value="3meses">3 meses</option>
            <option value="6meses">6 meses</option>
            <option value="1ano">1 ano</option>
          </select>
          <ValidationError
            prefix="Tempo"
            field="tempo"
            errors={state.errors}
          />

          <button type="submit" disabled={state.submitting} className='button-form'>
            Enviar
          </button>
        </form>
        <h1>
          VANTAGENS
        </h1>
        <div id="parceiros" className="parceiro">
          <div className='cards'>
          <img src={parceiro1} alt="" />
          <h3>2A Fisioterapia</h3>
          <p>10% De desconto em consultas</p>
          </div>
          <div className='cards'>
          <img src={parceiro2} alt="" />
          <h3>KLINE Odonto</h3>
          <p>18% De desconto em tratamento odontologico
            e procedimentos estéticos
          </p>
          </div>
      
        </div>
      </main>
      <Footer />
    </>

  );
}

function App() {
  return (
    <ContactForm />
  );
}

export default App;
