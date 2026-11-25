const FormInput = ({ label, name, type = 'text', icono, value, onChange, error, ...rest }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label fw-semibold">{label}</label>
    <div className="input-group has-validation">
      {icono && <span className="input-group-text"><i className={`fa-solid ${icono}`}></i></span>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onInput={onChange}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  </div>
);

export default FormInput;
