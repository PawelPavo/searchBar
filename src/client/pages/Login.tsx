import * as React from 'react';
import Navbah from '../components/Navbah';
import { useLocation } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';

const Login: React.FC<ILoginProps> = () => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const login = () => {
        console.log('test')
    };

    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>
            
            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>

            <section className="row my-2">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body text-center">
                            <button
                                className="btn btn-primary btn-block"
                                onClick={login}
                            > Login </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export interface ILoginProps { }



export default Login;
