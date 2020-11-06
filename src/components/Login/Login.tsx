import React from "react"
import s from './Login.module.css'
import {emailValidation, required} from "../../common/form/validators"
import {LoginFormDataType} from "../../common/types"
import {Field, Formik} from "formik"
import {Form, Input, SubmitButton} from 'formik-antd'
import {useDispatch, useSelector} from "react-redux"
import {getCaptchaUrl} from "../../redux/auth-selectors";
import { loginThunkCreator } from "../../redux/authReducer"

type OwnPropsType = {
    email: string
    password: string
    rememberMe: boolean
    captchaUrl: string | undefined
    onSubmit: (data:LoginFormDataType) => void
}
let FormLogin:React.FC<LoginFormDataType & OwnPropsType> = ({onSubmit, ...props}) => {
    const initialValues: LoginFormDataType = {
        captchaUrl: undefined,
        email: '',
        password: '',
        rememberMe: false
    }
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>
                <Field name={'email'} type={'email'} placeholder={'Логин'} validate={[required, emailValidation]}/>
                <Input name={'password'} type={'password'} placeholder={'Пароль'} />
                {props.captchaUrl && <img alt='' className={s.captchaImg} src={props.captchaUrl} />}
                {props.captchaUrl && <Field name={'captchaUrl'} component={'input'} placeholder={'Введите текст с картинки'} validate={required}/>}
                <SubmitButton type="primary">Login</SubmitButton>
                {/*<button type={'submit'} className={s.button}>Авторизоваться</button>*/}
            </Form>
        </Formik>
    )
}

type LoginType = {}
let Login: React.FC<LoginType> = (props) => {
    const dispatch = useDispatch()
    const captchaUrl = useSelector(getCaptchaUrl)
    let login = (data:LoginFormDataType) => {
        dispatch(loginThunkCreator(data))
    }

    return (
        <div className={s.login}>
            <FormLogin onSubmit={login} captchaUrl={captchaUrl} email={''} password={''} rememberMe={false}></FormLogin>
        </div>
    );
}

export default Login;