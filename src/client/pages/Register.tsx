import * as React from 'react';
import Navbah from '../components/Navbah';
import { useLocation } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';

const Register: React.FC<IRegisterProps> = () => {

    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)


    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>
            
            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>

            <section className="row my-2">
            <div className="mt-5">
               Register
            </div>
            </section>
        </main>
    )
}

export interface IRegisterProps { }

export default Register;