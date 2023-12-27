import React, { useEffect, useState } from 'react';

const Roster = () => {
  const [teamData, setTeamData] = useState([]);
  const [playerMapping, setPlayerMapping] = useState({});

  // Fetch player information
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

  // Create player mapping
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

  useEffect(() => {
    const fetchData = async () => {
      // Fetch team data
      try {
        const response = await fetch('https://api.sleeper.app/v1/league/917927357623795712/rosters');
        const result = await response.json();
        
        const startersList = result.map(roster => roster.starters);
        setTeamData(startersList);

        // Fetch and set player mapping
        const mapping = await createPlayerMapping();
        setPlayerMapping(mapping);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
