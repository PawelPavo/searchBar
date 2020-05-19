import * as React from 'react';
import Navbah from '../components/Navbah';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'



const Donate: React.FC<IDonateProps> = props => {

    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<string>('10');
    const elements = useElements();
    const stripe = useStripe();
    const history = useHistory();

    const handleDonate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            let cardNumber = elements.getElement(CardNumberElement);
            let { token } = await stripe.createToken(cardNumber, { name })
            await fetch ('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({token, amount})
            })
            //put sweet alert
            history.push('/');
            console.log(token)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className="container">
            <Navbah />

            <div className="row justify-content-center mt-5">
                Please enter donation amount
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-md-3">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
                        </div>
                        <input
                            type="text"
                            className="form-control text-center"
                            aria-label="Amount (to the nearest dollar)"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="card card-2 mb-3 shadow">
                    <img src="https://www.bostonnorthcompany.com/wp-content/uploads/2014/04/slider-background-blue.jpg"
                        className="card-img-top card card-2" alt="image" />
                    <div className="card-img-overlay">
                        <div className="row no-gutters">
                            <div className="col-md-8">
                                <div className="card-title my-3 mx-3">
                                    <img
                                        src={'/chip.png'}
                                        className="card-item__chip"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <div className="col border-0">
                                <CardNumberElement
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="row mx-auto my-3">
                            <div className="col-8">
                                <input
                                    placeholder="First Last"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    type="text"
                                    className="form-control my-1"
                                />
                            </div>
                            <div className="col-4">
                                <CardExpiryElement className="form-control my-1" />
                                <CardCvcElement className="form-control mt-3" />
                            </div>
                        </div>
                        <div className="col-4 mx-auto">
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 justify-content-center">
                <div className="alert alert-dark">
                    Please click the "Dontate" button to make a donation in the amount of $<span>{amount}.00</span>.
            </div>
            </div>
            <button onClick={handleDonate} className="btn btn-outline-primary btn-block w-25 mx-auto shadow mt-3">Donate!</button>

        </main>
    )
}

export interface IDonateProps { }

export default Donate;
