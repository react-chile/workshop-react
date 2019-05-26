import React from 'react';
import { Link, withRouter } from 'react-router-dom'

import style from './Menu.module.css';
import logo from '../../../assets/react-chile-logo.png';


const Menu = (props) => {
  const {data, currentTime} = props;
  

  console.log('<Menu>', props)
  
  const currentPath = (path) =>{
    const current = props.location.pathname || null;
    return (path===current ? 'navbar-item is-active' : 'navbar-item');

  };

  return (

      <nav className={`${style.navbarLine} navbar is-white` } role="navigation" aria-label="main navigation">
        <div className={`navbar-brand ${style.menu} `}>
          <a className="navbar-item" href="#">
            <img src={logo} width="112" height="28" />
          </a>

          {
            data.map((item, index)=>{
              return(
                <Link 
                  key={index} 
                  to={item.url} 
                  className={ currentPath(item.url) }
                  >
                    <i className={item.ico}></i>{item.name}
                </Link>
              )
            })
          }

        </div>
        <div className="navbar-end">
        <a className={`${style.curenttime} navbar-item` } href="#">
          <h1>{currentTime}</h1>
        </a>
        
          {/* <a className="navbar-item"><i className="ion ion-md-remove-circle" style={{fontSize:'2rem', color:'#276cda'}}></i></a> */}
        </div>
        
      </nav>
  );
}

export default (withRouter)(Menu);