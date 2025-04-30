import React, { useEffect, useState } from 'react';

function Todo({ onTaskChange }) {
  const TASKS = [
    'Workout',
    'No Sugar',
    'Mediation/Prayer/Scripture',
    'Beetroot juice',
    'Journal',
    '4 Hour Study',
    '4 Am getup',
  ];

  const getTodayKey = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [data, setData] = useState({});
  const todayKey = getTodayKey();

  useEffect(() => {
    const savedData = localStorage.getItem('heatmapData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (task) => {
    const current = new Set(data[todayKey] || []);
    if (current.has(task)) {
      current.delete(task);
    } else {
      current.add(task);
    }

    const updatedData = { ...data, [todayKey]: Array.from(current) };
    setData(updatedData);
    localStorage.setItem('heatmapData', JSON.stringify(updatedData));
    onTaskChange(); // Trigger heatmap update
  };

  return (
    <div>
      <h3>Today's Tasks</h3>
      {TASKS.map((task) => (
        <label
          key={task}
          style={{ display: 'block', marginBottom: '6px' }}
        >
          <input
            type="checkbox"
            checked={data[todayKey]?.includes(task) || false}
            onChange={() => handleChange(task)}
          />
          {task}
        </label>
      ))}
    </div>
  );
}

export default Todo;
