import React,{useState} from 'react'
import Navbar from '../Navbar/Navbar'
import /*styles from*/ './../Admin/Admin.scss'
function Auction() {
  const [searchName, setSearchName] = useState('');
  const [players, setPlayers] = useState([]);
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
      console.log(data)
    } catch (error) {
      console.error('Error searching players:', error);
    }
  };
  const handleretain=async(pid,sid)=>{
    console.log(pid,sid);
    const response=await fetch('http://localhost:4000/retain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({pid,sid}),
    });
    // const data = await response.json();
  }
  return (
    <div>
      <Navbar/>
      <div>
      <form onSubmit={handleSearch} id ='form_admin' className={styles.form}>
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
      </div>

        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        <h2>Search Results</h2>
        <ul className={styles.playerList}>
          {players.map(player => (
            <li key={player.player_id} className={styles.playerItem}>
              <div>
                <strong>{player.player_name}</strong> ({player.role})  ({player.age})
              </div>
              <button onClick={() => handleretain(player.player_id,player.season_id)} id='button_delete_admin'>Whether we can retain or not</button>
              </li>
            ))}
            </ul>
            
          
    </div>
  )
}

export default Auction
