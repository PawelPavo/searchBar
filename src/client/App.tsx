//@ts-nocheck
import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Donate from './pages/Donate'
import Blog from './pages/Blog'


const stripePromise = loadStripe('pk_test_MRMivgTfwcT3UfCgH8aCjiqW00AHT65rhC');

const App: React.FC<IAppProps> = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/profile">
					<Profile />
				</Route>
				<Route exact path="/contact">
					<Contact />
				</Route>
				<Route exact path="/donate">
					<Elements stripe={stripePromise}>
						<Donate />
					</Elements>
				</Route>
				<Route exact path="/blog">
					<Blog />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export interface IAppProps { }

export default App;
