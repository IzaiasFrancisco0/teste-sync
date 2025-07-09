import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UsuarioForm } from '../components/UsuarioForm';

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/usuarios/${id}`)
      .then(res => setUsuario(res.data))
      .catch(() => alert('Usuário não encontrado'));
  }, [id]);

  async function atualizar(dados) {
    const form = new FormData();
    Object.entries(dados).forEach(([k, v]) => v && form.append(k, v));
    await axios.put(`http://localhost:5000/usuarios/${id}`, form);
    alert('Atualizado!');
    navigate('/usuarios');
  }

  if (!usuario) return <p>Carregando…</p>;

  return (
    <UsuarioForm
      titulo="Editar Usuário"
      initial={usuario}
      onSubmit={atualizar}
    />
  );
};
