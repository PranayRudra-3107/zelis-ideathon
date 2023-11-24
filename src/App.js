import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/navbar";
import IdeaList from './screens/IdeaList';
import IdeaSubmission from './screens/IdeaSubmission';
import LoginPage from './screens/Login';
import Signup from './screens/Registration';
import BarGraph from './screens/BarGraph'
const App = () => {
  return (

    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/list" element={<IdeaList />} />
      <Route path="/submit" element={<IdeaSubmission />} />
      <Route path="/register" element={<Signup />} />  
      <Route path="/graphs" element={<BarGraph/>} />           
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;