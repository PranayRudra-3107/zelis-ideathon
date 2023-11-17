import React, { Component } from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/navbar";
import Idea_list from './screens/Idea_list';
import Idea_submission from './screens/Idea_submission';
import Temp from './components/temp';
const App = () => {
  return (
    <div>
     
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/list" element={<Idea_list />} />
      <Route path="/submit" element={<Idea_submission />} />
      </Routes>
      <Footer/>
      </BrowserRouter>

     
    </div>
  );
}

export default App;
