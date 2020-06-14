import React, { Component } from 'react';
import LogoHome from './logo-store.png';
import SimboloEmpresa from './simbolo-empresa.png';
import './App.css';


class homeComponent extends Component {
    render(){
      return(
        <div>
          <img src={LogoHome} alt="LogoHome" className="center-logo"/>
            <div className="container">
              <div className="card-container">
                <div className="header">
                  <img src={SimboloEmpresa} alt=""/>
                  <h2>IntermediarioMX</h2>     
                </div>
                <div className="descripcion">
                  <p>
                    "With this new communication platform we are focusing on a key 
                    stage of commerce: when contact occurs between the physical world and online. 
                    In this way, we seek to strengthen the bond of trust that appears at that moment, 
                    thus completing an experience"
                  </p>
                </div>
              </div>
            </div>
        </div>       
      );
    }
  }
  
  export default homeComponent;