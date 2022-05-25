import React from 'react'
import "./dashboard.css"
import Navbar from './Navbar';
import NavbarKasir from './NavbarKasir';
import NavbarOwner  from './NavbarOwner';

class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
          token: "",
          username: "",
          userId: 0,
          role: ""
        }
    
        if (localStorage.getItem('token')) {
          // if (localStorage.getItem('role') === "admin") {
            this.state.role = localStorage.getItem('role')
            this.state.token = localStorage.getItem('token')
            this.state.username = localStorage.getItem('name')
          // }else{
          //   window.alert("You are not an admin")
          //   window.location = '/login'
          // }
        } 
        else {
          window.location = "/login"
        }
    
      }

    render(){
        return(
            <>
            {this.state.role == "kasir" &&
                                    <NavbarKasir />
                                }
            {this.state.role == "owner" &&
                                    <NavbarOwner />
                                }
                                {this.state.role == "admin" &&
                                    <Navbar />
                                }
            <div className="dashboard ms-5"><br></br><br></br>
                    <br></br><br></br><br></br><br></br><br></br>
                    <p className='welcome-admin'>Selamat Datang  <br></br>Laundry App {this.state.username}</p>
                    <p className='Desc-header'>Anda login sebagai {this.state.role}</p>
            </div>
            </>
            
        )
    }
}

export default Dashboard;