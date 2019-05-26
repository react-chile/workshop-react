import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import style from './OrdersDetail.module.css';

const dataBreadcrumb = [
  { 'name': 'Ordenes', 'url': '/orders','isSelected':false },
  { 'name': 'Detalle', 'url': '/ordersDetail','isSelected':true },
];

class OrdersDetail extends Component {
  state = {
     isEdit:false
  };

  changeStatus=()=>{
    const status = !this.state.isEdit;
    
    this.setState({ 
      isEdit: status
    });
  }

  render() {
    const { location:{ query } }= this.props;
    const {Id, Nombre, Descripción,Servicio,Ingresado, routeReturn} = {...query};
  

    return (
      <Fragment>
        <Breadcrumb data={dataBreadcrumb}/>
          <section className="hero is-dark">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">Detalle Orden</h1>
                <h2 className="subtitle">Nº{Id}</h2>

              </div>
            </div>
          </section>

          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">CLIENTE: {Nombre}</p>
                  <p className="subtitle is-6">{}</p>
                </div>
            </div>

            <div className="content">
              <br/><b>TAREA:</b> 
              <br/> 
              {
                this.state.isEdit ? 
                  <input className="input" type="text" placeholder="Text input" value={Descripción}/>
                  : Descripción
              }
              <br/><b>SERVICIO:</b> 
              <br/>
              {
                this.state.isEdit ? 
                  <input className="input" type="text" placeholder="Text input" value={Servicio}/>
                  : Servicio
              }
              <br/><b>Solicitado por :</b>
              <br/>
              {
                this.state.isEdit ? 
                  <input className="input" type="text" placeholder="Text input" value={Ingresado}/>
                  : Ingresado
              }
              <br/>
              
              
              <br/><br/>
              <Link  
                to={routeReturn}
                className={`button is-primary ${style.button}`} 
                >Volver
              </Link>
              {
                this.state.isEdit ? 
                  <a className={`button is-link ${style.button}`} onClick={this.changeStatus}>Grabar</a>
                  : <a className={`button is-dark ${style.button}`} onClick={this.changeStatus}>Editar</a>
              }

              
              <a className={`button is-danger ${style.button}`}>Eliminar</a>
            
              </div>
            </div>
          </div>

      </Fragment>
    );
  }
}

export default OrdersDetail;
