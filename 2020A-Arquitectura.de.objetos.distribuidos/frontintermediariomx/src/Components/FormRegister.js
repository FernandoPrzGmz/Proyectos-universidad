import React, { Component } from 'react';
import TitleComponent from './TitleRegisterForm';
import '../App.css';
import CampoNecesario from './CampoNecesario';
import Axios from 'axios';


class LoginFormComponent extends Component {
    //metodo constructor para los datos que se usan en el registro
    constructor(props){
        super(props)
        this.state ={
            firstName: "",
            lastName: "",
            password: "",
            email: "",
            confirm_password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    //funcion para hacer reset al formulario 
    handleSubmit = (event) => {
        const { password, confirm_password,} = this.state;
        // perform all neccassary validations
        if (password !== confirm_password) {
            alert("Las contraseñas no coinciden.");
        } else {
            // make API call

            alert(`¡El usuario ${this.state.firstName} ${this.state.lastName} se registro exitosamente!`)
        
            console.log(this.state);
            this.setState({
                firstName: "",
                lastName: "",
                password: "",
                email: "",
                confirm_password: "",
            })

            event.preventDefault()

            Axios.post('https://aod-intermediario.herokuapp.com/api/v1/user/signup', {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password})
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            })
        }
    }
    //funcion para que el component del constructur 
    //cambie cuando se intente registrar nuevamente
    Firstnamehandler = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }
    Lastnamehandler = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }
    Passwordhandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    Emailhandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    ConfirmPasswordhandler = (event) => {
        this.setState({
            confirm_password: event.target.value
        })
    }
    //en el metodo render se encuentra el formulario con las 
    //funciones handler y valuacion con los datos del constructor
    render(){
        return (
            <div className="col-md-6 offset-md-3">
            <div className="Center-card" >
                <form onSubmit={this.handleSubmit}>
                    <div className="card Center-component content">
                    <TitleComponent />
                    <div className="card-body">
                    <div className="form-row">
                    <div className="form-group col-md-6">
                            <label htmlFor="fistname">Name<span className="text-danger font-weight-bold">*</span></label>
                            <input type="text"
                                name="firstname" 
                                className="form-control style-input" 
                                value={this.state.firstName}
                                onChange={this.Firstnamehandler} 
                                placeholder="Firstname"
                                required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastname">Username<span className="text-danger font-weight-bold">*</span></label>
                            <input type="text"
                                name="lastname" 
                                className="form-control style-input" 
                                value={this.state.lastName}
                                onChange={this.Lastnamehandler} 
                                placeholder="Username" 
                                required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email<span className="text-danger font-weight-bold">*</span></label>
                            <input type="email"
                                name="email" 
                                className="form-control style-input" 
                                value={this.state.email}
                                onChange={this.Emailhandler} 
                                placeholder="Email" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password<span className="text-danger font-weight-bold">*</span></label>
                            <input type="password"
                                name="password" 
                                className="form-control style-input" 
                                value={this.state.password}
                                onChange={this.Passwordhandler} 
                                placeholder="Password" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="confirm_password">Confirm Password<span className="text-danger font-weight-bold">*</span></label>
                            <input type="password"
                                name="confirm_password" 
                                className="form-control style-input" 
                                value={this.state.confirm_password}
                                onChange={this.ConfirmPasswordhandler} 
                                placeholder="Confirm Password" required/>
                        </div>
                    </div>
                        
                    <CampoNecesario />
                    <button type="submit" className="btn btn-outline-secondary btn-block">Sign in</button>
                    </div>
                    </div>
                </form>
            </div>
            </div>

        );
    }
}

export default LoginFormComponent;