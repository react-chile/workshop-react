import React from 'react';
import { Link } from 'react-router-dom';

const Table= (props) => {
    const dataColumns = props.dataColumns || [];
    const dataRows = props.dataRows || [];
    const {routeReturn} = props;
    
    const tableHeaders = (
        <thead>
            <tr key='RC001'>
            {dataColumns.map(function(column, index) {
                return <th key={index}>{
                    column === 'button'? 
                    ''
                    :column
                }</th>; })}
            </tr>
        </thead>
    );
    
    const tableBody = dataRows.map((row, index)=> {
    return (
      <tr key={index}>
        {dataColumns.map((column, index)=> {
          return <td key={index}>{row[column] === 'button'?
            <Link  
                to={{
                    pathname: `/orders/${row.Id}`,
                    query:{...row, routeReturn}
                    }}
                className="button is-small is-primary"
                >Editar
            </Link>
            :row[column]
           }</td>
          })}
      </tr>); });


    return(
        <table width="100%">
            {tableHeaders}
            <tbody>
                {tableBody}
            </tbody>
        </table>
    );
}

export default Table;