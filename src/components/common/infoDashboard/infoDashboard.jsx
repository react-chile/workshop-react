import React from 'react';


const InfoDashboard = (props) => {
    const {title, subTitle } = props;

    return(
        <div className="tile is-parent">
            <article className="tile is-child box">
                <p className="title">{title}</p>
                <p className="subtitle">{subTitle}</p>
            </article>
        </div>
    )
    
};

export default InfoDashboard;