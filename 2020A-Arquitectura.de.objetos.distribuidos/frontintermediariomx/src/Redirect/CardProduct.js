import React, { Component } from 'react';
import '../App.css';

class cardProduct extends Component {
    render(){
        return(
            <div className="container-fluid">
                <div className="card-deck">
                    <div className="card text-white bg-dark" >
                        <img className="card-img-top" src="..." alt="A product" style={{height: "180px", width: "100%", display: "block"}}></img>
                        <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Light card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                     </div>
                    <div className="card text-white bg-dark" >
                    <img className="card-img-top" src="..." alt="A product" style={{height: "180px", width: "100%", display: "block"}}></img>
                        <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Light card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                     </div>
                    <div className="card text-white bg-dark" >
                    <img className="card-img-top" src="..." alt="A product" style={{height: "180px", width: "100%", display: "block"}}></img>
                        <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Light card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className="card-deck mt-5">
                    <div className="card text-white bg-dark" >
                        <img className="card-img-top" src="..." alt="A product" style={{height: "180px", width: "100%", display: "block"}}></img>
                        <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Light card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                     </div>
                    <div className="card text-white bg-dark" >
                    <img className="card-img-top" src="..." alt="A product" style={{height: "180px", width: "100%", display: "block"}}></img>
                        <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Light card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                     </div>
                    <div className="card text-white bg-dark" >
                    <img className="card-img-top" src="..." alt="A product" style={{height: "180px", width: "100%", display: "block"}}></img>
                        <div className="card-header">Header</div>
                            <div className="card-body">
                            <h5 className="card-title">Light card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default cardProduct;