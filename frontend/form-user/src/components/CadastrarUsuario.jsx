import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserSchema } from '../schemas/UsuarioSchema';
import styles from '../styles/CadastroUsuario.module.css';

export function CadastrarUsuario() {
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState(1);
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [biografia, setBiografia] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  const apiCadastrarUsuario = async () => {
    try {
      const form = new FormData();
      form.append('imagem', imagem);
      form.append('nome', nome);
      form.append('idade', String(idade));
      form.append('rua', rua);
      form.append('bairro', bairro);
      form.append('estado', estado);
      form.append('biografia', biografia);

      const { data } = await axios.post('http://localhost:5000/usuarios', form);

      setUsuarios((prev) => [...prev, data]);
      alert('Usuário cadastrado com sucesso!');
    } catch (err) {
      console.error('Erro ao cadastrar usuário:', err.response?.data || err);
      alert('Falha no cadastro. Veja o console.');
    }

    setImagem(null);
    setNome('');
    setIdade(1);
    setRua('');
    setBairro('');
    setEstado('');
    setBiografia('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = UserSchema.safeParse({
      imagem,
      nome,
      idade,
      rua,
      bairro,
      estado,
      biografia,
    });

    if (!result.success) {
      alert('Preencha todos os campos corretamente');
      console.error(result.error.format());
      return;
    }

    console.log('Dados prontos para envio:', result.data);
    apiCadastrarUsuario();
  };

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
    'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
    'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO',
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Cadastrar Usuário</h2>

      <input
        className={styles.input}
        type="file"
        name="imagem"
        accept="image/*"
        onChange={(e) => setImagem(e.target.files?.[0] || null)}
        required
      />

      <input
        className={styles.input}
        type="text"
        name="nome"
        value={nome}
        placeholder="Nome Completo"
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <input
        className={styles.input}
        type="number"
        name="idade"
        value={idade}
        placeholder="Idade"
        onChange={(e) => setIdade(Number(e.target.value))}
        min={1}
        max={120}
        required
      />

      <input
        className={styles.input}
        type="text"
        name="rua"
        value={rua}
        placeholder="Rua"
        onChange={(e) => setRua(e.target.value)}
        required
      />

      <input
        className={styles.input}
        type="text"
        name="bairro"
        value={bairro}
        placeholder="Bairro"
        onChange={(e) => setBairro(e.target.value)}
        required
      />

      <select
        className={styles.input}
        name="estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        required
      >
        <option value="">Selecione um estado</option>
        {estados.map((uf) => (
          <option key={uf} value={uf}>
            {uf}
          </option>
        ))}
      </select>

      <textarea
        className={styles.textarea}
        name="biografia"
        value={biografia}
        onChange={(e) => setBiografia(e.target.value)}
        placeholder="Biografia"
        required
      />

      <button type="submit" className={styles.button}>
        Enviar
      </button>

      <Link to="/usuarios" className={styles.link}>Ver Todos Usuários Cadastrados</Link>
    </form>
  );
};
