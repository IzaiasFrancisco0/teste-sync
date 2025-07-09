import styles from '../styles/PaginaUsuarios.module.css'
import { useState } from 'react';
import { InputBuscaUsuario } from "./InputBuscaUsuario";
import { ListaUsuariosCadastrados } from "./ListaUsuariosCadastrados";


export function PaginaUsuarios() {
    const [termoBusca, setTermoBusca] = useState('');

    return (
        <section className={styles.page}>
            <InputBuscaUsuario onChange={setTermoBusca} />
            <h1 className={styles.title}>Usuários Cadastrados</h1>
            <hr />
            <ListaUsuariosCadastrados termoBusca={termoBusca} />
        </section>
    )
}