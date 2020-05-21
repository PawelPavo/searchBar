import * as React from 'react';
import Navbah from '../components/Navbah';
import { useLocation } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';

const Profile: React.FC<IProfileProps> = () => {
    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>
            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>

        </main>
    )
}

export interface IProfileProps { }



export default Profile;
