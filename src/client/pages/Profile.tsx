import * as React from 'react';
import Navbah from '../components/Navbah';
import { useLocation, useHistory } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';
import { useEffect } from 'react';



const Profile: React.FC<IProfileProps> = () => {
    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const history = useHistory()

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role !== 'guest') {
            history.push({ pathname: '/login', state: { msg: 'You must be logged in to see this page' } })
        } else {

        }
    }, [])

    return (
        <>
            <main className="container ">
                <Helmet>
                    <title>{navbarText}</title>
                </Helmet>
                <Navbah />
                <h2 className="text-center my-4 text-muted">{navbarText}</h2>
            </main>
        </>
    )
}

export interface IProfileProps { }



export default Profile;
