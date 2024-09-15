
import agenda from './../../assets/img/agenda.png'

const Header = () =>{
    return(
        <div id="header">
            <h1><img src={agenda} className="logo" />VirtuAgenda</h1>
        </div>
    )
}

export default Header;