import * as React from 'react';
import Navbah from '../components/Navbah';

const Login: React.FC<ILoginProps> = () => {


    const login = () => {
        console.log('test')
    };

    return (
        <main className="container">

            <Navbah />

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
