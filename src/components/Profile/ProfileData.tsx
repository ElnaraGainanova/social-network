import React, {ChangeEvent} from 'react';
import {ProfileType} from "../../common/types";
import s from "./Profile.module.css";
import notFound from "../../common/notfound.png";
import Status from "./Status";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    uploadPhoto: (file: File) => void
}
let ProfileData: React.FC<PropsType> = (props) => {
    const uploadPhoto = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files)
            props.uploadPhoto(e.target.files[0])
    }

    return (
        <>
            {props.profile.photos ?
                <img className={s.image} alt={''} src={props.profile.photos.small}/> :
                <img className={s.image} alt={''} src={notFound} />
            }
            {props.isOwner && <input type="file" onChange={uploadPhoto}/>}
            <div>{props.profile.fullName}</div>
            <Status />
        </>
    )
}

export default ProfileData