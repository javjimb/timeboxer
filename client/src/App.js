// Library
import React from 'react';
// import 'typeface-roboto';

// CSS
import './App.css';

// Components
import TBAppBar from './components/TBAppBar';
import Main from '../src/pages/Main';

function App() {
  return (
    <div className='App'>
      {' '}
      <TBAppBar />
      <Main />
    </div>
  );
}

export default App;
