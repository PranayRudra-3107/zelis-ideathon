import React, { Component } from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/navbar";
import Idea_list from './screens/Idea_list';
import Idea_submission from './screens/Idea_submission';

const App = () => {
  return (
    <div>
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Idea_list />} />
        <Route path="/Idea_submission" element={<Idea_submission />} />
      </Routes>
    </BrowserRouter>

      <Footer/>
    </div>
  );
}

export default App;
