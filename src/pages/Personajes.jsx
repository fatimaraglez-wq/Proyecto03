import { useState, useEffect } from 'preact/hooks';
import Personaje from '../components/Personaje.jsx';

const Personajes = () => {
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const ids = Array.from({ length: 100 }, (_, i) => i + 1).join(',');

    fetch(`https://rickandmortyapi.com/api/character/${ids}`)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('No se pudieron cargar los personajes');
        return respuesta.json();
      })
      .then((respuestaJSON) => setDatos(respuestaJSON))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const texto = busqueda.toLowerCase();
  const datosFiltro = datos.filter((dato) =>
    [dato.name, dato.species, dato.gender, dato.status].some((campo) =>
      campo.toLowerCase().includes(texto)
    )
  );

  return (
    <>
      <h1 className="h3 mb-3">Rick and Morty</h1>
      <div className="input-group mb-4">
        <span className="input-group-text"><i className="fa-solid fa-magnifying-glass"></i></span>
        <input
          type="text"
          className="form-control"
          placeholder="Busca tu personaje (nombre, especie, género o estado)"
          onInput={(e) => setBusqueda(e.currentTarget.value)}
        />
      </div>

      {cargando && <div className="text-center py-5"><div className="spinner-border text-secondary"></div></div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!cargando && !error && datosFiltro.length === 0 && (
        <p className="text-center text-muted">No hay personajes con esa búsqueda.</p>
      )}

      <div className="row">
        {datosFiltro.map(({ id, name, gender, species, image }) => (
          <Personaje key={id} id={id} name={name} gender={gender} species={species} image={image} />
        ))}
      </div>
    </>
  );
};

export default Personajes;
