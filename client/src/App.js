import React, { useEffect, useState } from 'react';
import axios from 'axios';

import trashIcon from './icons/trashIcon.png';
import editIcon from './icons/editIcon.png';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
    .then(res => {
      setUsers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  
  const nameChange = e => {
    setName(e.target.value);
    // console.log(e.target.name, '=', e.target.value);
  }
  
  const bioChange = e => {
    setBio(e.target.value)
    // console.log(e.target.name, '=', e.target.value);
  }
  
  const handleSubmit = e => {
    const payload = {
      name: name,
      bio: bio
    }

    console.log(payload)

    axios.post('http://localhost:5000/api/users', payload)
      .then(res => {
        console.log(res)
        setName('')
        setBio('')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const editMember = e => {
    console.log('edit clicked')
  }

  const deleteMember = id => {
    console.log('member excommunicated')

    axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <div className="formBox">
        <legend>Add a member to the Fellowship</legend>
        <form onSubmit={handleSubmit} className="addMemberForm">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={nameChange}
            value={name}
          />

          <textarea
            type="textarea"
            name="bio"
            placeholder="Bio"
            onChange={bioChange}
            value={bio}
          />

          <button>Add Member</button>
        </form>
      </div>
      <div className="users">
        {
          users.map(user => {
            return (
              <div key={user.id} className="userCard">
                <div className="memberDetails">
                  <p className="name">{user.name}</p>
                  <p className="bio">{user.bio}</p>
                </div>
                <div className="iconBox">
                  <span onClick={editMember} className="icon"><img src={editIcon} alt="" /></span>
                  <span onClick={() => deleteMember(user.id)} className="icon"><img src={trashIcon} alt="" /></span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
