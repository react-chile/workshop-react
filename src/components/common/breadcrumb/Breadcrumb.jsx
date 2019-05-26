import React from 'react';


const Breadcrumb = (props) => {
  const {data} = props;

  return (

    <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
        {
          data.map((item, index)=>{
            return(
              <li key={index} className={ item.isSelected ? 'is-active':null}><a href={item.url}>{item.name}</a></li>
            )
          })
        }

            {/* <li><a href="../">Bulma</a></li>
            <li><a href="../">Templates</a></li>
            <li><a href="../">Examples</a></li>
            <li className="is-active"><a href="#" aria-current="page">Admin</a></li>
             */}
        </ul>
    </nav>
  
  );
}

export default Breadcrumb;
