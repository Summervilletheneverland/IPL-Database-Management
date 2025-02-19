import Navbar from '../Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import './Stats.scss';
import Navbar_admin from '../Navbar/Navbar_admin';

function Stats() {
  const [seasons, setSeasons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('http://localhost:4000/get_seasons',{
          method:'POST',
          headers: {'Content-Type': 'application/json'}
        });
        const seasonsData = await response.json();
        // console.log(seasonsData);
        setSeasons(seasonsData);

        const categoriesResponse = await fetch('http://localhost:4000/get_categories',{
          method:'POST',
          headers: {'Content-Type': 'application/json'}
        });
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Find the season with the highest number
        //const highestSeason = seasons.reduce((prev, current) => (prev.number > current.number) ? prev : current);
        // setSelectedSeason(highestSeason.season_id);
        console.log(selectedSeason);
        // Fetch stats for the highest season and selected category
        const response = await fetch('http://localhost:4000/get_stats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({season: selectedSeason, category: selectedCategory }),
        });
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    // Fetch stats when the seasons or selected category change
    if (seasons.length > 0 && selectedCategory !== '') {
      fetchStats();
    }
  }, [seasons, selectedCategory]);

  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <Navbar_admin/>
      
      <h1>Statistics</h1>
      <div>
        <label>Select Season:</label>
        <select value={selectedSeason} onChange={handleSeasonChange}>
          <option value="" disabled>Select a season</option>
          {seasons.map(season => (
            <option key={season.id} value={season.season_id}>
              {season.year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Category:</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="" disabled>Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.column_name}>
              {category.column_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Statistics Results</h2>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Innings</th>
              <th>Notout</th>
              <th>Runs_Scored</th>
              <th>balls_faced</th>
              <th>fours</th>
              <th>Sixes</th>
              <th>batting str</th>
              <th>batting avg</th>
              <th>wickets </th>
              <th>overs</th>
              <th>dots</th>
              <th>Maidens</th>
              <th>bowling str</th>
              <th>bowling avg</th>
              <th>run_outs</th>
              <th>catches</th>
              <th>stumpings</th>
            </tr>
          </thead>
          <tbody>
            {stats.map(stat => (
              <tr key={stat.player_id}>
                <td>{stat.player_name}</td>
                <td>{stat.innings}</td>
                <td>{stat.notout}</td>
                <td>{stat.runs_scored}</td>
                <td>{stat.balls_faced}</td>
                <td>{stat.fours}</td>
                <td>{stat.sixes}</td>
                <td>{stat.batting_strikerate}</td>
                <td>{stat.batting_average}</td>
                <td>{stat.wickets_taken}</td>
                <td>{stat.overs_bowled}</td>
                <td>{stat.dots}</td>
                <td>{stat.maidens}</td>
                <td>{stat.bowling_strikerate}</td>
                <td>{stat.bowling_average}</td>
                <td>{stat.run_outs}</td>
                <td>{stat.catches}</td>
                <td>{stat.stumpings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stats;
