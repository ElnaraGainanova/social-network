import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import ProfileContacts from "./ProfileContacts";
import s from "./Profile.module.css";
import {ContactsType} from "../../common/types";

type ProfileEditFormDataType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
}
type OwnPropsType = {
    contacts: ContactsType
}
const ProfileEditFormForRedux:React.FC<InjectedFormProps<ProfileEditFormDataType, OwnPropsType> & OwnPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.error}>{props.error}</div>
            <div>
                <label>Fullname</label>
                <Field name={'fullName'} component={'input'} type={'text'} />
            </div>
            <div>
                <Field name={'lookingForAJob'} component={'input'} type={'checkbox'} />
                <label htmlFor={'lookingForAJob'}>Looking for a job?</label>
            </div>
            <div>
                <label>Your skills</label>
                <Field name={'lookingForAJobDescription'} component={'textarea'} />
            </div>
            <div>
                <label>About me</label>
                <Field name={'aboutMe'} component={'textarea'} />
            </div>
            <div>
                <ProfileContacts contacts={props.contacts}/>
            </div>
            <button onClick={props.handleSubmit}>Save</button>
        </form>
    )
}

const ProfileEditForm = reduxForm<ProfileEditFormDataType, OwnPropsType>({
    form: 'profileForm'
})(ProfileEditFormForRedux);

export default ProfileEditForm;