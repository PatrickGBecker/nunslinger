import React from 'react';
import fetchApiData from '../fetch/fetchApiData';
import './App.css';

console.log(fetchApiData())

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
