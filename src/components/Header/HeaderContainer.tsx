import React from 'react';
import { useDispatch } from 'react-redux';
import Header from "./Header";
import {logoutThunkCreator} from "../../redux/authReducer";

type Props = {}
const HeaderContainer:React.FC<Props> = () => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logoutThunkCreator())
    }
    return (
        <Header logout={logout} />
    )
}
export default HeaderContainer