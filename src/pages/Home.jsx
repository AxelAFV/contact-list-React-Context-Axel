import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard.jsx";
import { getContacts } from "../services/APIservices.js";
export const Home = () => {

	const { store, dispatch } = useGlobalReducer();
	
	useEffect(()=>{
		getContacts(dispatch);
	},[]);
	// el error en consola de tabIndex es un error de typeo de Id con react creo. Pero para el modal en especifico al cambiar todos los "id" por tabIndex no me funciono el modal.
	// Otro error que consegui es que al inicio cuando la Lista esta vacia, al crear el primer contacto se duplica, estuve buscando la razon y no logre dar con ello, IM SO SORRY!
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