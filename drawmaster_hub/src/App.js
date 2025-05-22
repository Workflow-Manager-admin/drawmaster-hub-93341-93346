import React from 'react';
import './App.css';
import MainContainer from './MainContainer';

// PUBLIC_INTERFACE
// App now delegates to MainContainer, which manages top-level app logic/layout
function App() {
  return <MainContainer />;
}

export default App;