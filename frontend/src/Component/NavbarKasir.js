import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class NavbarKasir extends React.Component {
    out = () => {
        if (window.confirm("Are you sure to logout?")) {
         window.location = '/login'
         localStorage.removeItem("name");
         localStorage.removeItem("user");
         localStorage.removeItem("token");
         localStorage.removeItem("id");
         localStorage.removeItem("role");
         localStorage.removeItem("id_user");
         localStorage.removeItem("id_transaksi");
         localStorage.removeItem("id_outlet");
        }
       }
    render(){
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-0" bg="dark" variant="dark">
                  <div className="container-fluid">
                      <NavLink className="navbar-brand fs-4" to="/">
                        <p className="btn ms-2"></p>
                          <img src="https://img.freepik.com/free-vector/laundry-clean-fresh-design-logo_187482-555.jpg?w=2000" width={150}></img>
                      </NavLink>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                 
                              </li>
                              
                          </ul>
                          <div className="buttons">
                          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/">Home</NavLink>
                              </li>
                              
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/member">Member</NavLink>
                              </li>
                              <li className="nav-item">
                                  <NavLink className="nav-link" to="/transaksi">Transaksi</NavLink>
                              </li>
                              <a className="btn ms-2" onClick={() => this.out()}>Logout</a>
                          </ul>
                                
                          </div>
                      </div>
                  </div>
              </nav>
      </div>
    );
    }
  }
  
  export default NavbarKasir;