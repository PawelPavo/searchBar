import * as React from 'react';
import Navbah from '../components/Navbah';
import FoodCard from '../components/FoodCard';
import { useLocation, useHistory } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { IFood, IUser } from '../utils/interfaces';
import { Token } from '../utils/api-services'

const Food: React.FC<IFoodProps> = () => {


    const { pathname } = useLocation()
    const navbarText = getPathText(pathname)
    const history = useHistory()
    const [user, setUser] = useState<IUser>({});

    useEffect(() => {
        const role = localStorage.getItem('role')
        if (role !== 'guest') {
            history.push({ pathname: '/login', state: { msg: 'You must be logged in to see this page' } })
        } else {
            (async () => {
                try {
                    let res = await fetch(`/auth/profile/`, {
                        headers: { 'Authorization': 'Bearer ' + Token }
                    });
                    let user = await res.json();
                    setUser(user)
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    }, [])

    const [food, setFood] = useState<any>('')
    const [allFoods, setAllFoods] = useState<IFood>([])
    const [arrayOfFood2, setArrayOfFood2] = useState<IFood>([])

    const getFood = async () => {
        try {
            let res = await fetch(`/api/searchFood/${food}`);
            let allFoods = await res.json()
            setAllFoods(allFoods)
            const arrayOfFood = allFoods.results
            setArrayOfFood2(arrayOfFood)
            setFood('')
        } catch (error) {
            console.log({ error: 'Unable to get foods' })
        }
    }
    return (
        <>
            <main className="container">
                <Helmet>
                    <title>{navbarText}</title>
                </Helmet>
                <Navbah />
                <h2 className="text-center my-4 text-muted">{navbarText}</h2>
                <div className="input-group mb-3 mt-5">
                    <input
                        className="form-control"
                        placeholder="Enter Food"
                        aria-describedby="button-addon2"
                        value={food}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFood(e.target.value)} />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={getFood}
                            id="button-addon2">Button</button>
                    </div>
                </div>
                <div className="row justify-content-center" id="test">
                    {arrayOfFood2.map((food: IFood) => (
                        <FoodCard key={`blog-${food.id}`} food={food} />
                    ))}
                </div>
            </main>
        </>
    )
}

export interface IFoodProps { }
export default Food;
