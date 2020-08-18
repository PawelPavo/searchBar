import * as React from 'react';
import Navbah from '../../components/Navbah';
import { useLocation, useHistory } from 'react-router-dom';
import { getPathText } from '../../utils/pathing';
import { Helmet } from 'react-helmet';
import { setStorage } from '../../utils/api-services';

const Register: React.FC<IRegisterProps> = (props) => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const [values, setValues] = React.useState<{ [key: string]: string }>({});
    const history = useHistory();


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
            setStorage(info.token, info.role)
            history.push('/profile')
        }
    }

    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>
            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>
            <div className="col-md-8 text-center border border-primary login-image-col mx-auto">
                <img src="assets/Register-Avatar.jpeg" className="rounded-circle img-thumbnail border-primary avatar-login-image border" alt="Register Avatar" height="200" width="200" />
                <form className="col-md-8 mx-auto">
                    <div className="form-group pt-3">
                        <input
                            value={values.email || ''}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email address"
                        />
                        <small id="emailHelp" className="form-text text-muted text-left">We'll never share your email with anyone else.</small>
                    </div>
                    <input
                            value={values.username || ''}
                            onChange={handleChange}
                            type="email"
                            name="username"
                            className="form-control"
                            placeholder="User Name"
                        />
                    <div className="form-group">
                        <input
                            value={values.password || ''}
                            onChange={handleChange}
                            type="password"
                            name='password'
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <div className="row">
                        <div onClick={handleRegister} className="btn btn-outline-primary block w-50 mx-auto">Register!</div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export interface IRegisterProps { }

export default Register;