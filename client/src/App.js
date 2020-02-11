import React, { useEffect, useState } from 'react';
import axios from 'axios';

import trashIcon from './icons/trashIcon.png';
import editIcon from './icons/editIcon.png';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState({
    name: '',
    bio: ''
  })

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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

  const editMember = member => {
    setIsEditing(!isEditing)
    setMemberToEdit(member)
  }

  const saveEdit = e => {
    setIsEditing(!isEditing);

    axios.put(`http://localhost:5000/api/users/${memberToEdit.id}`, memberToEdit)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
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
      <div className="formBoxes">
        {
          !isEditing
            ?
            <div className="addFormBox">
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
            :
            <div className="editFormBox">
              <legend>Edit Member</legend>
              <form onSubmit={saveEdit} className="editMemberForm">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={e => {
                    setMemberToEdit({
                      ...memberToEdit,
                      name: e.target.value
                    })
                  }}
                  value={memberToEdit.name}
                />

                <textarea
                  type="textarea"
                  name="bio"
                  placeholder="Bio"
                  onChange={e => {
                    setMemberToEdit({
                      ...memberToEdit,
                      bio: e.target.value
                    })
                  }}
                  value={memberToEdit.bio}
                />

                <button type="submit">Edit</button>
              </form>
            </div>
        }
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
                  <span onClick={() => editMember(user)} className="icon"><img src={editIcon} alt="" /></span>
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
