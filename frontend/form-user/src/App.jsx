import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CadastrarUsuario }       from './components/CadastrarUsuario'
import { EditarUsuario }          from './components/EditarUsuario';
import { PaginaUsuarios } from './components/PaginaUsuarios';

import './App.css'

export default function App() {
  return (
    <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<Navigate to="/usuarios" />} />
        <Route path="/usuarios"      element={<PaginaUsuarios />} />
        <Route path="/cadastrar"     element={<CadastrarUsuario />} />
        <Route path="/usuarios/:id/editar" element={<EditarUsuario />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
