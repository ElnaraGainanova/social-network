import {api} from "../api/api";
import {stopSubmit} from "redux-form";
import {BaseThunkType} from "./reduxStore";
import {LoginFormDataType} from "../common/types";
import {FormikHelpers} from "formik";

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const LOGOUT = 'authReducer/LOGOUT';
const SET_CAPTCHA_URL = 'authReducer/SET_CAPTCHA_URL';

type userType = {
    userId: number | null
    email: string | null
    login: string | null
}

type initialStateType = {
    user: userType
    captchaUrl: string | null
    isAuth: boolean
    isLoading: boolean
    initialized: boolean
}
let initialState:initialStateType = {
    user: {
        userId: null,
        email: null,
        login: null
    },
    captchaUrl: null,
    isAuth: false,
    isLoading: false,
    initialized: false
};

type ActionsType = setUserDataType | logoutType | setCaptchaUrlType
let authReducer = (state = initialState, action:ActionsType):initialStateType => {
    switch(action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                initialized: true,
                user: {
                    userId: action.userId,
                    email: action.email,
                    login: action.login
                },
                isAuth: action.userId ? true: false
            };
        case LOGOUT:
            return {
                ...state,
                user: {
                    userId: null,
                    email: null,
                    login: null
                },
                isAuth: false
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
}

export default authReducer;

type setUserDataType = {
    type: typeof SET_USER_DATA
    userId: number | null
    email: string | null
    login: string | null
}
let setUserData = (userId:number | null, email:string | null, login:string | null):setUserDataType => ({type: SET_USER_DATA, userId: userId, email: email, login: login});

type logoutType = {
    type: typeof LOGOUT
}
let logout = ():logoutType => ({type: LOGOUT});

type setCaptchaUrlType = {
    type: typeof SET_CAPTCHA_URL
    captchaUrl: string
}
let setCaptchaUrl = (captchaUrl:string):setCaptchaUrlType => ({type: SET_CAPTCHA_URL, captchaUrl: captchaUrl});

export let loginThunkCreator = (formData: LoginFormDataType, actions: FormikHelpers<LoginFormDataType>):ThunkType => async (dispatch) => {
    actions.setSubmitting(true)
    const responce = await api.authAPI.login(formData)
    actions.setSubmitting(false)
    if(0 === responce.resultCode) {
        dispatch(setUserData(responce.data.userId, formData.email, 'test'))
    } else {
        actions.setErrors({email: responce.messages[0]})
        //console.log();
        if(10 === responce.resultCode) {
            const responceCaptcha = await api.sequrity.getCaptcha()
            dispatch(setCaptchaUrl(responceCaptcha.url))
        }
        dispatch(stopSubmit('login', {_error: responce.messages[0]}))
    }
}

export let authMeThunkCreator = ():ThunkType => async (dispatch) => {
    const responce = await api.authAPI.authMe()
    if(0 === responce.resultCode) {
        dispatch(setUserData(responce.data.id, responce.data.email, responce.data.login));
    } else {
        dispatch(setUserData(null, null, null));
    }
}

export let logoutThunkCreator = ():ThunkType => async (dispatch) => {
    const responce = await api.authAPI.logout();
    if(0 === responce.resultCode) {
        dispatch(logout());
    }
}

type ThunkType = BaseThunkType<ActionsType>;