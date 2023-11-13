import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/navbar";
import Idea_submission from "./screens/Idea_submission";
import Idea_list from './screens/Idea_list';

const App = () => {
  return (
    <div>
      <Header/>
      <Idea_list/>
      <Footer/>
    </div>
  );
}

export default App;
