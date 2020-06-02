import * as React from 'react';
import Navbah from '../../components/Navbah';
import { useLocation } from 'react-router-dom';
import { getPathText } from '../../utils/pathing';
import { Helmet } from 'react-helmet';

const Register: React.FC<IRegisterProps> = (props) => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const [values, setValues] = React.useState<{ [key: string]: string }>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    };

    const handleRegister = async () => {
        const res = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (res.ok) {
            const info = await res.json();
            localStorage.setItem('token', info.token);
            localStorage.setItem('role', info.role);
        }
    }

    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>

            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>

            <div className="row justify-content-center">
                <div className="col-md-6 shadow">
                    <form>
                        <div className="form-group">
                            <label >Email address</label>
                            <input
                                value={values.email || ''}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Example@email.com"
                                autoComplete="email" />
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <input
                                value={values.password}
                                onChange={handleChange}
                                type="password"
                                name='password'
                                className="form-control"
                                placeholder="Your password"
                                autoComplete="current-password" />
                        </div>
                        <div className="row">
                            <div onClick={handleRegister} className="btn btn-outline-primary block w-50 mx-auto">Register!</div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export interface IRegisterProps { }

export default Register;