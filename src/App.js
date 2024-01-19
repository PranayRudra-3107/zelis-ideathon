import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import {AuthenticationGuard} from "./components/authentication-guard"
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
import SignApp from './components/SignApp';


const App = () => {
  return (
    <div>      
      <Header/>
      <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/list" element={<AuthenticationGuard component={IdeaList} />} />
      <Route path="/mylist" element={<AuthenticationGuard component={My_Ideas} />} />
      <Route path="/submit" element={<AuthenticationGuard component={IdeaSubmission} />} />
      <Route path="/register" element={<Signup/>}/>  
      <Route path="/graphs" element={<AuthenticationGuard component={Graph} />} /> 
      <Route path="/details" element={<AuthenticationGuard component={EmployeeDeatils} />} /> 
      <Route path="/edit_details" element={<AuthenticationGuard component={EditDetails} />}/> 
      <Route path="/logout" element={<EndScreen/>} />    
      <Route path="/SignIn" element={<SignApp/>} />          
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;