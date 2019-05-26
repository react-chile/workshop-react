import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import WelcomeBox from '../../common/welcomeBox/WelcomeBox';
import InfoDashboard from '../../common/infoDashboard/infoDashboard';
import Table from '../../common/table/table';
import CardEvents from '../../common/cardEvents/CardEvents';

const dataBreadcrumb = [
    { 'name': 'Dashboard', 'url': '/', 'isSelected':true, },
  ];
  
class Home extends Component {
  state = {
    dataRows: [],
    dataColumns: [],
    totalOrders: 0,
    totalServices:0
  };

  componentDidMount() {
    // this.callApiServices();
    // this.callApi();

    this.getLocalStorage();

    
  }

  getLocalStorage=()=>{
    if (typeof(Storage) !== 'undefined') {
     
      const dataRows = localStorage.getItem('dataRows');
      const dataColumns = localStorage.getItem('dataColumns');
      const totalOrders= localStorage.getItem('totalOrders');
      const totalServices = localStorage.getItem('totalServices');

      this.setState({ 
        dataRows: JSON.parse(dataRows), 
        dataColumns: JSON.parse(dataColumns), 
        totalOrders: JSON.parse(totalOrders),
        totalServices: JSON.parse(totalServices)
      });

    }
  };

  setLocalStorage=(name, value)=>{
    

    if (typeof(Storage) !== 'undefined') {
    
      localStorage.setItem(name, value);
      localStorage.Workshop = 'React-Chile';

    }
  };


  callApi = async () => {
    const response = await fetch('/api/orders/');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    const count= _.countBy(body,{});

    const rows= body.map((item)=>{
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
      totalOrders: count.true,
    });
    this.setLocalStorage('dataRows', JSON.stringify(rows));
    this.setLocalStorage('dataColumns', JSON.stringify(columns));
    this.setLocalStorage('totalOrders', count.true);
  };

  callApiServices = async() =>{
    const response = await fetch('/api/services/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    const count= _.countBy(body,{});
    this.setState({ 
      totalServices: count.true 
    });
    this.setLocalStorage('totalServices', count.true);
    return body;
  };

  render() {
    const {dataColumns, dataRows, totalOrders, totalServices} = this.state;
// console.log(this.state)
    return (
        <Fragment>
        {/* <code>{JSON.stringify(this.state)}</code> */}
        <div className="columns">
          <div className="column is-12">
            
            <Breadcrumb data={dataBreadcrumb}/>
            
            <WelcomeBox
              title='Bienvenido Juanin Jan Jarri'
              subTitle='Que tengas un excelente día!'
            />

            <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">

                <InfoDashboard 
                  title={totalOrders}
                  subTitle="Ordenes abiertas"
                />
                <InfoDashboard 
                  title={totalServices}
                  subTitle="Servicios"
                />
              
              </div>
            </section>

            
          </div>
        </div>
            
        <div className="columns">
            <div className="column is-12">
                
              <CardEvents totalOrders={totalOrders}>
                <Table 
                  dataColumns={dataColumns} 
                  dataRows={dataRows}
                  routeReturn={'/'}  
                />
              </CardEvents>
            
            </div>
        </div>
        </Fragment>
  
  
    );
  }
}

export default Home;
