import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                   

/**
 * This file can be ignored, please work in ./components/App.jsx
 */

// Include mock API.
import './mock';

// Include styles.
import './styles/index.css';

// Include application component.
import App from './components/App';

ReactDOM.render(
  <StrictMode> 
    <App />
  </StrictMode> as React.ReactElement,
  document.getElementById('root')
);
