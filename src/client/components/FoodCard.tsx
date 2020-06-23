import * as React from 'react';
import { IFood } from '../utils/interfaces';
import { Link } from 'react-router-dom';

const FoodCard: React.SFC<FoodCardProps> = ({ food }) => {

    return (
        <>
            <div className="col-md-8" id="food">
                <div className="media border mb-3">
                    <img src={food.image} className="rounded float-left" width="128" height="128" />
                    <div className="media-body">
                        <h5 className="mt-0">{food.title}</h5>
                        <Link target="_blank" to={{ pathname: null }} className="btn btn-primary stretched-link">{food.id}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

interface FoodCardProps {
    food: IFood
}

export default FoodCard