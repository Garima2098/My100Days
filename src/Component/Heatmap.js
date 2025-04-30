import React, { useEffect, useState } from 'react';
import './Heatmap.css';

function Heatmap({ updateCount }) {
  const [data, setData] = useState({});

  const startDate = new Date('2025-04-30');

  useEffect(() => {
    const savedData = localStorage.getItem('heatmapData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, [updateCount]);

  const getColor = (count) => {
    const shades = [
      '#eeeeee',
      '#d0f0c0',
      '#a8e6a3',
      '#81d885',
      '#5ccb68',
      '#3cb14a',
      '#28963b',
      '#1b5e20',
    ];
    return shades[Math.min(count, 7)] || '#eeeeee';
  };

  const getDateLabelForRow = (rowIndex) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + rowIndex * 10);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="heatmap-grid">
      <div className="dates-column">
        {[...Array(10)].map((_, row) => (
          <div
            key={row}
            className="date-label"
          >
            {getDateLabelForRow(row)}
          </div>
        ))}
      </div>
      <div className="heatmap">
        {[...Array(100)].map((_, i) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          const key = date.toISOString().split('T')[0];
          const completedTasks = data[key] || []; // get completed tasks for the date
          const count = completedTasks.length;

          return (
            <div
              key={key}
              className="box"
              title={`${key}: ${count} task(s) done - ${completedTasks.join(
                ', '
              )}`}
              style={{
                backgroundColor: getColor(count),
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Heatmap;
