import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs'
import OtherInfo from './components/OtherInfo'
import ExplorePage from './components/ExplorePage'
import TextAppManager from './components/chatbot/TextAppManager'

function App() {
 return <HashRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about-us" element={<AboutUs/>}></Route>
    <Route path="/other-info" element={<OtherInfo/>}></Route>
    <Route path="/explore" element={<ExplorePage />}></Route>
    <Route path="/chat" element={<TextAppManager/>}></Route>
  </Routes>
 </HashRouter>
}

export default App
