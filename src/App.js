import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
