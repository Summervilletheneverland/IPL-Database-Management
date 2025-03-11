import React, { useState, useRef } from 'react';
import Navbar_admin from '../Navbar/Navbar_admin';
import /*styles from*/ './Admin.scss';
function Admin() {
  const [players, setPlayers] = useState([]);

  const formRef = useRef();

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const newPlayer = Object.fromEntries(formData.entries());
    console.log(newPlayer)
    try {
      const response = await fetch('http://localhost:4000/admin_add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });
      formRef.current.reset();
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  // const handleDeletePlayer = async (id) => {
  //   try {
  //     await fetch(`http://localhost:4000/admin_delete/${id}`, {
  //       method: 'DELETE',
  //     });
  //     setPlayers(players.filter(player => player.id !== id));
  //   } catch (error) {
  //     console.error('Error deleting player:', error);
  //   }
  // };
  const [searchName, setSearchName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      // console.log(s+":e.name")
      const response = await fetch('http://localhost:4000/admin_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:searchName}),
      });
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error('Error searching players:', error);
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/admin_delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player_id:id }),
      });
console.log(response)
      if (response.ok) {
        setPlayers(players.filter(player => player.player_id !== id));
        setSuccessMessage('Player deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Failed to delete player');
      }
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <div>
      <Navbar_admin />
      <div className="container">
        {/* <h1>Admin Home Page</h1> */}
        <form ref={formRef} onSubmit={handleAddPlayer} id='form_admin' className="form_admin">
          <div>
            <label>Name:</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" name="dob" required />
          </div>
          <div>
            <label>Nationality:</label>
            <input type="text" name="nationality" required />
          </div>
          <div>
            <label>Role:</label>
            <input type="text" name="role" required />
          </div>
          <div>
            <label>Team:</label>
            <input type="text" name="team" required />
          </div>
          <div>
            <label>Year:</label>
            <input type="number" name="year" required />
          </div>
          <div>
            <label>Base Price:</label>
            <input type="number" name="bp" required />
          </div>
          <div>
            <label>Sold Price:</label>
            <input type="number" name="sp" required />
          </div>
          <div>
            <label>Runs:</label>
            <input type="number" name="runs" required />
          </div>
          <div>
            <label>Balls:</label>
            <input type="number" name="balls" required />
          </div>
          <div>
            <label>Innings:</label>
            <input type="number" name="innings" required />
          </div>
          <div>
            <label>Not Outs:</label>
            <input type="number" name="notouts" required />
          </div>
          <div>
            <label>Fours:</label>
            <input type="number" name="fours" required />
          </div>
          <div>
            <label>Sixes:</label>
            <input type="number" name="sixes" required />
          </div>
          <div>
            <label>Bowling Innings:</label>
            <input type="number" name="bowl_innings" required />
          </div>
          <div>
            <label>Wickets:</label>
            <input type="number" name="wickets" required />
          </div>
          <div>
            <label>Overs:</label>
            <input type="number" name="overs" required />
          </div>
          <div>
            <label>Dots:</label>
            <input type="number" name="dots" required />
          </div>
          <div>
            <label>Maidens:</label>
            <input type="number" name="maidens" required />
          </div>
          <div>
            <label>Runs Given</label>
            <input type="number" name="runs_given" required />
          </div>
         
          <div>
            <label>Run Outs:</label>
            <input type="number" name="runouts" required />
          </div>
          <div>
            <label>Catches:</label>
            <input type="number" name="catches" required />
          </div>
          <div>
            <label>Stumpings:</label>
            <input type="number" name="stumpings" required />
          </div>
          <button id='button_add_admin' type="submit">Add Player</button>
        </form>
      </div>

      <h3>SEARCH AND DELETE A PLAYER</h3>
      <form onSubmit={handleSearch} id ='form_admin' className="form">
          <div>
            <label>Search Player by Name:</label>
            <input 
              type="text" 
              value={searchName} 
              onChange={(e) => setSearchName(e.target.value)} 
              required 
            />
            </div><div>
            <button id='button_search_admin' type="submit">Search</button>
          </div>
        </form>

        {successMessage && <div className="successMessage">{successMessage}</div>}

        <h2>Search Results</h2>
        <ul className="playerList">
          {players.map(player => (
            <li key={player.player_id} className="playerItem">
              <div>
                <strong>{player.player_name}</strong> ({player.role})  ({player.age})
              </div>
              <button onClick={() => handleDeletePlayer(player.player_id)} id='button_delete_admin'>Delete</button>
            </li>
          ))}
        </ul>
      </div>
  );
}
export default Admin;
