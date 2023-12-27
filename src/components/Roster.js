import React, { useState, useEffect } from 'react';

const Roster = () => {
  const [leagueId, setLeagueId] = useState('');
  const [teamData, setTeamData] = useState([]);
  const [playerMapping, setPlayerMapping] = useState({});

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

  const fetchRosterData = async () => {
    try {
      const response = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/rosters`);
      const result = await response.json();

      const startersList = result.map(roster => roster.starters);
      setTeamData(startersList);

      const mapping = await createPlayerMapping();
      setPlayerMapping(mapping);
    } catch (error) {
      console.error('Error fetching roster data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch roster data when the form is submitted
    fetchRosterData();
  };

  useEffect(() => {
    // Fetch player mapping on component mount
    createPlayerMapping().then(mapping => setPlayerMapping(mapping));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          League ID:
          <input
            type="text"
            value={leagueId}
            onChange={(e) => setLeagueId(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {teamData.map((starters, index) => (
        <div key={index} className={`starters-list${index}`}>
          {starters.map((playerId, entryIndex) => (
            <div key={entryIndex}>
              <p>{playerMapping[playerId]?.full_name || 'Unknown Player'}</p>
              {/* Add additional details as needed */}
              <p>{playerMapping[playerId]?.position}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Roster;
