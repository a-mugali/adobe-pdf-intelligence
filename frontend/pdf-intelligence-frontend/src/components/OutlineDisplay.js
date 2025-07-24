import React from 'react';

const OutlineDisplay = ({ outline }) => {
  if (!outline) return null;

  return (
    <div>
      <h2>📄 PDF Outline</h2>
      <h3>Title: {outline.title}</h3>
      <ul>
        {outline.outline.map((item, index) => (
          <li key={index}>
            {item.level}: {item.text} (Page {item.page})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutlineDisplay;
