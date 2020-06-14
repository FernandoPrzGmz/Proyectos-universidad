import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import Logout from './Components/Logout';
import Productos from './Redirect/Productos';
import RegisterComponent from './Components/FormRegister';
import LoginComponent from './Components/FormLogin';
import PrincipalComponent from './Home';
import HomeComponent from './Home';
import logo from './simbolo-empresa-navbar.png';
import Vistapagos from './VistaPagos/Vistapagos';
import './App.css';

class App extends Component {
  //metodo render se usa los import de "react-router-dom" 
  //para redireccionar los links de Home, Register y Login
  render(){
    return(
      <Router>
        <div className="App">
          <nav className=" navbar navbar-dark bg-dark navbar-expand-lg">
            <a className="navbar-brand" href="/Home">
              <img src={logo} width="28" height="30" className="d-inline-block align-top" alt="IntermediarioMX"/>
            </a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link"  to='/Home'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to='/Register'>Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to='/Login'>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to='/Productos'>Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to='/Logout'>Logout</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to='/Pagos'>Pagos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link"  to='/'></Link>
              </li>
            </ul>
          </nav>
            <Route exact path="/" component={PrincipalComponent} />
            <Route path="/Home" component={HomeComponent} />
            <Route path="/Register/" component={RegisterComponent} />
            <Route path="/Login/" component={LoginComponent} />
            <Route path="/Productos/" component={ Productos} />
            <Route path="/Logout/" component={ Logout} />
            <Route path="/Pagos/" component={Vistapagos} />
        </div>
      </Router>
      
    );
  }
}

export default App;