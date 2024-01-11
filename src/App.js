import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/navbar';
import IdeaList from './screens/IdeaList';
import My_Ideas from './screens/Myideas';
import IdeaSubmission from './screens/IdeaSubmission';
import LoginPage from './screens/Login';
import Signup from './screens/Registration';
import Graph from './screens/Graph';
import EndScreen from './screens/EndScreen';
import EmployeeDeatils from './screens/EmployeeDeatils';
import EditDetails from './screens/EditDetails';
import EditPassword from './screens/EditPassword';
import { io } from 'socket.io-client/dist/socket.io.js';

const App = () => {

  const socket = io("ws://localhost:5000", {
  });  console.log(socket.on("firstEvent", (msg) =>{console.log(msg)}));

  socket.on("connect", () => {
    console.log("socket connected");
  });
  
  socket.on("connect_error", (err) => {
    console.log("socket connection error: " + err.message);
  });
  
  socket.on("connect_failed", () => {
    console.log("socket connection failed");
  });
  
  socket.on("firstEvent", (msg) => {
    console.log("received first event: " + msg);
  });

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
      <Route path="/edit_password" element={<EditPassword/>} /> 
      <Route path="/logout" element={<EndScreen/>} />           
      </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
