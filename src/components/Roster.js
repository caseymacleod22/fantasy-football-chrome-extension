import React, { useEffect, useState } from 'react';

const Roster = ({ teamData, playerMapping }) => (
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

export default Roster;
