import {stopSubmit} from "redux-form";
import {api} from "../api/api";
import {PhotosType, ProfileType} from "../common/types";
import {BaseThunkType, InferedActionsType} from "./reduxStore";

const SET_PROFILE = 'profileReducer/SET-PROFILE';
const SET_STATUS = 'profileReducer/SET-STATUS';
const SET_PROFILE_LOADING = 'profileReducer/SET-PROFILE-LOADING';
const SAVE_PROFILE_PHOTOS = 'profileReducer/SAVE_PROFILE_PHOTOS';

let initialState = {
    profile: {} as ProfileType,
    status: null as string | null,
    isLoading: false as boolean
}

let profileReducer = (state:initialStateType = initialState, action: any):initialStateType => {
    switch(action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_PROFILE_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SAVE_PROFILE_PHOTOS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state;
    }
}

let actions = {
    setProfile: (profile:ProfileType) => ({type: SET_PROFILE, profile: profile} as const),
    setStatus: (status:string) => ({type: SET_STATUS, status: status} as const),
    setProfileLoading: (isLoading:boolean) => ({type: SET_PROFILE_LOADING, isLoading: isLoading} as const),
    saveProfilePhoto: (photos:PhotosType) => ({type: SAVE_PROFILE_PHOTOS, photos: photos} as const)
}

export let setProfileThunkCreator = (userId:number):ThunkType<void> => async (dispatch) => {
    dispatch(actions.setProfileLoading(true));
    try {
        const profile = await api.profileAPI.getProfile(userId);
        dispatch(actions.setProfile(profile));
    } catch(err) {
        console.log('err!!!!!!!!!!!!!!!!!!!!!');
        console.log(err);
    }
    dispatch(actions.setProfileLoading(false));
}

export let getStatusThunkCreator = (userId:number):ThunkType<void> => async (dispatch) => {
    const status = await api.profileAPI.getStatus(userId);
    dispatch(actions.setStatus(status.data));
}

export let updateStatusThunkCreator = (status:string):ThunkType<void> => async (dispatch) => {
    const responce = await api.profileAPI.updateStatus(status);
    if(0 === responce.resultCode) {
        dispatch(actions.setStatus(status));
    }
}
export let updateProfileThunkCreator = (profile:ProfileType): ThunkType<Promise<boolean>> => async (dispatch, getState) => {
    const userId = getState().auth.user.userId
    const responce = await api.profileAPI.update(profile);
    if(0 === responce.resultCode && userId) {
        dispatch(setProfileThunkCreator(userId));
        return Promise.resolve(true)
    } else {
        dispatch(stopSubmit('profileForm', {_error: responce.messages[0]}))
        return Promise.reject(responce.messages[0])
    }
}

export let uploadPhotoThunkCreator = (photo:File):ThunkType<void> => async (dispatch, getState) => {
    //const userId = getState().auth.user.userId
    const responce = await api.profileAPI.uploadPhoto(photo);
    if(0 === responce.resultCode) {
        dispatch(actions.saveProfilePhoto(responce.data));
    } else {
        dispatch(stopSubmit('profileForm', {_error: responce.messages[0]}))
    }
}

export default profileReducer;

type initialStateType = typeof initialState
type ActionsType = InferedActionsType<typeof actions>
type ThunkType<P> = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>, P>