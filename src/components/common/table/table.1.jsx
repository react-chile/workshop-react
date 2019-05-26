import React from 'react';
import { Link } from 'react-router-dom';

const Table= (props) => {
    const data = props.data || [];

    return(
        <table className="table is-fullwidth is-striped">
            <thead>
                <th>Cliente</th>
                <th>Solicitado</th>
                <th>Servicio</th>
                <th>.</th>
            </thead>
            <tbody>
            {
                data.map((item, index)=>{
                    return(
                        <tr key={index}>
                            <td width="40%">{item.clientName}</td>
                            <td width="20%">{item.date}</td>
                            <td width="30%">{item.servicesName}</td>
                            <td width="10%">
                                <Link  
                                    to={{
                                        pathname: `/orders/${item.clientId}`,
                                        query:{...item}
                                        }}
                                    className="button is-small is-primary"
                                    >Editar
                                </Link>
                            </td>
                        </tr>
                    )
                }
            )}

            </tbody>
        </table>
    );
}

export default Table;