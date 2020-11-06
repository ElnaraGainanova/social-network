import React from "react";
import Login from "./Login";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getIsAuth} from "../../redux/auth-selectors";

type Props = {}
const LoginContainer:React.FC<Props> = (props) => {
    const isAuth = useSelector(getIsAuth)

    return (
        <div>
            {!isAuth ?
                <Login /> :
                <Redirect to="/profile" />}
        </div>
    )
}

export default LoginContainer