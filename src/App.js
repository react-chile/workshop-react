import React from 'react';
import style from './App.module.css';
import Menu from './components/common/menu/Menu';
import Breadcrumb from './components/common/breadcrumb/Breadcrumb';
import WelcomeBox from './components/common/welcomeBox/WelcomeBox';
import InfoDashboard from './components/common/infoDashboard/infoDashboard';
import Table from './components/common/table/table';
import CardEvents from './components/common/cardEvents/CardEvents';
import {dataMenu} from './constants/dataMock';


const dataBreadcrumb = [
  { 'name': 'Dashboard', 'url': '/', 'isSelected':false, },
  { 'name': 'Ordenes', 'url': '/ordenes','isSelected':true },
];

function App() {
  return (
    <div className={style.container}>
    
      <Menu data={dataMenu}/>

      <div className={`container ${style.borderBlue} ` }>
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
                  title="59"
                  subTitle="Ordenes abiertas"
                />
                <InfoDashboard 
                  title="59"
                  subTitle="Servicios"
                />
              
              </div>
            </section>

            
          </div>
        </div>
            
          <div className="columns">
            <div className="column is-12">
             
            <CardEvents>
              <Table />
            </CardEvents>
            
            </div>
          </div>
        </div>
  
  
    </div>
  );
}

export default App;
