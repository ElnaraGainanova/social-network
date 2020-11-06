import React from 'react'
import s from './Header.module.css'
import {NavLink} from "react-router-dom"
import {useSelector} from "react-redux";
import {getIsAuth} from "../../redux/auth-selectors";

type PropsType = {
    logout: () => void
}
let Header:React.FC<PropsType> = (props) => {
    const isAuth = useSelector(getIsAuth)
    return (
        <div className={s.header}>
            {isAuth ?
                <span onClick={props.logout}>Выйти</span> :
                <NavLink to='/login'>Авторизоваться</NavLink>}
        </div>
    );

}

export default Header;