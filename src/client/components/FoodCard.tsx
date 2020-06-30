import * as React from 'react';
import { IFood } from '../utils/interfaces';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FoodCard: React.SFC<FoodCardProps> = ({ food, }) => {

    const [instructions, setinstructions] = useState<any[]>([])

    // const getFood = async () => {
    //     try {
    //         let res = await fetch(`https://api.spoonacular.com/recipes/${food.id}/information/?`
    //         let instructions = (info.analyzedInstructions[0].steps)
    //         setinstructions(instructions)
    //         console.log(info)
    //         console.log(instructions)
    //     } catch (error) {
    //         console.log({ error: 'Unable to get foods' })
    //     }
    // }

    return (
        <>
            <div className="col-md-8" id="food">
                <div className="media border mb-3">
                    <img src={`https://spoonacular.com/recipeImages/${food.id}-90x90.jpg`} className="rounded float-left" width="128" height="128" />
                    <div className="media-body">
                        <h5 className="mt-0">{food.title}</h5>
                        {/* <Link target="_blank" to={{ pathname: null }} className="btn btn-primary stretched-link">{food.id}</Link> */}
                        {/* <button onClick={getFood}className="btn btn-outline-secondary">Cooking Instructions</button> */}
                        <p>{food.image}</p>
                    </div>
                </div>
                {/* <p>{instructions}</p> */}
                <div className="row justify-content-center">
                    {instructions.map(instructions => (
                        <div key ={Math.random()}className="text-center">
                            <p>{instructions.number}:</p>
                            <p>{instructions.step}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


interface FoodCardProps {
    food: IFood;
}

export default FoodCard