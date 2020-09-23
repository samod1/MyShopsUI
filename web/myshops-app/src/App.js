import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './Components/Button/Button'
import Vertmenu from './Components/Menu/Vertmenu';
import Pageheader from './Components/Page/Header/Pageheader'
import DesktopContainer from './Components/Page/Page/Page'
import ResponsiveContainer from './Components/Page/Page/Page'

function App() {
  return (
    <div className="App">
      <ResponsiveContainer></ResponsiveContainer>
    </div>
  );
}

export default App;
