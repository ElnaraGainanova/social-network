import React from "react";
import {Field} from "redux-form";
import {ContactsType} from "../../common/types";

type ContactItemType = {
    contact: string
}
let ContactItem: React.FC<ContactItemType> = ({contact}) => {
    return (
        <div>
            {contact} <Field name={'contacts.' + contact} component={'input'}></Field>
        </div>
    )
}
type ProfileContactsType = {
    contacts: ContactsType
}
let ProfileContacts: React.FC<ProfileContactsType> = ({contacts}) => {
    const elements = Object.keys(contacts).map(i => <ContactItem key={i} contact={i} />)
    return (
        <>
            <div>contacts:</div>
            <div>{elements}</div>
        </>
    )
}

export default ProfileContacts;