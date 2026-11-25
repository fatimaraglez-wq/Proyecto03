import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Usuario from './pages/Usuario.jsx';
import Personajes from './pages/Personajes.jsx';
import PersonajeDetalle from './pages/PersonajeDetalle.jsx';
import Error from './pages/Error.jsx';
import RutasPrivadas from './routes/RutasPrivadas.jsx';
import RutasPublicas from './routes/RutasPublicas.jsx';

const App = () => (
  <BrowserRouter  >
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<RutasPrivadas><Home /></RutasPrivadas>} />
        <Route path="/login" element={<RutasPublicas><Login /></RutasPublicas>} />
        <Route path="/registro" element={<RutasPublicas><Registro /></RutasPublicas>} />
        <Route path="/usuario/:nombre" element={<RutasPrivadas><Usuario /></RutasPrivadas>} />
        <Route path="/personajes" element={<Personajes />} />
        <Route path="/personaje/:id" element={<PersonajeDetalle />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;