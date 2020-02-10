import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  return (
    <div className="App">
      <div className="users">
        {
          users.map(user => {
            return (
              <div key={user.id} className="userCard">
                <p className="name">{user.name}</p>
                <p className="bio">{user.bio}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
