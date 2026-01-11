export const getContacts = async (dispatch) => {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Axel/contacts`);
    if (!response.ok){
        createAgenda();
        return
    };
    const data = await response.json();
    console.log(data);
    dispatch({type: 'set_contact', payload: data.contacts});
};
const createAgenda = async () => {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Axel`, {
        method: 'POST'
    });
};
export const createContact = async (contact, dispatch, navigate) => {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Axel/contacts`, {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    dispatch({type: 'add_contact', payload: data.contacts});
    await getContacts(dispatch);
    navigate("/");
};
export const editContact = async (contact, dispatch, navigate) =>{
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Axel/contacts/${contact.id}`, {
        method: 'PUT',
        body: JSON.stringify(contact),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await getContacts(dispatch);
    navigate("/");
};
export const deleteContact = async (contact, dispatch) => {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Axel/contacts/${contact.id}`,{
        method: 'DELETE',
        body: JSON.stringify(contact),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    await getContacts(dispatch);
}
