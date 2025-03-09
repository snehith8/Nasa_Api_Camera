import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Homepage from './Homepage';
import Home from './Home';
import Details from './Details';
import Gallery from './Gallery';

function App() {
  return (
   <Router>
    <Routes>
      <Route path = '/' element ={<Home />}/>
      <Route path = '/Homepage' element={<Homepage />}/>
      <Route path = '/Details' element={<Details />}/>
      <Route path = '/Gallery' element={<Gallery />}/>
    </Routes>
   </Router>
  );
}
 
export default App;