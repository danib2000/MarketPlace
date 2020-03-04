import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import SignPage from './logIn/logIn';




class Navbar extends Component {
    constructor(props)
    {
        super(props);
        //this.createProduct = this.props.createProduct.bind(this)

    }
  render() {
    return (
       
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link" createProduct={this.props.createProduct}> Home </Link></li> 
                    <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
                    <li><Link to={'/about'} className="nav-link">About</Link></li>
                </ul>
                <div><SignPage /></div>
            </nav>
        </div>
        
        
    );
  }
}

export default Navbar;