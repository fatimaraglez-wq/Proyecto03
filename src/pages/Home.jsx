import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Contexto from "../context/Contexto";

const Home = () => {
  const navigate = useNavigate();
  const { usuario, cerrar_sesion } = useContext(Contexto);

  const nombreUsuario =
    typeof usuario === "string"
      ? usuario
      : usuario?.usuario || usuario?.nombre || usuario?.correo || "";

  const logout = () => {
    cerrar_sesion();
    Swal.fire({
      icon: "success",
      title: "Cerrando sesión!",
      text: "Estás siendo redirigido",
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <>
      <section className="hero text-center p-5 mb-4">
        <h1 className="display-5 fw-bold">Bienvenido</h1>
        <p className="lead mb-4">Mi proyecto fatis.</p>
        {nombreUsuario && <p className="fw-semibold mb-3">Usuario: {nombreUsuario}</p>}
        <div className="d-flex justify-content-center gap-2">
          {usuario && (
            <button onClick={logout} className="btn btn-danger">
              <i className="fa-solid fa-right-from-bracket me-1"></i> Cerrar sesión
            </button>
          )}
        </div>
      </section>

      <section className="row justify-content-center">
        <div className="col-md-6">
          <div className="tarjeta p-4 text-center h-100">
            <span className="icono-circulo mb-3">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <h2 className="h5">Busca por ID</h2>
            <p className="text-muted">
              Escribe <code>/personaje/1</code> en la URL y verás su información.
            </p>
            <Link to="/personaje/1" className="btn btn-outline-morado">
              Ejemplo: Rick
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;