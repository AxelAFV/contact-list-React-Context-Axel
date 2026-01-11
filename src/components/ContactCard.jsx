import useGlobalReducer from "../hooks/useGlobalReducer"
import { deleteContact } from "../services/APIservices"
import { Link } from "react-router-dom"

export const ContactCard = ({ contact }) => {

    const {store, dispatch} = useGlobalReducer();

    return (
            <div className="row rounded bg-light me-0 mt-3">
                <div className="col-lg-3 col-md-4 col-sm-2">
                    <img src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa7HSi10W1G387ecgCDwm36C30CYPQheMdZHxe521n0aiNeNPROEW.jpg" className="my-3 mx-auto d-block rounded-circle object-fit-cover" alt="imagen" style={{ height: '200px', width: '200px' }} />
                </div>
                <div className="col-lg-6 col-sm-8 col-md-4 mt-3">
                    <h1>{contact.name}</h1>
                    <h2><i className="fa-solid fa-envelope pe-3"></i>{contact.email}</h2>
                    <h4><i className="fa-solid fa-phone pe-3"></i>{contact.phone}</h4>
                    <h4><i className="fa-solid fa-location-pin pe-3"></i>{contact.address}</h4>
                </div>
                <div className="col-lg-3 col-sm-2 col-md-4 px-0">
                    <Link to={`/edit/${contact.id}`}>
                        <button type="button" className="btn btn-secondary mt-3 mx-5">
                            <i className="fa-solid fa-pencil"></i>
                        </button>
                    </Link>

                    <button type="button" className="btn btn-secondary mt-3 mx-" data-bs-toggle="modal" data-bs-target={`#modal-${contact.id}`}>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                    {/* <!-- Modal --> */}
                    <div className="modal fade" id={`modal-${contact.id}`} tabindex="-1" aria-labelledby={`modalLabel-${contact.id}`} aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Eliminar a {contact.name}?</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Estas seguro de querer eliminar este contacto?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" onClick={()=> deleteContact(contact, dispatch)} className="btn btn-primary" data-bs-dismiss="modal">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
);
};
