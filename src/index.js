import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './styles.css';

ReactDOM.render((
    <HashRouter>
      <App />
    </HashRouter>
), document.getElementById('root'));

registerServiceWorker();
