//@ts-nocheck
import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Blog from './pages/Blog';
import Details from './pages/Details';
import NewBlog from './pages/NewBlog';
import Register from './pages/auth/Register';
import Edit from './components/Edit';
import PrivateRoute from './components/PrivateRoute';
import Tags from './pages/Tags'

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
				<PrivateRoute exact path="/profile">
					<Profile />
				</PrivateRoute>
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
				<Route exact path="/new">
					<NewBlog />
				</Route>
				<Route exact path="/register">
					<Register />
				</Route>
				<PrivateRoute exact path="/:id/details/:title?">
					<Details />
				</PrivateRoute>
				<Route exact path="/:id/edit/:title?">
					<Edit />
				</Route>
				<PrivateRoute exact path="/:tagid/tags">
					<Tags />
				</PrivateRoute>
			</Switch>
		</BrowserRouter>
	);
};

export interface IAppProps { }

export default App;
