import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';


const Loader: React.FC<LoaderPropes> = () => {

    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        let showTimer = setTimeout (()=> setShow(true), 1000);
        return () => {
            clearTimeout(showTimer);
        };
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center h-50">
            {show && <Spinner style={{height:`100px`, width:`100px`}} animation="border" variant="primary"/>}
        </div>
    );
};

interface LoaderPropes {}

export default Loader;