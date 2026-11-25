import { Link } from 'react-router-dom';

// Tarjeta del listado: al dar clic va a /personaje/:id
const Personaje = ({ id, name, species, gender, image }) => (
  <div className="col-6 col-md-4 col-lg-3 mb-4">
    <Link to={`/personaje/${id}`} className="text-decoration-none">
      <div className="tarjeta personaje-card h-100">
        <img className="img-fluid w-100" src={image} alt={name} />
        <div className="p-3 text-center">
          <h5 className="h6 fw-bold mb-1">{name}</h5>
          <p className="small text-muted mb-0">{species} · {gender}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default Personaje;
