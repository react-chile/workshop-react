import React from 'react';
import { Link } from 'react-router-dom';

import style from './NoMatch.module.css';

const NoMatch= (props)=> {
    return(
        <div id="notfound">
            <div className={style.notfound}>
                <div className={style.notfound404}>
                    <h1>404</h1>
                </div>
                <h2>Oops, La página no ha sido encontrada!</h2>
                <Link  
                to='/' 
                className={style.arrow}
                >Volver al Home
              </Link>

            </div>
	    </div>
    )
};

export default NoMatch;