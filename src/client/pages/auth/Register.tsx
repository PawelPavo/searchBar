import * as React from 'react';
import Navbah from '../../components/Navbah';
import { useLocation } from 'react-router-dom';
import { getPathText } from '../../utils/pathing';
import { Helmet } from 'react-helmet';

const Register: React.FC<IRegisterProps> = () => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const register = () => {
        console.log('Registered!!')
    };

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
                                value={null}
                                onChange={null}
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
                                value={null}
                                onChange={null}
                                type="password"
                                name='password'
                                className="form-control"
                                placeholder="Your password"
                                autoComplete="current-password" />
                        </div>
                        <div className="row">
                            <div onClick={register} className="btn btn-outline-primary block w-50 mx-auto">Register!</div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export interface IRegisterProps { }

export default Register;