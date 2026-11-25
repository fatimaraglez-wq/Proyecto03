import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';
import FormInput from '../components/FormInput.jsx';
import { alertaExito } from '../utils/alerts.js';
import Contexto from '../context/Contexto';

const inicial = { correo: '', password: '' };

const validar = (v) => {
  const e = {};
  if (!/^\S+@\S+\.\S+$/.test(v.correo)) e.correo = 'El campo correo es requerido y debe ser válido';
  if (!v.password) e.password = 'El campo contraseña es requerido!';
  return e;
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(Contexto);
  const { values, errors, handleChange, handleSubmit } = useForm(inicial, validar);
  const API = import.meta.env.VITE_API_URL;

  const onSubmit = ({ correo }) => {
    login({ usuario: correo });
    alertaExito('Acceso correcto!', 'Estas siendo redirigido ...').then(() => {
      navigate('/');
    });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="tarjeta p-4">
            <div className="text-center mb-3">
              <span className="icono-circulo mb-2">
                <i className="fa-solid fa-lock"></i>
              </span>
              <h1 className="h4">Iniciar sesión</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormInput
                label="Correo"
                name="correo"
                type="email"
                icono="fa-envelope"
                placeholder="correo@ejemplo.com"
                value={values.correo}
                onChange={handleChange}
                error={errors.correo}
              />
              <FormInput
                label="Contraseña"
                name="password"
                type="password"
                icono="fa-key"
                placeholder="Tu contraseña"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button type="submit" className="btn btn-morado w-100 mb-2">
                Iniciar Sesión
              </button>
            </form>

            <div className="text-center mt-2">
              <Link to="/registro" className="btn btn-outline-morado w-100 mb-2">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;