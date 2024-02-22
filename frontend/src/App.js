import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeList from './Components/EmployeeList';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<EmployeeForm/>}/>
          <Route path='/employee-list' element={<EmployeeList/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
