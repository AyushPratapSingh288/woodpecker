import './App.css';
import Login from './Login';
import SignUp from './SignIn';
import Home from './Home';
import { BrowserRouter , Routes ,Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signIn' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
