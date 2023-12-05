import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Footer from "./components/footer";
import Header from "./components/navbar";
import IdeaList from './screens/IdeaList';
import My_Ideas from './screens/Myideas';
import IdeaSubmission from './screens/IdeaSubmission';
import LoginPage from './screens/Login';
import Signup from './screens/Registration';
import Graph from './screens/Graph'
import EndScreen from './screens/EndScreen';
import EmployeeDeatils from './screens/EmployeeDeatils';
import EditDetails from './screens/EditDetails';



const App = () => {
  return (

    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/list" element={<IdeaList />} />
      <Route path="/mylist" element={<My_Ideas />} />
      <Route path="/submit" element={<IdeaSubmission />} />
      <Route path="/register" element={<Signup />} />  
      <Route path="/graphs" element={<Graph/>} /> 
      <Route path="/details" element={<EmployeeDeatils/>} /> 
      <Route path="/edit_details" element={<EditDetails/>} /> 
      <Route path="/logout" element={<EndScreen/>} />           
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;