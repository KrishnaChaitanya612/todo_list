import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';
const List = ({ items, removeItem, editItem }) => {
  return (
    
      <div className='todo-list'>
      {items.map((item) => {
        
        const { id, title } = item;
        return (
          <Fade key={id} collapse top >
          <article className='todo-item' >
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
           </Fade>
        );
      })}
    </div>
  );
};

export default List;
