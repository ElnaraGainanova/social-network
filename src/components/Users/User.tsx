import React from 'react';
import s from './Users.module.css';
import {UserType} from "../../common/types";

type PropsType = {
    user: UserType
    follow: (id:number) => void
    followLoading: Array<number>
}
let User:React.FC<PropsType> = (props) => {
    let follow = () => {
        props.follow(props.user.id);
    }
    return (
        <div className={s.user}>
            <div className={s.imgBlock}>
                <img alt={""} className={s.imgBlock} src={props.user.photos.small || props.user.photos.large} />
                {!props.user.photos.small && !props.user.photos.large && <img alt={""} className={s.imgBlock} src='../../common/notfound.png' />}
            </div>
            <div className={s.description}>
                <p className={s.name}>{props.user.name}</p>
                <button disabled={props.followLoading.some(id => id === props.user.id)} className={s.button} onClick={follow}>
                    {props.user.followed ? 'Отписаться' : 'Подписаться'}
                </button>
            </div>
        </div>
    );
}

export default User;