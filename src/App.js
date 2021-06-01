import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Topten from './pages/Topten';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/useFindUser';

function App() {
  
  const { 
    user, 
    setUser, 
    isLoading } = useFindUser();

  return (
   <Router>
       <UserContext.Provider value={{ user, setUser, isLoading }}>
       <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
          <PrivateRoute path="/profile" component={Profile}/>
          <PrivateRoute path="/topten" component={Topten}/>
          <Route exact path="/" component={Landing}/>  
          <Route component={NotFound}/>
        </Switch>
      </UserContext.Provider>
   </Router>
  );
}

export default App;
