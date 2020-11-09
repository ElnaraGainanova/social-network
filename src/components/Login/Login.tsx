import React from "react"
import s from './Login.module.css'
import {emailValidation, required} from "../../common/form/validators"
import {LoginFormDataType} from "../../common/types"
import {Field, Formik, FormikHelpers, FormikProps} from "formik"
import {Form, Input, SubmitButton} from 'formik-antd'
import {useDispatch, useSelector} from "react-redux"
import {getCaptchaUrl} from "../../redux/auth-selectors";
import {loginThunkCreator} from "../../redux/authReducer"

type OwnPropsType = {
    captchaUrl: string | undefined
    onSubmit: (data:LoginFormDataType, actions: FormikHelpers<LoginFormDataType>) => void
}

let FormLogin:React.FC<OwnPropsType> = ({onSubmit, ...props}) => {
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
type ActionsType = {
    setSubmitting: (v: boolean) => void
    setErrors: (v: Array<string>) => void
}
let Login: React.FC<LoginType> = (props) => {
    const dispatch = useDispatch()
    const captchaUrl = useSelector(getCaptchaUrl)
    let login = (data:LoginFormDataType, actions: FormikHelpers<LoginFormDataType>) => {
        dispatch(loginThunkCreator(data, actions))
    }

    return (
        <div className={s.login}>
            <FormLogin onSubmit={login} captchaUrl={captchaUrl}></FormLogin>
        </div>
    );
}

export default Login;