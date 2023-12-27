import React, { useEffect, useState } from 'react';
import Form from './Form';
import Roster from './Roster';

const League = () => {
  const [teamData, setTeamData] = useState([]);
  const [playerMapping, setPlayerMapping] = useState({});
  const [showForm, setShowForm] = useState(true);

  const fetchPlayerInformation = async () => {
    try {
      const response = await fetch('https://api.sleeper.app/v1/players/nfl');
      const playerData = await response.json();
      return playerData;
    } catch (error) {
      console.error('Error fetching player information:', error);
      return null;
    }
  };

  const createPlayerMapping = async () => {
    const playerData = await fetchPlayerInformation();

    if (playerData) {
      const mapping = {};
      Object.values(playerData).forEach(player => {
        mapping[player.player_id] = player;
      });
      return mapping;
    }

    return null;
  };

  const fetchRosterData = async (leagueId) => {
    try {
      const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
      const result = await response.json();

      const startersList = result.map(roster => roster.starters);
      setTeamData(startersList);

      const mapping = await createPlayerMapping();
      setPlayerMapping(mapping);
      setShowForm(false); // Hide the form on successful submission
    } catch (error) {
      console.error('Error fetching roster data:', error);
    }
  };

  const handleSearchAgain = () => {
    setShowForm(true);
  };

  useEffect(() => {
    // Fetch player mapping on component mount
    createPlayerMapping().then(mapping => setPlayerMapping(mapping));
  }, []);

  return (
    <div>
      <Form onSubmit={fetchRosterData} showForm={showForm} />
      {!showForm && <p><a href="#!" onClick={handleSearchAgain}>Search again</a></p>}
      <Roster teamData={teamData} playerMapping={playerMapping} />
    </div>
  );
};

export default League;
