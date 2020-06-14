import React, { Component } from 'react';
//import {  Redirect } from 'react-router-dom';
import '../App.css';
import CardComponent from './CardProduct';

class productsComponent extends Component{
    /*constructor(props){
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
            loggedIn = false
        }

        this.state={
            loggedIn
        }
    }*/
    render(){
        /*if(this.state.loggedIn === false){
            return <Redirect to="/Login" />
        }*/
        return(
            <div className="body">
                <h1 className="mb-5 mt-4">Productos disponibles</h1>
                <CardComponent />
            </div>
        );
    }
}

export default productsComponent;