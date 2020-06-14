import React, { Component } from 'react';


class campoNecesarioComponent extends Component {
  //en el metodo render se pone el titulo del formulario
  render(){
    return(
        <div className="col-md-6">
            <p className="float-left font-weight-bold text-danger" >   * Campos obligatorios</p>
        </div>
    );
  }
}

export default campoNecesarioComponent;
