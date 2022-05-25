import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from './Dashboard';
import Paket from './Paket';
import Outlet from './Outlet';
import Transaksi from './Transaksi';
import Laporan from './Laporan';
import Member from './Member';
import User from './User';
import Login from './Login';
import Choosemember from './Choosemember';
import Cart from './Cart';
import Detail_transaksi from './Detail_transaksi';


const Utama = () => (
    
    <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route path="/paket" component={Paket} />
        <Route path="/outlet" component={Outlet} />
        <Route path="/transaksi" component={Transaksi} />
        <Route path="/laporan" component={Laporan} />
        <Route path="/member" component={Member} />
        <Route path="/user" component={User} />
        <Route path="/choosemember" component={Choosemember} />
        <Route path="/cart" component={Cart} />
        <Route path="/detail_transaksi/" component={Detail_transaksi} />
        
    </Switch>
)

export default Utama;