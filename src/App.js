import React, { useState } from 'react';
import Todo from './Component/Todo';
import Heatmap from './Component/Heatmap';
import './App.css';

function App() {
  const [view, setView] = useState('daily');
  const [updateCount, setUpdateCount] = useState(0);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="app">
      <h2>100-Day Tracker</h2>
      <div className="tabs">
        <button onClick={() => handleViewChange('daily')}>Daily Tasks</button>
        <button onClick={() => handleViewChange('heatmap')}>Heatmap</button>
      </div>
      {view === 'daily' ? (
        <Todo onTaskChange={() => setUpdateCount((prev) => prev + 1)} />
      ) : (
        <Heatmap updateCount={updateCount} />
      )}
    </div>
  );
}

export default App;
