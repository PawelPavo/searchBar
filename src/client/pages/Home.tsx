import * as React from 'react';
import Navbah from '../components/Navbah';

const Home: React.FC<IHomeProps> = () => {

    return (
        <main className="container">

            <Navbah />

            <section className="row my-2">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body text-center">
                            <h4 className="card-title">Home</h4>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export interface IHomeProps { }



export default Home;
