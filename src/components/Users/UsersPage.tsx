import React from 'react';
import Users from "./Users";
import s from './Users.module.css';
import {useSelector} from 'react-redux';
import Loader from "../Loader/Loader";
import {getIsLoading} from "../../redux/users-selectors";

type Props = {}
const UsersPage: React.FC<Props> = (props) => {
    const isLoading = useSelector(getIsLoading)
    return (
        <>
            {isLoading ?
                <div className={s.loader}><Loader /></div> :
                <Users { ...props} />
            }
        </>
    )
}
export default UsersPage