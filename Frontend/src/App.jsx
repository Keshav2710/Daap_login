import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from './components/Auth/Signin';

import Dashboard from "./components/Dashboard";
import Increment from './components/Increment';
import PrivateRoutes from './utils/PrivateRoute';


function App() {
  const [count, setCount] = useState(0)  

  return (
    
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
            <Route  exact path="/" element={<Dashboard />}/>
            <Route exact path="/increment" element={<Increment />}/>
        </Route>
        {/* <PrivateRoute exact path="/" element={Dashboard} />
        <PrivateRoute exact path="/increment" element={Increment} /> */}
        <Route exact path="/auth" element={
          <Signin />
        }
        />
        <Route exact path="*" 
          element={
            <main style={{ padding: "1rem" }} className="text-center">
              <h1>404 Page Not Found</h1>
              <p>Please try different Routes</p>
            </main>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
