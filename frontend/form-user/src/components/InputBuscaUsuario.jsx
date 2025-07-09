import styles from '../styles/InputBuscaUsuario.module.css'
import { Link } from 'react-router-dom';

export function InputBuscaUsuario({ onChange }) {
    return (
        <header className={styles.header}>
            <input className={styles.input} type="text" placeholder="Buscar Usuário" onChange={(e) => onChange(e.target.value)} />
            <Link to="/cadastrar" className={styles.botaoNovo}>
                Novo Usuário
            </Link>
        </header>
    )
}