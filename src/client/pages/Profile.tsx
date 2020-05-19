import * as React from 'react';
import Navbah from '../components/Navbah';

const Profile: React.FC<IProfileProps> = () => {


	return (
        <main className="container">

        <Navbah />

        <section className="row my-2">
            <div className="col-12">
                <div className="card">
                    <div className="card-body text-center">
                        <h4 className="card-title">Profile</h4>
                    </div>
                </div>
            </div>
        </section>
    </main>
	)
}

export interface IProfileProps { }



export default Profile;
