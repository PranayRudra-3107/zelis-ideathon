import React, { Component } from 'react';
import Footer from "./components/footer";
import Header from "./components/navbar";
import Idea_submission from "./screens/Idea_submission";

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Idea_submission/>
        <Footer/>
      </div>
    );
  }
}

export default App;



