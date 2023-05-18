import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect } from 'react';
import { Route, useHistory, withRouter, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login'
import { supabase } from './supabaseClient'

function App() {

  const history = useHistory();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session === null) {
        history.replace("/login");
      } else {
        history.replace("/");
      }
    });
  }, []);
  const NavbarWithRouter = withRouter((props) => <Navbar {...props} />);

  return (
    <>
      <NavbarWithRouter exact />
      <Switch>
        <Route exact path='/' components={Home} />
        <Route exact path='/login' components={Login} />
      </Switch>

    </>
  );
}

export default App;
