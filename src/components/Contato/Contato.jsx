import React, { useState } from 'react';
import './ContatoForm.css';

const ContatoForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      nome: nome,
      email: email,
      telefone: telefone,
      mensagem: mensagem,
    };
    try {
      const response = await fetch('https://formspree.io/f/mqkownwg', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setNome('');
        setEmail('');
        setTelefone('');
        setMensagem('');
        setEnviado(true);
      } else {
        throw new Error('Erro ao enviar o formulário');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <div className='mapa'>
        <h1>Conheça nosso ginásio</h1>
        {/* Updated iframe with correct URL */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4227.152258654772!2d-48.60645551630523!3d-27.01128947667938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8b65804162f1f%3A0xc66182ad7a6ece7c!2sBarra%20Multieventos%20Hamilton%20Linhares%20Cruz%20(G3)!5e0!3m2!1spt-PT!2sbr!4v1691507243974!5m2!1spt-PT!2sbr"
          width="600"
          height="450"
          style={{ border: 2 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className='iframe-maps'
        ></iframe>
      </div>
      <form className='contato-form' id="formulario" onSubmit={handleSubmit}>
        {enviado && <p>Formulário enviado com sucesso!</p>}
        <h1>Entre em contato conosco</h1>
        <div className='form-group'>
          <label htmlFor='nome'>Nome:</label>
          <input
            type='text'
            id='nome'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='telefone'>Telefone:</label>
          <input
            type='text'
            id='telefone'
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='mensagem'>Mensagem:</label>
          <textarea
            id='mensagem'
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default ContatoForm;
