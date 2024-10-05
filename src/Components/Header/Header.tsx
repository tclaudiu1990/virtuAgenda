import { useContext } from 'react';
import agenda from './../../assets/img/agenda.png'
import { AppContext } from '../../App';


// Header containing the logo and application name
const Header = () =>{

    const appContext = useContext(AppContext);
    

    return(
        <div id="header">
            <div className='header-contents'
                 onClick={()=>appContext?.openSettings()}
            >
                <h1><img src={agenda} className="logo" />{appContext?.appTitle}</h1>
                <span className='header-edit-btn'
                    onClick={()=>appContext?.openSettings()}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </div>
            
        </div>
    )
}

export default Header;