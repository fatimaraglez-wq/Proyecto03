import { Link, useParams } from 'react-router-dom';

const Usuario = () => {
  const { nombre } = useParams();
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="tarjeta p-5 text-center">
          <span className="icono-circulo mb-3"><i className="fa-solid fa-user"></i></span>
          <h1 className="h3">Usuario: {nombre}</h1>
          <p className="text-muted">Esta página lee el nombre desde la URL: <code>/usuario/{nombre}</code></p>
          <Link to="/personajes" className="btn btn-morado me-2">Ver personajes</Link>
          <Link to="/" className="btn btn-outline-morado">Cerrar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Usuario;
