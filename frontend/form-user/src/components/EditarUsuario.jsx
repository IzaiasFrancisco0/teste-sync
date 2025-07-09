import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UsuarioForm } from '../components/UsuarioForm';
import { api } from '../services/api';

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    api.get(`/usuarios/${id}`)
      .then(res => setUsuario(res.data))
      .catch(() => alert('Usuário não encontrado'));
  }, [id]);

  async function atualizar(dados) {
    const form = new FormData();
    Object.entries(dados).forEach(([k, v]) => v && form.append(k, v));
    await api.put(`/usuarios/${id}`, form);
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
