import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Token } from '../utils/api-services';
import Loader from './Loader';


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {

    const [auth, setAuth] = React.useState(false)
    const [checking, setChecking] = React.useState(true)



    React.useEffect (() => {
        const token = localStorage.getItem('token');
        (async () => {
            const res = await fetch ('/auth/token', {
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            });
            if (res.ok) {
                setAuth(true);
                setChecking(false);
            } else {
                setChecking(false);
                // setTimeout(() => setChecking(false), 3000)
            }
        })();
    }, []);

    if(checking){
        return <Loader />
    }

    if (auth) {
        return (
            <Route {...rest}>
                {children}
            </Route>
        );
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { msg: 'You must be logged in to view this page.' }
                }}
            />
        );
    }
};

interface PrivateRouteProps {
    exact: boolean;
    path: string;
    component: any;
}

export default PrivateRoute;