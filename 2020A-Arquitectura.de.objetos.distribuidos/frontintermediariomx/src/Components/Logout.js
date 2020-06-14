import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class logoutComponent extends Component {
    constructor(props){
        super(props);
        this.state={
          redirect: false
        }
        this.logout = this.logout.bind(this);
      }
      componentDidMount(){
        if (localStorage.removeItem("token")){
        }
        else{
          this.setState({
            redirect: true
          });
        }
      }
      logout(){
        localStorage.setItem("token");
        localStorage.clear();
        this.setState({
          redirect: true
        });
      }
    render() {
        if(this.state.redirect){
            return(
              <Redirect to={'/Home'} />
            )
          }
        return(
            <div></div>
        );
    }
}

export default logoutComponent;