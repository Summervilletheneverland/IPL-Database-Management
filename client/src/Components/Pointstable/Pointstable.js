import React, { useState, useEffect } from 'react';
import './Pointstable.scss';
import Navbar from '../Navbar/Navbar';

function Pointstable() {
  const [value, setValue] = useState('2010');
  const [data, setData] = useState([]);

  const fetchPointstable = async (year) => {   
     const response= await fetch('http://localhost:4000/pointstable',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({year})
     })
    const jsonData=await response.json()
    setData(jsonData);
    // console.log('year:'+year)
  };

  useEffect(() => {
    fetchPointstable(value);
    // console.log("check");
  }, [value]);

  const handleChange = (event) => {
   
    setValue(event.target.value);
    // fetchPointstable(event.target.value);
    // console.log(event.target.value + ":value");
  };

  return (
    <div className='pointstable'>
      <Navbar />
      <div className=''>
        <select className='select_year' value={value} onChange={handleChange}>
          <option className='option_year' value='' disabled hidden>Select year</option>
          <option className='option_year' value='2010' id='2010'>2010</option>
          <option className='option_year' value='2009' id='2009'>2009</option>
          <option className='option_year' value='2008' id='2008'>2008</option>
        </select>
      </div>
      <div className='table'>
        <table className='table1'>
          <thead>
            <tr>
              <th className='head_p'>Standing</th>
              <th className='head_p'>Team</th>
              <th className='head_p'>Matches Played</th>
              <th className='head_p'>Matches Won</th>
              <th className='head_p'>Matches Lost</th>
              <th className='head_p'>Tied / No-result</th>
              <th className='head_p'>Points</th>
              <th className='head_p'>NRR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td className='row_p'>{index+1 <= 4 ? 'Q': index+1}</td>
                <td className='row_p'>{item.team_name}</td>
                <td className='row_p'>{item.matches_played}</td>
                <td className='row_p'>{item.matches_won}</td>
                <td className='row_p'>{item.matches_lost}</td>
                <td className='row_p'>{item.no_result}</td>
                <td className='row_p'>{item.points}</td>
                <td className='row_p'>{item.nrr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pointstable;
