import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import EmployeeForm from './Components/EmployeeForm';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<EmployeeForm/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
