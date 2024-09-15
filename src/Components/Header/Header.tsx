import agenda from './../../assets/img/agenda.png'

// Header containing the logo and application name
const Header = () =>{
    return(
        <div id="header">
            <h1><img src={agenda} className="logo" />VirtuAgenda</h1>
        </div>
    )
}

export default Header;