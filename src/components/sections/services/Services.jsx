/* eslint-disable no-lone-blocks */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Breadcrumb from '../../common/breadcrumb/Breadcrumb';
import WelcomeBox from '../../common/welcomeBox/WelcomeBox';
import InfoDashboard from '../../common/infoDashboard/infoDashboard';
import Table from '../../common/table/table';
import CardEvents from '../../common/cardEvents/CardEvents';

import {dataServices} from '../../../constants/dataMock';

const dataBreadcrumb = [
  { 'name': 'Servicios', 'url': '/services','isSelected':true },
];

class Services extends Component {
  state = {
    response: '',
    totalRecords: 0,
  };

  componentDidMount() {
    this.callApi()
      .then(res => {
        const count= _.countBy(res,{});

        const rows= res.map((item)=>{
          return { 
            Id: item.id,
            Nombre: item.name,
          }
        });
        const columns = ['Id', 'Nombre']

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
    const response = await fetch('/api/services/');
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
              title='Servicios prestados'
              subTitle=''
              color='is-danger'
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

export default Services


 {/* <Button
                              onClick={(event) => props.action.onClick(event, props.data)}
                              color="primary"
                              variant="contained"
                              style={{textTransform: 'none'}}
                              size="small"
                            >
                              My Button
                            </Button> */}