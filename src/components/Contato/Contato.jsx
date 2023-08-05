import React, { useState } from 'react';
import './ContatoForm.css';

const ContatoForm = () => {
  // Estados para os campos do formulário e para controlar o estado de envio
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      nome: nome,
      email: email,
      telefone: telefone,
      mensagem: mensagem
    };
    try {
      const response = await fetch('https://formspree.io/f/mqkownwg', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        // Limpar os campos e marcar como enviado com sucesso
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
        {/* Mapa incorporado */}
        <h1>Conheça nosso ginásio</h1>
        <iframe src="..." width="600" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <form className='contato-form' onSubmit={handleSubmit}>
        {/* Mensagem de sucesso após o envio */}
        {enviado && <p>Formulário enviado com sucesso!</p>}
        <h1>Entre em contato conosco</h1>
        {/* Campos do formulário */}
        <div className='form-group'>
          <label htmlFor='nome'>Nome:</label>
          <input type='text' id='nome' value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor='telefone'>Telefone:</label>
          <input type='text' id='telefone' value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        <div className='form-group'>
          <label htmlFor='mensagem'>Mensagem:</label>
          <textarea id='mensagem' value={mensagem} onChange={(e) => setMensagem(e.target.value)} required />
        </div>
        {/* Botão de envio */}
        <button type='submit'>Enviar</button>
      </form>
    </div>
  );
};

export default ContatoForm;
