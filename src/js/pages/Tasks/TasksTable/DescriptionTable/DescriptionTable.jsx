import React from 'react';
import './DescriptionTable.scss';


const DescriptionTable = ({id, author, maxScore, setShowDescription, setShowId}) => {
  const onShow = () => {
    setShowDescription(true);
    setShowId(id);
  }

    return (
    <tr>
      <td>{id}</td>
      <td>{author}</td>
      <td>{maxScore}</td>
      <td>
        <button onClick={onShow}>SHOW</button>
      </td>
    </tr>
    )
}

export default DescriptionTable;
