import React from 'react';
import './App.css';
import Todos from './component/Todos';
import Canvas from './component/Canvas';
function App() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <Todos />
        </div>
        <div className="col-md-6">
          <Canvas/>
        </div>
      </div>

    </div>
  );
}

export default App;
