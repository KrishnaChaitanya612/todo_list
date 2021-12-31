import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';
import Slide from 'react-reveal/Slide';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [count,setCount] = useState(list.length);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    } else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setCount(count + 1);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
    setCount(0);
  };
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
    setCount(count - 1);
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <>
    <Slide left >
      <div className="developer">
        <a href="https://krishnachaitanyadonthu.netlify.app/"  target="blank"><p>Made by <span>Krishna Chaitanya</span> </p></a>
     </div>
    </Slide >
    <Slide>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
   </Slide>   
    <Slide right>
      <section className='section-center'>
      <form className='todo-form' onSubmit={handleSubmit}>
        <h3>Your ToDo LIST</h3>
        <h4>Your List Count : {count}</h4>
        <div className='form-control'>
          <input
            type='text'
            className='todo'
            placeholder='e.g. homework'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'add'}
          </button>
        </div>
      </form>
    
        {list.length > 0 && (
        <div className='todo-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
      
    </section>
    </Slide>
  
    </>
  );
}

export default App;
