import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/app.scss';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./App.jsx', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });
}
