import * as React from 'react';
import Navbah from '../components/Navbah';
import Iframe from 'react-iframe'
import { useLocation } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';

const Home: React.FC<IHomeProps> = () => {
    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    return (
        <main className="container">
            <Helmet>
                <title>{navbarText}</title>
            </Helmet>
            <Navbah />
            <h2 className="text-center my-4 text-muted">{navbarText}</h2>

            <div className="row justify-content-center">

                <iframe
                className="border-primary rounded-lg"
                    width="861"
                    height="434"
                    src="https://www.youtube.com/embed/q2NyXHjdCVY?list=PL0hCd0t2dv5Gfl5yR7Q6gCwHu-XR5ASOU"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                   >
                    </iframe>
            </div>
        </main>
    )
}

export interface IHomeProps { }



export default Home;
