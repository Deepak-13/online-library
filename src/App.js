import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Component/Home';
import Cart from './Component/Cart';
import SignUp from './Component/SignUp';
import SignIn from './Component/SignIn';
import ManageBooks from "./Component/ManageBooks";
import Profile from './Component/Profile';
import AddBooks from './Component/AddBooks';
import UpdateBooks from "./Component/UpdateBooks";
import Reading from './Component/Reading';
import Status from './Component/Status';
import Completed from './Component/Completed';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={< SignIn />}></Route>
          <Route exact path='/signup' element={< SignUp />}></Route>
          <Route exact path='/home' element={< Home />}></Route>
          <Route exact path='/profile' element={< Profile />}></Route>
          <Route exact path='/addbook' element={< AddBooks />}></Route>
          <Route exact path='/cart' element={< Cart />}></Route>
          <Route exact path='/status' element={< Status />}></Route>
          <Route exact path='/books' element={< ManageBooks />}></Route>
          <Route exact path='/update' element={< UpdateBooks />}></Route>
          <Route exact path='/Reading' element={< Reading />}></Route>
          <Route exact path='/Completed' element={< Completed />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;