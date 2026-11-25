import { render } from 'preact';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./style.css";
import App from './app.jsx';
import Provider from './context/Provider.jsx';

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('app')
);