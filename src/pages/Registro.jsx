import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';
import FormInput from '../components/FormInput.jsx';
import { alertaError, alertaExito } from '../utils/alerts.js';
import { buscarPorCorreo, guardarUsuario } from '../utils/usuarios.js';

const inicial = {
  nombre: '', ap_paterno: '', ap_materno: '', correo: '', password: '', fecha_nacimiento: '',
};

const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

const validar = (v) => {
  const e = {};
  if (!soloLetras.test(v.nombre.trim())) e.nombre = 'El nombre solo permite letras y espacios';
  if (!soloLetras.test(v.ap_paterno.trim())) e.ap_paterno = 'El apellido paterno solo permite letras y espacios';
  if (!soloLetras.test(v.ap_materno.trim())) e.ap_materno = 'El apellido materno solo permite letras y espacios';
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v.correo)) e.correo = 'Ingresa un email válido, por ejemplo xx@gmail.com';
  if (!/^(?=.*[A-Z]).{8,30}$/.test(v.password)) e.password = 'Mínimo 8 caracteres y una mayúscula';
  if (!v.fecha_nacimiento) e.fecha_nacimiento = 'La fecha de nacimiento es obligatoria';
  return e;
};

const Registro = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useForm(inicial, validar);

  const registrar = (datos) => {
    if (buscarPorCorreo(datos.correo)) {
      alertaError('Correo ya registrado', 'Intenta iniciar sesión con ese correo.');
      return;
    }
    guardarUsuario({ ...datos, nombre: datos.nombre.trim() });
    alertaExito('Cuenta creada', 'Ahora inicia sesión').then(() => navigate('/login'));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="tarjeta p-4">
          <div className="text-center mb-3">
            <span className="icono-circulo mb-2"><i className="fa-solid fa-user-plus"></i></span>
            <h1 className="h4">Registro</h1>
          </div>
          <form onSubmit={handleSubmit(registrar)} noValidate>
            <FormInput label="Nombre" name="nombre" icono="fa-user" placeholder="Nombre"
              value={values.nombre} onChange={handleChange} error={errors.nombre} />
            <FormInput label="Apellido paterno" name="ap_paterno" icono="fa-id-card" placeholder="Apellido paterno"
              value={values.ap_paterno} onChange={handleChange} error={errors.ap_paterno} />
            <FormInput label="Apellido materno" name="ap_materno" icono="fa-id-card" placeholder="Apellido materno"
              value={values.ap_materno} onChange={handleChange} error={errors.ap_materno} />
            <FormInput label="Correo" name="correo" type="email" icono="fa-envelope" placeholder="xx@gmail.com"
              value={values.correo} onChange={handleChange} error={errors.correo} />
            <FormInput label="Contraseña" name="password" type="password" icono="fa-lock" placeholder="Mínimo 8 caracteres"
              value={values.password} onChange={handleChange} error={errors.password} />
            <FormInput label="Fecha de nacimiento" name="fecha_nacimiento" type="date" icono="fa-calendar-days"
              value={values.fecha_nacimiento} onChange={handleChange} error={errors.fecha_nacimiento} />
            <button type="submit" className="btn btn-morado w-100">Crear cuenta</button>
          </form>
          <p className="text-center small mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
          <p className="text-center small mt-2 mb-0">
            <Link to="/"><i className="fa-solid fa-arrow-left me-1"></i>Volver al inicio</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
