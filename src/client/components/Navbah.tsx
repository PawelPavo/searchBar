import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { logout } from '../utils/api-services';
import { FaSearch, } from 'react-icons/fa';


const Navbah: React.FC<NavbahProps> = (props) => {
    const [show, setShow] = React.useState(false);
    const [query, setQuery] = React.useState('')
    const [login, setLogin] = React.useState('Login')
    const [loginTextColor, setLoginTextColor] = React.useState('text-primary')

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role !== 'guest') {
            setLogin('Login')
            setLoginTextColor('text-primary border border-primary px-1 rounded')
        } else {
            setLogin('Logout')
            setLoginTextColor('text-danger border border-danger px-1 font-italic rounded shadow-sm')
        }
    }, [])

    const handleclick = () => {
        const role = localStorage.getItem('role')
        if (role === 'guest') {
            logout()
        }
    }

    return (
        <>
            <section className="row my-2 mobile-nav">
                <div className="col-12">
                    <nav className="nav justify-content-around p-3 border-bottom border-secondary">
                        <NavLink exact to="/" activeClassName="text-warning"> Home  </NavLink>
                        <NavLink exact to="/profile" activeClassName="text-warning"> Profile </NavLink>
                        <NavLink exact to="/blog" activeClassName="text-warning"> Blogs </NavLink>
                        <NavLink exact to="/contact" activeClassName="text-warning">  Contact Me </NavLink>
                        <NavLink exact to="/donate" activeClassName="text-warning">  Donate  </NavLink>
                        <NavLink onClick={handleclick} exact to="/login" className={loginTextColor} activeClassName="text-primary"> {login} </NavLink>
                        <span onClick={() => setShow(!show)} className="text-primary mt-1"> <FaSearch /> </span>
                    </nav>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className={`px-2 border rounded-bottom border-top-0 search-bar ${show ? 'search-bar search-bar-active' : ''}`}
                        placeholder="Search"
                    />
                </div>
            </section>
            <div data-pw-desk="leaderboard_atf"
                data-pw-mobi="leaderboard_atf">
            </div>
        </>
    )
}

interface NavbahProps { }

export default Navbah;
