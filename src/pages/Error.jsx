import { Link, useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center py-5">
      <p className="error-codigo mb-2">404</p>
      <h1 className="h3 mb-2">Página no encontrada</h1>
      <p className="text-muted mb-4">La dirección que escribiste no existe o fue movida.</p>
      <Link to="/" className="btn btn-morado me-2">
        <i className="fa-solid fa-house me-1"></i> Volver al inicio
      </Link>
      <button className="btn btn-outline-morado" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left me-1"></i> Regresar
      </button>
    </div>
  );
};

export default Error;
