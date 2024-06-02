import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useState } from 'react';
import Sidebar from '../../components/sidebar/sidebar';

// Team Component
export default function Team() {
  const [teams, setTeams] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('/api/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const addTeam = async () => {
    try {
      await axios.post('/api/teams', { name: newTeamName });
      fetchTeams();
      setNewTeamName('');
    } catch (error) {
      console.error('Error adding team:', error);
    }
  };

  const deleteTeam = async (teamId) => {
    try {
      await axios.delete(`/api/teams/${teamId}`);
      fetchTeams();
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <div>
      <h1>Teams</h1>
      <div>
        <div>
          <Sidebar />
        </div>
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Enter new team name"
        />
        <button onClick={addTeam}>Add Team</button>
      </div>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {team.name}{' '}
            <button onClick={() => deleteTeam(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}