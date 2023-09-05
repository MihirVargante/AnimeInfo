import Header from './components/Header'
import Detail from './components/Detail'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {createContext,useState} from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
const Appstate=createContext();
function App() {
  const [login,setLogin]=useState(false);
  const [username,setUserName]=useState('')
  return (
    <Appstate.Provider value={{login,username,setLogin,setUserName}}>
      <Router>
      <div className="App">
        <Routes>
            <Route path='/' element={<Header/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
        
      </div>
      </Router>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}