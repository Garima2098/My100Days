import React, { useState, useEffect } from 'react';
import Todo from './Component/Todo';
import Heatmap from './Component/Heatmap';
import './App.css';

function App() {
  const [view, setView] = useState('daily');
  const [updateCount, setUpdateCount] = useState(0);

  const activeTasks = [
    'Workout',
    'No Sugar',
    'Mediation/Prayer/Scripture',
    'Cold Shower',
    'Beetroot juice/1spoon Ghee',
    'Journal',
    '4 Hour Study',
    '4 Am getup',
  ];

  // Cleanup function to remove outdated tasks from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('heatmapData') || '{}');
    const todayKey = new Date().toISOString().split('T')[0];

    Object.keys(storedData).forEach((date) => {
      storedData[date] = storedData[date].filter((task) =>
        activeTasks.includes(task)
      );
    });

    // Save the updated tasks back to localStorage
    localStorage.setItem('heatmapData', JSON.stringify(storedData));
  }, [activeTasks]);

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
