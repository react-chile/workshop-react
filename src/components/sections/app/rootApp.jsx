/* eslint-disable no-lone-blocks */

import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import style from './rootApp.module.css';
import Menu from '../../common/menu/Menu';

// Pages
import NoMatch from '../../common/errors/NoMatch';
import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import Home from '../home/Home';
import Orders from '../orders/Orders';
import OrdersDetail from '../orders/OrdersDetail';

import Services from '../services/Services';
import ServicesDetail from '../services/servicesDetail';

import {dataMenu} from '../../../constants/dataMock.js';


class App extends Component {
    state={
        time : new Date().toLocaleTimeString()
    }



    tick() 
    { 
        this.setState({ 
            time : new Date().toLocaleTimeString()
        }); 
    } 

    componentDidMount() 
    { 
      // Se invoca justo después de que el componente se monta en el DOM
      // Despúes del Render()
        console.log("1.- componentDidMount()"); 
        console.log("---------------------------------"); 
        this.timer = setInterval( 
          () => this.tick(), 
          1000); 
       
    } 


    render() {

        console.log(this.props);

        return (
            <div className={style.container}>
                <BrowserRouter>
                    <Menu data={dataMenu} currentTime={this.state.time}/>
                        <div className={`container ${style.borderBlue} ` }>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/orders' component={Orders} />
                                <Route path='/orders/:number' component={OrdersDetail} />

                                <Route exact path='/services' component={Services} />
                                <Route exact path='/services/:number' component={ServicesDetail} />
                                <Route path="*" component={NoMatch} /> 
                            </Switch>
                        </div>
                </BrowserRouter>
            </div>
        );

    }

    componentWillUnmount() 
    { 
        clearInterval(this.timer); 
    }
    
}

export default App;
