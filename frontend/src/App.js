import React from 'react';
import Utama from './Component/Utama';
import {Link} from 'react-router-dom';
import pay from './pay.png';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCreditCard, faFileLines, faHamburger, faFish, faBarsStaggered, faWallet, faUserGroup, faUserGraduate, faDollarSign, faBriefcase, faBarsProgress } from '@fortawesome/free-solid-svg-icons'

class App extends React.Component {
    render(){
    return (
      <div>
        <p><Utama /></p>
      </div>
    );
    }
  }
  
  export default App;