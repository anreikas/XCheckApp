import React from 'react';
import './DescriptionTable.scss';


const DescriptionTable = ({id, author, maxScore, setShowDescription, setShowId}) => {
  const onShow = () => {
    setShowDescription(true);
    setShowId(id);
  }

    return (
    <tr className='table-description'>
      <td className='table-description-elem'>{id}</td>
      <td className='table-description-elem'>{author}</td>
      <td className='table-description-elem'>{maxScore}</td>
      <td className='table-description-elem'>
        <button className='table-description-bth' onClick={onShow}>SHOW</button>
      </td>
    </tr>
    )
}

export default DescriptionTable;
