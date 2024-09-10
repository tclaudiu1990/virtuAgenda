import React from "react";

interface FiltersProps {

}

const Filters: React.FC<FiltersProps>=(props)=>{
    return(
        <div id="filters">
            <label htmlFor="search-input"><i className="fa-solid fa-magnifying-glass"></i></label>
            <input id="search-input" type="text" placeholder="title"></input>

            <label htmlFor="select-status">Status</label>
            <select name="status" id="select-status">
                <option value='creata'>Toate</option>
                <option value='creata'>Creata</option>
                <option value='incurs'>In curs</option>
                <option value='finalizata'>Finalizata</option>
            </select>

            <label htmlFor="date-picker">Data</label>
            <input type="date"></input>
        </div>
    )
}

export default Filters;