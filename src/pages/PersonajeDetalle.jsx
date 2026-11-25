import { useState, useEffect } from 'preact/hooks';
import { Link, useParams } from 'react-router-dom';

const estados = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };

const PersonajeDetalle = () => {
  const { id } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setCargando(true);
    setError('');
    setPersonaje(null);

    if (!/^\d+$/.test(id)) {
      setError(`"${id}" no es un ID válido. Usa un número, por ejemplo /personaje/1`);
      setCargando(false);
      return;
    }

    const controller = new AbortController();
    fetch(`https://rickandmortyapi.com/api/character/${id}`, { signal: controller.signal })
      .then((respuesta) => {
        if (respuesta.status === 404) throw new Error(`No existe ningún personaje con el ID ${id}`);
        if (!respuesta.ok) throw new Error('Error al consultar la API');
        return respuesta.json();
      })
      .then((data) => setPersonaje(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setCargando(false));

    return () => controller.abort();
  }, [id]);

  if (cargando) {
    return <div className="text-center py-5"><div className="spinner-border text-secondary"></div></div>;
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <span className="icono-circulo mb-3"><i className="fa-solid fa-ghost"></i></span>
        <h1 className="h4">Personaje no encontrado</h1>
        <p className="text-muted">{error}</p>
        <Link to="/personajes" className="btn btn-morado me-2">Ver personajes</Link>
        <Link to="/" className="btn btn-outline-morado">
          <i className="fa-solid fa-house me-1"></i> Volver al inicio
        </Link>
      </div>
    );
  }

  const idNum = Number(id);

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="tarjeta overflow-hidden">
          <div className="row g-0">
            <div className="col-md-5">
              <img src={personaje.image} alt={personaje.name} className="img-fluid w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-md-7 p-4">
              <span className="badge badge-morado mb-2">ID #{personaje.id}</span>
              <h1 className="h3">{personaje.name}</h1>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><i className="fa-solid fa-heart-pulse me-2 text-secondary"></i><strong>Estado:</strong> {estados[personaje.status] || personaje.status}</li>
                <li className="mb-2"><i className="fa-solid fa-dna me-2 text-secondary"></i><strong>Especie:</strong> {personaje.species}</li>
                {personaje.type && <li className="mb-2"><i className="fa-solid fa-tag me-2 text-secondary"></i><strong>Tipo:</strong> {personaje.type}</li>}
                <li className="mb-2"><i className="fa-solid fa-venus-mars me-2 text-secondary"></i><strong>Género:</strong> {personaje.gender}</li>
                <li className="mb-2"><i className="fa-solid fa-earth-americas me-2 text-secondary"></i><strong>Origen:</strong> {personaje.origin.name}</li>
                <li className="mb-2"><i className="fa-solid fa-location-dot me-2 text-secondary"></i><strong>Ubicación:</strong> {personaje.location.name}</li>
                <li className="mb-2"><i className="fa-solid fa-film me-2 text-secondary"></i><strong>Episodios:</strong> {personaje.episode.length}</li>
              </ul>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {idNum > 1 && <Link to={`/personaje/${idNum - 1}`} className="btn btn-outline-morado btn-sm"><i className="fa-solid fa-chevron-left"></i> Anterior</Link>}
                <Link to={`/personaje/${idNum + 1}`} className="btn btn-outline-morado btn-sm">Siguiente <i className="fa-solid fa-chevron-right"></i></Link>
                <Link to="/personajes" className="btn btn-morado btn-sm ms-auto">Todos</Link>
                <Link to="/" className="btn btn-outline-secondary btn-sm"><i className="fa-solid fa-house"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonajeDetalle;
