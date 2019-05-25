import React from 'react';
import style from './App.module.css';
import logo from './assets/react-chile-logo.png';
function App() {
  return (
    <div className={style.container}>
      {/* NAVABR */}
      <nav className={`${style.navbarLine} navbar is-white` } role="navigation" aria-label="main navigation">
        <div className={`navbar-brand ${style.menu} `}>
          <a className="navbar-item" href="https://bulma.io">
            <img src={logo} width="112" height="28" />
          </a>

          <a className="navbar-item is-active"><i className="ion ion-md-home"></i>Inicio</a>
          <a className="navbar-item"><i className="ion ion-md-text"></i>Ordenes</a>
          <a className="navbar-item"><i className="ion ion-md-list-box"></i>Servicios</a>

        </div>
        
      </nav>

      <div className={`container ${style.borderBlue} ` }>
        <div className="columns">
          <div className="column is-12">
            
            {/* BREADCRUM */}
            <nav className="breadcrumb" aria-label="breadcrumbs">
              <ul>
                  <li><a href="../">Bulma</a></li>
                  <li><a href="../">Templates</a></li>
                  <li><a href="../">Examples</a></li>
                  <li className="is-active"><a href="#" aria-current="page">Admin</a></li>
              </ul>
            </nav>
            
            {/* BIENVENIDA */}
            <section className={`hero is-info welcome is-small ${style.cuadroBienvenida} ` }>
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                Bienvenido, Juan Carlos Bodoque.
                            </h1>
                            <h2 className="subtitle">
                                Que tenga un gran día!
                            </h2>
                        </div>
                    </div>
              </section>

            {/* RESUMEN */}
            <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
                  <div className="tile is-parent">
                      <article className="tile is-child box">
                          <p className="title">439k</p>
                          <p className="subtitle">Ordenes</p>
                      </article>
                  </div>
                  <div className="tile is-parent">
                      <article className="tile is-child box">
                          <p className="title">59k</p>
                          <p className="subtitle">Servicios</p>
                      </article>
                  </div>
              </div>
            </section>


            
          </div>
        </div>
            
            {/* TABLE */}
          <div className="columns">
            <div className="column is-12">
              <div className="card events-card">

                <header className="card-header">
                    <p className="card-header-title">Últimas Ordenes</p>
                    <a href="#" className="card-header-icon" aria-label="more options">
                        <span className="icon">
                        <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </a>
                </header>

                <div className="card-table">
                  <div className="content">
                  <table className="table is-fullwidth is-striped">
                    <tbody>
                        <tr>
                            <td width="5%"><i className="fa fa-bell-o"></i></td>
                            <td>Lorum ipsum dolem aire</td>
                            <td><a className="button is-small is-primary" href="#">Editar</a></td>
                        </tr>
                        <tr>
                            <td width="5%"><i className="fa fa-bell-o"></i></td>
                            <td>Lorum ipsum dolem aire</td>
                            <td><a className="button is-small is-primary" href="#">Editar</a></td>
                        </tr>
                        <tr>
                            <td width="5%"><i className="fa fa-bell-o"></i></td>
                            <td>Lorum ipsum dolem aire</td>
                            <td><a className="button is-small is-primary" href="#">Editar</a></td>
                        </tr>
                        <tr>
                            <td width="5%"><i className="fa fa-bell-o"></i></td>
                            <td>Lorum ipsum dolem aire</td>
                            <td><a className="button is-small is-primary" href="#">Editar</a></td>
                        </tr>  
                      </tbody>
                    </table>
                  </div>
                </div>

                <footer className="card-footer">
                    <a href="#" className="card-footer-item">View All</a>
                </footer>

              </div>
            </div>
          </div>
        </div>
  
  
    </div>
  );
}

export default App;
