import styles from '../styles/ListaUsuariosCadastrados.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export function ListaUsuariosCadastrados({ termoBusca = '' }) {
   const [usuarios, setUsuarios] = useState([]);
   const [carregando, setCarregando] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      (async () => {
         try {
            const { data } = await api.get('/usuarios');
            setUsuarios(data);
         } catch (err) {
            console.error('Erro ao buscar usuários:', err);
            setError('Falha ao carregar usuários.');
         } finally {
            setCarregando(false);
         }
      })();
   }, []);

   const handleDelete = async (id) => {
      const confirmacao = window.confirm("Tem certeza que deseja deletar este usuário?");
      if (!confirmacao) return;

      try {
         await api.delete(`/usuarios/${id}`);
         setUsuarios((prev) => prev.filter((usuario) => usuario.id !== id));
      } catch (err) {
         console.error('Erro ao deletar usuário:', err);
         alert('Erro ao deletar usuário. Tente novamente.');
      }
   };

   const listaFiltrada = termoBusca
      ? usuarios.filter((usuario) =>
         usuario.nome.toLowerCase().includes(termoBusca.toLowerCase())
      )
      : usuarios;

   if (carregando) return <p>Carregando…</p>;
   if (error) return <p>{error}</p>;
   if (listaFiltrada.length === 0) return <p>Nenhum usuário encontrado.</p>;

   return (
      <section className={styles.grid}>
         {listaFiltrada.map((usuario) => (
            <article className={styles.card} key={usuario.id}>

               <img
                  src={
                     usuario.imagem
                        ? `${import.meta.env.VITE_API_URL}/uploads/${usuario.imagem}`
                        : '/img/placeholder-avatar.png'
                  }
                  alt={usuario.nome}
                  className={styles.img}
               />

               <div className={styles.info}>
                  <h3>{usuario.nome}</h3>
                  <p><strong>Idade:</strong> {usuario.idade}</p>
                  <p><strong>Rua:</strong> {usuario.rua}</p>
                  <p><strong>Bairro:</strong> {usuario.bairro}</p>
                  <p><strong>Estado:</strong> {usuario.estado}</p>
                  <p><strong>Bio:</strong> {usuario.biografia}</p>
                  <div className={styles.botoes}>
                     <button
                        className={styles.botaoEditar}
                        onClick={() => navigate(`/usuarios/${usuario.id}/editar`)}
                     >
                        Editar
                     </button>
                     <button
                        onClick={() => handleDelete(usuario.id)}
                        className={styles.botaoDeletar}
                     >
                        Deletar
                     </button>
                  </div>
               </div>
            </article>

         ))}
      </section>
   );
}
