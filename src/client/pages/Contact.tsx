import * as React from 'react';
import Navbah from '../components/Navbah';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getPathText } from '../utils/pathing';
import { Helmet } from 'react-helmet';

const Contact: React.FC<IContactProps> = () => {

	const { pathname } = useLocation()
	const navbarText = getPathText(pathname)

	let history = useHistory();
	
	const [email, setEmail] = useState<string>('')
	const [subject, setSubject] = useState<string>('')
	const [message, setMessage] = useState<string>('')

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email,
					subject,
					message
				}),
			})
			setEmail(''),
				setSubject(''),
				setMessage('')
			history.push('/');
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<main className="container">
			<Helmet>
				<title>{navbarText}</title>
			</Helmet>

			<Navbah />

			<h2 className="text-center my-4 text-muted">{navbarText}</h2>

			<p className="text-center mx-auto mb-3">Do you have any questions? Please do not hesitate to contact me directly. I will get back to you as soon as I can.</p>

			<div className="row justify-content-center">
				<div className="col-md-8">
					<form className="form-group mt-5 rounded-lg p-3 shadow bg-light"
						onSubmit={onSubmit}>
						<input
							type="text"
							className="input-group my-1 p-1 border border-right-0 border-left-0 border-top-0 bg-light border-primary w-75 mx-auto"
							placeholder="Email"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
							style={{ opacity: 0.5 }}
						/>
						<input
							type="text"
							className="input-group my-1 p-1 border border-top-0 border-left-0 border-right-0 bg-light my-5 border-primary w-75 mx-auto"
							placeholder="Subject"
							value={subject}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
							style={{ opacity: 0.5 }}
						/>
						<input
							type="text"
							className="input-group my-1 p-1 border border-top-0 border-left-0 border-right-0 bg-light my-5 border-primary w-75 mx-auto"
							placeholder="Message"
							value={message}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
							style={{ opacity: 0.5 }}
						/>
						<div className="row justify-content-center">
							<button className="btn btn-block btn-outline-primary mt-2 shoadow w-50">Email Me!</button>
						</div>
					</form>
				</div>

			</div>
		</main>
	);
}

export interface IContactProps {
	email?: string;
	subject?: string;
	message?: string;
}

export default Contact;