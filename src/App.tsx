import { useState } from 'react'
import './App.scss'
import Header from './Components/Header/Header'
import Board from './Components/Board/Board'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {

  return (
    <div id='app'>
      <Header></Header>
      <Board></Board>      
    </div>
  )
}

export default App
