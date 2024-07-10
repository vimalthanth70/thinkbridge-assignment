import './App.css'
import Dashbord from './blocks/restaurent/Dashbord'
import RestaurantComponent from './blocks/restaurent/RestaurantComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashbord />} />
        <Route path="/restaurant/:id" element={<RestaurantComponent />} />
      </Routes>
    </Router>
  )
}

export default App
