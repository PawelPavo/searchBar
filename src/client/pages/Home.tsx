import * as React from 'react';
import Navbah from '../components/Navbah';
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
            <Helmet>
                <script data-config="//config.playwire.com/1006036/videos/v2/3652711/zeus.json?preview=true" data-height="50%" data-width="50%" src="//cdn.playwire.com/bolt/js/zeus/embed.js" type="text/javascript"></script>

            </Helmet>

            <h2 className="text-center my-4 text-muted">{navbarText}</h2>
            <h1>Auth Part 1 ...</h1>
            <div className="row justify-content-center">
                <iframe
                    className="border-primary rounded-lg"
                    width="861"
                    height="434"
                    src="https://www.youtube.com/embed/JPoekuiYhOw?list=PL0hCd0t2dv5Gfl5yR7Q6gCwHu-XR5ASOU"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
            <h1>Auth Part 2 ...</h1>
            <div className="row justify-content-center">
                <iframe
                    width="861"
                    height="434"
                    src="https://www.youtube.com/embed/Rp-R3sl1Z0Q?list=PL0hCd0t2dv5Gfl5yR7Q6gCwHu-XR5ASOU"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
            <h1>Auth Part 3 ...</h1>
            <div className="row justify-content-center">
                <iframe
                    className="border-primary rounded-lg"
                    width="861"
                    height="434"
                    src="https://www.youtube.com/embed/VO9fOU8pkzs?list=PL0hCd0t2dv5Gfl5yR7Q6gCwHu-XR5ASOU"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
            {/* <h1>Playwire</h1>
            <div className="row justify-content-center">
                <iframe
                    className="border-primary rounded-lg"
                    width="861"
                    height="434">
                    <script
                        data-config="//config.playwire.com/1006036/videos/v2/3652711/zeus.json?preview=true"
                        data-height="50%"
                        data-width="50%"
                        src="//cdn.playwire.com/bolt/js/zeus/embed.js"
                        type="text/javascript">
                    </script>
                </iframe>
            </div> */}
        </main>

    )
}

export interface IHomeProps { }



export default Home;
