import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserDasboard from "./Pages/UserDashboard";
import MyNotes from "./Pages/MyNotes";
import Analytics from "./Pages/Analytics";
import How from "./Pages/How";
import About from "./Pages/About";
import Setting from "./Pages/Setting";
import Admin from "./Pages/Admin";

function App() {

  return(
    
      
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/UserDashboard" element={<UserDasboard />} />
      <Route path="/MyNotes" element={<MyNotes />} />
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/How" element={<How />} />
      <Route path="/About" element={<About />} />
      <Route path="/Setting" element={<Setting />} />
      <Route path="/Admin" element={<Admin />} />
    </Routes> 
      
    

  );
}

export default App;

