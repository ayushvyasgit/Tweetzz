import './App.css'
import DashBoard from './pages/DashBoard';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { BrowserRouter,Routes,Route } from "react-router-dom"

function App() { 
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>} />
      <Route path="/DashBoard" element={<DashBoard/>} />

    </Routes>
  </BrowserRouter>
}
export default App;
