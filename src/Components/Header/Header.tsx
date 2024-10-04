import { useContext, useEffect, useState } from 'react';
import agenda from './../../assets/img/agenda.png'
import { AppContext } from '../../App';
import useSettings from '../../hooks/useSettings';


// Header containing the logo and application name
const Header = () =>{

    const appContext = useContext(AppContext);
    

    return(
        <div id="header">
            <h1><img src={agenda} className="logo" />{appContext?.appTitle}</h1>
            <span onClick={()=>appContext?.openSettings()}><i className="fa-solid fa-gear"></i></span>
        </div>
    )
}

export default Header;