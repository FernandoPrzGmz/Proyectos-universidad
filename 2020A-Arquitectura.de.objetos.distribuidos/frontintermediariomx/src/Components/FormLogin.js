import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TitleComponent from './TitleLoginForm';
import '../App.css';
//import CampoNecesario from './CampoNecesario';
import Axios from 'axios';


class LoginFormComponent extends Component {
    //metodo constructor para los datos que se usan en el registro
    constructor(props){
        super(props)
        //let loggedIn = false
        this.state ={
            email: "",
            password: "",
            loggedIn: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    //funcion para hacer reset al formulario 
    handleSubmit = (event) => {
        //login
        if(this.state.email && this.state.password){
            event.preventDefault()
            this.setState({
                loggedIn: true
            })
        }

        Axios.post('https://aod-intermediario.herokuapp.com/api/v1/user/login', this.state)
        .then((response) => {
            console.log(response);
            localStorage.setItem("token", response.data.result)
        }, (error) => {
            console.log(error);
        })
    }
    //funcion para que el component del constructur 
    //cambie cuando se intente registrar nuevamente
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
    //en el metodo render se encuentra el formulario con las 
    //funciones handler y valuacion con los datos del constructor
    render(){
        if(this.state.loggedIn){
            return <Redirect to="/Productos" />
        }
        if (localStorage.getItem("token")){
            return <Redirect to="/Productos" />
        }
        return (
            <div className="col-md-6 offset-md-3">
            <div className="Center-card" >
                <form onSubmit={this.handleSubmit}>
                    <div className="card Center-component content">
                    <TitleComponent />
                    <div className="card-body">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                name="email" 
                                className="form-control style-input" 
                                value={this.state.email}
                                onChange={this.Emailhandler} 
                                placeholder="Email" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                name="password" 
                                className="form-control style-input" 
                                value={this.state.password}
                                onChange={this.Passwordhandler} 
                                placeholder="Password" required/>
                        </div>

                    </div>
                        

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