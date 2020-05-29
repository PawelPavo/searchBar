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
                    className="border-primary rounded-lg"
                    width="861"
                    height="434"
                    src="https://www.youtube.com/embed/VO9fOU8pkzs?list=PL0hCd0t2dv5Gfl5yR7Q6gCwHu-XR5ASOU"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
            <blockquote
                className="reddit-card"
                data-card-created="1590177891">
                <a href="https://www.reddit.com/r/reactjs/comments/goncj8/what_is_the_best_free_database_for_projects_for_a/"> What is the best free database for projects for a broke college student?</a>from <a href="http://www.reddit.com/r/reactjs">r/reactjs</a></blockquote>

        </main>

    )
}

export interface IHomeProps { }



export default Home;
