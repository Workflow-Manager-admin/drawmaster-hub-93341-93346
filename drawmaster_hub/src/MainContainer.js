import React, { useState } from 'react';
import './App.css';

/*
  PUBLIC_INTERFACE
  MainContainer is the top-level component for DrawMaster Hub.
  It manages major layout and top-level state: contest status, entries,
  winner, and UI navigation.
  Structure:
    - Header: Branding/navigation
    - Main: Contest info, entry form, winner announcement (all placeholder for now)
    - Footer: Copyright or app info

  Future integration points: database sync, backend winner announcement, advanced navigation,
  splitting main section into subcomponents.
*/

const initialContestStatus = 'open'; // Possible: 'open', 'closed', 'announced'

function MainContainer() {
  // Top-level app state
  const [contestStatus, setContestStatus] = useState(initialContestStatus); // open/closed/announced
  const [entries, setEntries] = useState([]); // [{name, ...}]
  const [winner, setWinner] = useState(null); // {name, ...} or null
  const [page, setPage] = useState('home'); // 'home', 'enter', 'winner', etc.

  // Placeholder: handle contest entry – populates `entries`
  const handleEntrySubmit = (entry) => {
    setEntries([...entries, entry]);
    // In reality: integrate with backend/open DB here
  };

  // Placeholder: Announce a winner (dummy implementation)
  const handleAnnounceWinner = () => {
    if (entries.length > 0) {
      // Random pick
      const idx = Math.floor(Math.random() * entries.length);
      setWinner(entries[idx]);
      setContestStatus('announced');
    }
  };

  return (
    <div className="app">
      {/* Header/Navbar */}
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> DrawMaster Hub
            </div>
            <button className="btn" onClick={() => setPage('enter')}>Enter Contest</button>
          </div>
        </div>
      </nav>

      {/* Main content (dynamic sections will be split out in future steps) */}
      <main style={{ flex: 1 }}>
        <div className="container">
          <div className="hero">

            {/* Contest Info */}
            <div className="subtitle">Drawing Contest</div>
            <h1 className="title">Welcome to DrawMaster Hub</h1>
            <div className="description">
              {contestStatus === 'open'
                ? "The contest is open for entries! Submit yours to participate."
                : contestStatus === 'closed'
                  ? "Contest entries are now closed. Stand by for results!"
                  : "The winner has been announced!"}
            </div>

            {/* Entry Form */}
            {(contestStatus === 'open' && page === 'enter') && (
              <EntryForm onSubmit={(entry) => {
                handleEntrySubmit(entry);
                setPage('home');
              }} />
            )}

            {/* Winner Announcement */}
            {contestStatus === 'announced' && (
              <>
                <h2>🎉 Winner: {winner ? winner.name : "TBD"}</h2>
              </>
            )}

            {/* For now, button to simulate closing contest and announcing winner */}
            {contestStatus === 'open' && (
              <button
                className="btn btn-large"
                onClick={() => setContestStatus('closed')}
                style={{ margin: '12px' }}
              >
                Close Contest
              </button>
            )}
            {contestStatus === 'closed' && (
              <button
                className="btn btn-large"
                onClick={handleAnnounceWinner}
                style={{ margin: '12px' }}
                disabled={entries.length === 0}
                title={entries.length === 0 ? "No entries to choose from" : ""}
              >
                Announce Winner
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'var(--kavia-dark)',
          color: 'var(--text-secondary)',
          padding: '16px 0',
          textAlign: 'center',
          borderTop: '1px solid var(--border-color)'
        }}
      >
        DrawMaster Hub &copy; {new Date().getFullYear()} | Powered by KAVIA AI
      </footer>
    </div>
  );
}

// EntryForm subcomponent (could later be split out)
// PUBLIC_INTERFACE
function EntryForm({ onSubmit }) {
  // Local form state
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    setError('');
    onSubmit({ name: name.trim() });
    setName('');
  };

  return (
    <form onSubmit={handleLocalSubmit} style={{ margin: '16px 0' }}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        type="text"
        placeholder="Your Name"
        style={{
          padding: '8px',
          fontSize: '1rem',
          marginRight: '12px',
          borderRadius: 4,
          border: '1px solid var(--border-color)'
        }}
      />
      <button type="submit" className="btn btn-large">Enter</button>
      {error && <div style={{ color: 'salmon', marginTop: 8 }}>{error}</div>}
    </form>
  );
}

export default MainContainer;
