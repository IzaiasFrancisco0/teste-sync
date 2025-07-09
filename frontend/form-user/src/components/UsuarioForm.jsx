import { useState } from 'react';
import styles from '../styles/CadastroUsuario.module.css';
import { UserSchema } from '../schemas/UsuarioSchema';

export function UsuarioForm({ initial, onSubmit, titulo }) {
  const [imagem, setImagem] = useState(null);
  const [nome, setNome] = useState(initial.nome ?? '');
  const [idade, setIdade] = useState(initial.idade ?? 1);
  const [rua, setRua] = useState(initial.rua ?? '');
  const [bairro, setBairro] = useState(initial.bairro ?? '');
  const [estado, setEstado] = useState(initial.estado ?? '');
  const [biografia, setBiografia] = useState(initial.biografia ?? '');

  async function handleSubmit(e) {
    e.preventDefault();

    const valida = UserSchema.safeParse({
      imagem,
      nome,
      idade,
      rua,
      bairro,
      estado,
      biografia,
    });

    if (!valida.success) {
      alert('Preencha corretamente');
      console.error(valida.error.format());
      return;
    }

    await onSubmit({ imagem, nome, idade, rua, bairro, estado, biografia });
  }

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
    'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
    'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO',
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{titulo}</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagem(e.target.files?.[0] || null)}
        className={styles.input}
      />

      <input
        name="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className={styles.input}
        placeholder="Nome Completo"
        required
      />

      <input
        name="idade"
        type="number"
        min={1}
        max={120}
        value={idade}
        onChange={(e) => setIdade(Number(e.target.value))}
        className={styles.input}
        placeholder="Idade"
        required
      />

      <input
        name="rua"
        value={rua}
        onChange={(e) => setRua(e.target.value)}
        className={styles.input}
        placeholder="Rua"
        required
      />

      <input
        name="bairro"
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
        className={styles.input}
        placeholder="Bairro"
        required
      />

      <select
        name="estado"
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className={styles.input}
        required
      >
        <option value="">Selecione um estado</option>
        {estados.map((uf) => (
          <option key={uf} value={uf}>{uf}</option>
        ))}
      </select>

      <textarea
        name="biografia"
        value={biografia}
        onChange={(e) => setBiografia(e.target.value)}
        className={styles.textarea}
        placeholder="Biografia"
        required
      />

      <button type="submit" className={styles.button}>
        Salvar
      </button>
    </form>
  );
}
