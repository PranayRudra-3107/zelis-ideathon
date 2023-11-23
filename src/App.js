import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/navbar";
import Idea_list from './screens/Idea_list';
import Idea_submission from './screens/Idea_submission';
import LoginPage from './screens/Login';
import Signup from './screens/Registration';
import BarGraph from './screens/BarGraph'
import FullFeaturedCrudGrid from './screens/Myideas';
const App = () => {
  return (

    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/list" element={<Idea_list />} />
      <Route path="/myideas" element={<FullFeaturedCrudGrid/>} />
      <Route path="/submit" element={<Idea_submission />} />
      <Route path="/register" element={<Signup />} />  
      <Route path="/graphs" element={<BarGraph/>} />           
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;