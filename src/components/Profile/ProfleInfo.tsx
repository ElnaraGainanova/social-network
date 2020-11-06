import React, {useState} from 'react';
import ProfileEditForm from "./ProfileEditForm";
import {useDispatch, useSelector} from 'react-redux';
import {updateProfileThunkCreator, uploadPhotoThunkCreator} from "../../redux/profileReducer";
import {ProfileType} from "../../common/types";
import {getProfile} from "../../redux/profile-selectors";
import ProfileData from './ProfileData';

type Props = {
    isOwner: boolean
}
let ProfileInfo:React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const profile = useSelector(getProfile)
    const uploadPhoto = (file: File) => dispatch(uploadPhotoThunkCreator(file))

    const [editMode, setEditMode] = useState(false)

    const save = (data: ProfileType) => {
        Promise.resolve(dispatch(updateProfileThunkCreator(data))).then(() => setEditMode(false))
    };

    return (
        <>
            {props.isOwner && !editMode &&
                <div>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                    <ProfileData profile={profile} isOwner={props.isOwner} uploadPhoto={uploadPhoto} />
                </div>
            }
            {editMode && <ProfileEditForm onSubmit={save} initialValues={profile} { ...profile} />}
        </>
    )
}

export default ProfileInfo;