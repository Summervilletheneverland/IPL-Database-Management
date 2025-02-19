import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Team.scss';

function Team() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:4000/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleTeamClick = async (team_name, s_id) => {
    try {
      console.log(`${team_name}:team`);
      const response = await fetch('http://localhost:4000/teamplayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team_name, s_id }),
      });
      const data = await response.json();
      setSelectedTeam(team_name);
      setTeamMembers(data); // Ensure that members is an array
    } catch (error) {
      console.error('Error fetching team details:', error);
    }
  };

  const getColorForTeam = (teamName) => {
    const colors = {
      'ROYAL CHALLENGERS BENGALURU': '#C41230',
      'MUMBAI INDIANS': '#00428A',
      'KINGS XI PUNJAB': '#DA1A32',
      'DELHI DAREDEVILS': '#002147',
      'CHENNAI SUPER KINGS': '#FCCC00',
      'DECCAN CHARGERS': '#0C2340',
      'KOLKATA KNIGHT RIDERS': '#521F8E',
      'RAJASTHAN ROYALS': '#E63B60',
    };
    return colors[teamName] || '#E0E0E0';
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        {teams.length > 0 ? (
          teams.map((item, index) => (
            <div key={index} className="teamRow">
              <div
                onClick={() => handleTeamClick(item.team_name, 'S02')}
                className="teamBox"
                style={{ backgroundColor: getColorForTeam(item.team_name) }}
              >
                <h2>{item.team_name}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>Loading teams...</p>
        )}
      </div>
      {selectedTeam && (
        <div className="teamDetails">
          <h2>{selectedTeam} TEAM </h2>
          <table>
            <thead>
              <th>Name</th><th>Sold Price</th>
            </thead>
          
            {teamMembers.length > 0 ? (
              teamMembers.map((member,index) => (
              <tr>
                <td key={index}>{index+1+") "}{member.player_name}</td>
              <td>{" $"}{member.sold_price}</td>
              </tr>
              ))
            ) : (
              <p>No members found</p>
            )}
    
          </table>
        </div>
      )}
    </div>
  );
}

export default Team;
