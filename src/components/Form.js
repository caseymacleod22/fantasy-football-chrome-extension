import React, { useState } from 'react';

const Form = ({ onSubmit, showForm }) => {
  const [leagueId, setLeagueId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(leagueId);
  };

  return (
    <div style={{ display: showForm ? 'block' : 'none' }}>
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
    </div>
  );
};

export default Form;
