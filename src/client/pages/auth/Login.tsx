import * as React from 'react';
import Navbah from '../../components/Navbah';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { getPathText } from '../../utils/pathing';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { setStorage } from '../../utils/api-services';

const Login: React.FC<ILoginProps> = () => {
    const { state, pathname } = useLocation<{ msg: string }>();
    const history = useHistory();
    const navbarText = getPathText(pathname)
    const [error, setError] = React.useState<string>('')
    const [values, setValues] = useState<{ [key: string]: string }>({
        email: 'NewEmail@newEmail.com',
        password: 'NewPassword'
    })
    useEffect(() => {
        setError(state?.msg)
    }, [])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const login = async () => {
        const res = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if (res.ok) {
            const info = await res.json();
            setStorage(info.token, info.role)
            if (state?.msg) {
                history.goBack()
            } else {
                history.push('/profile')
            }
        }
    };

    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>

            <Navbah />
            <h2 className="text-center mt-4 text-muted">{navbarText}</h2>
            <div className="col-md-8 text-center border border-primary login-image-col mx-auto">
                <img src="assets/Login-Avatar.jpeg" className="rounded-circle img-thumbnail border-primary avatar-login-image border" alt="Login Avatar" height="200" width="200" />
                <form className="col-md-8 mx-auto">
                    <div className="form-group pt-3">
                        <input
                            value={values.email}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Example@email.com"
                            autoComplete="email" />
                    </div>
                    <div className="form-group">
                        <input
                            value={values.password || ''}
                            onChange={handleChange}
                            type="password"
                            name='password'
                            className="form-control"
                            placeholder="Your password"
                            autoComplete="current-password" />
                    </div>
                    <div className="row pb-3">
                        <div onClick={login} className="btn btn-outline-primary block w-50 mx-auto">Login!</div>
                    </div>
                    <small className="text-muted">Not a Member?</small> <Link to="/register" className="font-weight-light">Create an Account</Link>
                </form>
                {
                    error && <div className="alert alert-warning text-center" role="alert">
                        {error}
                    </div>
                }
            </div >

        </main >
    )
}

export interface ILoginProps { }



export default Login;
