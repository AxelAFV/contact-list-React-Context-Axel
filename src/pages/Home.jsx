import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import { getContacts } from "../services/APIservices.js";
export const Home = () => {

	const { store, dispatch } = useGlobalReducer();
	
	useEffect(()=>{
		getContacts(dispatch);
	},[]);

	return (
		<div className="container mt-5">
				{store.contacts.map(contact => {
					return (
						<li key={contact.id}><ContactCard contact= {contact} /></li>
						)
				})}
		</div>
	);
}; 