
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import WelcomeBox from '../../common/welcomeBox/WelcomeBox';
import InfoDashboard from '../../common/infoDashboard/infoDashboard';
import Table from '../../common/table/table';
import CardEvents from '../../common/cardEvents/CardEvents';

const dataBreadcrumb = [
  { 'name': 'Ordenes', 'url': '/orders','isSelected':false },
  { 'name': 'Detalle', 'url': '','isSelected':true },
];

class OrdersDetail extends Component {

  render() {
    console.log(this.props);
    const { match:{params} } = this.props;

    return (
      <Fragment>
      <Breadcrumb data={dataBreadcrumb}/>
        <section className="hero is-dark">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Detalle Servicio</h1>
              <h2 className="subtitle">Nº{params.number}</h2>
              
            </div>
          </div>
        </section>

        <div className="card">
  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <p className="title is-4">NOMBRE SERVICIOS</p>
      </div>
    </div>

    <div className="content">
      
      <br/><br/>
      <Link  
        to='/orders' 
        className="button is-small is-primary"
        >Volver
      </Link>
    </div>
  </div>
</div>
      </Fragment>
    );
  }
}

export default OrdersDetail;
