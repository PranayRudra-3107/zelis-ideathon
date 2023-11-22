import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/navbar";
import Idea_list from './screens/Idea_list';
import Idea_submission from './screens/Idea_submission';
import Signup from './screens/Registration';
import Idea_edit from './screens/Edit_idea';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/list" element={<Idea_list />} />
      <Route path="/submit" element={<Idea_submission />} />
      <Route path="/edit" element={<Idea_edit />} />
      <Route path="/register" element={<Signup />} />            
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;