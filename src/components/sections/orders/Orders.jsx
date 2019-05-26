import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import WelcomeBox from '../../common/welcomeBox/WelcomeBox';
import Table from '../../common/table/table';
import CardEvents from '../../common/cardEvents/CardEvents';

const dataBreadcrumb = [
  { 'name': 'Ordenes', 'url': '/orders','isSelected':true },
];



class Orders extends Component {
  state = {
    dataRows: [],
    dataColumns: [],
    totalRecords: 0,
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        const count= _.countBy(res,{});

        const rows= res.map((item)=>{
          return { 
            Id: item.clientId,
            Nombre: item.clientName,
            Descripción: item.descrip,
            Servicio: item.servicesName,
            Ingresado: item.usersName,
            button: 'button'
          }
        });
        const columns = ['Id', 'Nombre', 'Descripción', 'Servicio','Ingresado','button']

        this.setState({ 
          dataRows: rows, 
          dataColumns: columns, 
          totalRecords: count.true 
        });

      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api/orders/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };


  render() {
    const {dataColumns, dataRows, totalRecords, routeReturn} = this.state;
    return (
      <Fragment>
        <div className="columns">
          <div className="column is-12">
            
            <Breadcrumb data={dataBreadcrumb}/>
            <WelcomeBox
              title='Ordenes de trabajo recibidas'
              subTitle=''
              color='is-primary'
            />

            <div className="columns">
              <div className="column is-12">
                  
                  <CardEvents totalRecords={totalRecords}>
                      <Table 
                        dataColumns={dataColumns} 
                        dataRows={dataRows}
                        routeReturn={'/orders'}  
                      />
                  </CardEvents>
              
              </div>
            </div>
           

            
          </div>
        </div>
            
      </Fragment>
    );
  }
}

export default Orders;
