import { useEffect, useState } from "react";
import { createContact, editContact } from "../services/APIservices";
import { useNavigate, useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Formulario = () => {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const {store, dispatch} = useGlobalReducer();
    const [alerta, setAlerta] = useState(false);
    const [isEditing, setIsEditing]= useState(false);

    const [contact, setContact] = useState({
		"name": "",
		"phone": "",
		"email": "",
		"address": ""
	});
    const handleInputChange =(e)=>{
        setContact({...contact,
            [e.target.name]: e.target.value
        })
    };
    const handleSubmit = (e) =>{
        e.preventDefault()
        if (!contact.name||!contact.phone||!contact.email||!contact.address){
            setAlerta(true)
            setInterval(() => {
                setAlerta(false)
            }, 3000);
            return;
        }
        if (isEditing){
            return editContact(contact, dispatch, navigate)
        }
         createContact(contact, dispatch, navigate);  
    };
    const contactToEdit = () =>{
        const contactFinded = store.contacts.find(contact =>{
            return contact.id === Number(id)
        });
        setContact(contactFinded);
    };

    useEffect(()=>{
        if (id){
            setIsEditing(true)
            contactToEdit()
        }else{
            setIsEditing(false)
        };}, [])

    return (
        <form onSubmit={(e)=> handleSubmit(e)}>
                <div className="col-3 pt-5 ps-5 mx-auto text-center">
                    <h1>{isEditing ? `Edita a ${contact.name}` : "Agrega un contacto"}</h1>
                    <>{alerta? <h4 className="text-danger">los campos son obligatorios!</h4>: false}</>
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" name="name" value={contact.name} className="form-control" onChange={(e)=> handleInputChange(e)} />
                    <div id="nameHelp" className="form-text">We'll never share your name with Platano Maduro.</div>
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
                    <input type="text" name="phone" value={contact.phone} className="form-control"  onChange={(e)=>handleInputChange(e)}/>
                    <div id="phoneHelp" className="form-text">We'll never share your phone with Platano Maduro.</div>
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" value={contact.email} className="form-control" onChange={(e)=>handleInputChange(e)}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with SEBIN.</div>
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="exampleInputAdress" className="form-label">Address</label>
                    <input type="text" name="address" value={contact.address} className="form-control" onChange={(e)=>handleInputChange(e)} />
                    <div id="addressHelp" className="form-text">We'll never share your address with SEBIN.</div>
                </div>
                <div className="d-grid mx-auto">
                    <button type="submit" className="btn btn-primary mx-5">Submit</button>
                </div>
                <div className="mx-5">
                  <Link to="/">
                  or get back to contacts.
                  </Link>
                </div>
        </form>
    )
}