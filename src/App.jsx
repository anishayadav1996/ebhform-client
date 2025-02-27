import React from 'react'
import MagazineForm from './components/pages/MagazineForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MagazineForm2 from './components/pages/MagazineForm2';




function App() {

  return (
    <>
       <Router>
       <Routes>
        <Route path ="/" element={<MagazineForm/>}/>
        <Route path ="/magazine-form" element={<MagazineForm2/>}/>
   </Routes>
   </Router>
    </>
  )
}

export default App
