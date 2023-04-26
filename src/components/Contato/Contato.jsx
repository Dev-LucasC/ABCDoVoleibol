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
    <form className='contato-form' onSubmit={handleSubmit}>
      {enviado && <p>Formulário enviado com sucesso!</p>}
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
      <button type='submit'>Enviar</button>
    </form>
  );
};

export default ContatoForm;
