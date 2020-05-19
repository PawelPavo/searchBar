import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbah: React.FC<NavbahProps> = (props) => {
    const [show, setShow] = React.useState(false);
    const [query, setQuery] = React.useState('')

    return (
        <>
            <section className="row my-2">
                <div className="col-12">
                    <nav className="nav justify-content-around p-3 border-bottom border-secondary">
                        <NavLink exact to="/" activeClassName="text-secondary"> Home  </NavLink>
                        <NavLink exact to="/profile" activeClassName="text-secondary"> Profile </NavLink>
                        <NavLink exact to="/blog" activeClassName="text-secondary"> Blog </NavLink>
                        <NavLink exact to="/contact" activeClassName="text-secondary">  Contact Me </NavLink>
                        <NavLink exact to="/donate" activeClassName="text-secondary">  Donate  </NavLink>
                        <NavLink exact to="/login" activeClassName="text-secondary"> Login </NavLink>

                        <span onClick={() => setShow(!show)} className="text-success"> Search </span>
                    </nav>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className={`px-2 border rounded-bottom border-top-0 search-bar ${show ? 'search-bar search-bar-active' : ''}`}
                        placeholder="Search"
                    />
                </div>
            </section>
        </>
    )
}

interface NavbahProps { }

export default Navbah;
