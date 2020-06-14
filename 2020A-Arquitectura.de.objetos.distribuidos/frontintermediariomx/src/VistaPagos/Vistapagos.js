//import React, { Component } from 'react';
import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import '../App.css';


const Vistapagos = () => {

    //definicion de estado hooks
    const [state, setState]=useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: "",
        message: ""
        
    })



    //capturar datos de la tarjeta
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    //evento para que gire tarjeta
    const handleFocusChange = (e) => {
        setState({
            ...state,
            focus : e.target.name
        })
    }

    const ProccessPayment = () =>{
        console.log("number =>", state.number)
        console.log("name =>", state.name)
        console.log("expiry =>", state.expiry)
        console.log("cvc =>", state.cvc)
        console.log(JSON.stringify(state))
    }

    /*
    .-validaciones para no dejar espacios en blanco en el llenado de datos
    .-evento onclick para validar pagos
    */



    return(
        <div className="col-md-6 offset-md-3">
            <div className="Center-card">
                <div className="card Center-component content">
                    <div className="card-body">
                    <Cards 
                            number={state.number}
                            name={state.name}
                            expiry={state.expiry}
                            cvc={state.cvc}
                            focused={state.focus}
                            />
                           
                            <form>
                                <div className="form-group">
                                    <label htmlFor="number">Card number</label>
                                    <input
                                        type="text"
                                        name="number"
                                        id="number"
                                        maxLength="16"
                                        className="form-control"
                                        onChange={handleChange}
                                        onFocus={handleFocusChange} 
                                        />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        maxLength="30"
                                        className="form-control"
                                        onChange={handleChange}
                                        onFocus={handleFocusChange}   
                                        />
                                </div>
                                <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="expiry">expiration date</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        id="expiry"
                                        maxLength="4"
                                        className="form-control" 
                                        onChange={handleChange}
                                        onFocus={handleFocusChange}  
                                        />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="cvc">CVC</label>
                                    <input
                                        type="text"
                                        name="cvc"
                                        id="cvc"
                                        maxLength="4"
                                        className="form-control"
                                        onChange={handleChange}
                                        onFocus={handleFocusChange}  
                                        />
                                </div>

                                </div>
                                <button
                                onClick={ProccessPayment}
                                    type="button" 
                                    className="btn btn-success btn-block ">Pay</button>
                            </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vistapagos;