import React from 'react';

const ElementsDescription = ({ taskShow, category }) => taskShow.map((item) => {
  if (category === item.category) {
    return (
        <ul key={item.id}>
          <li>{item.title}</li>
          <ul>
            <li>{item.description}</li>
            <li>minScore: {item.minScore}</li>
            <li>maxScore: {item.maxScore}</li>
          </ul>
        </ul>
    );
  }

  return null;
});

export default ElementsDescription;
