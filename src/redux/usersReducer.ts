import {api} from "../api/api"
import {UserType} from "../common/types"
import {BaseThunkType, InferedActionsType} from "./reduxStore"

const SET_USERS = 'USERS/SET-USERS'
const SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE'
const SET_LOADING = 'USERS/SET-LOADING'
const SET_FOLLOW_LOADING = 'USERS/SET-FOLLOW-LOADING'
const SET_FOLLOW_VALUE = 'USERS/SET-FOLLOW-VALUE'

let initialState = {
    users: [] as Array<UserType>,
    currentPage: null as number | null,
    countOnPage: 10 as number,
    pageCount: null as number | null,
    isLoading: false as boolean,
    followLoading: [] as Array<number>
}

let usersReducer = (state:initialStateType = initialState, action: ActionsType):initialStateType => {
    switch(action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
                pageCount: Math.ceil(action.totalCount/state.countOnPage)
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_FOLLOW_VALUE:
            return {
                ...state,
                users: state.users.map(i => {
                    if(i.id === action.userId) i.followed = !i.followed;
                    return i;
                })
            }
        case SET_FOLLOW_LOADING:
            return {
                ...state,
                followLoading: action.isLoading ?
                    [...state.followLoading, action.userId] :
                    state.followLoading.filter(i => i !== action.userId)
            }
        default:
            return state
    }
}
let actions = {
    setCurrentPage: (currentPage:number) => ({type: SET_CURRENT_PAGE, currentPage: currentPage} as const),
    setLoading: (isLoading:boolean) => ({type: SET_LOADING, isLoading: isLoading} as const),
    setFollowLoading: (userId: number, isLoading: boolean) => ({type: SET_FOLLOW_LOADING, userId: userId, isLoading: isLoading} as const),
    setFollowValue: (userId: number) => ({type: SET_FOLLOW_VALUE, userId: userId} as const),
    setUsers: (users:Array<UserType>, totalCount:number) => ({type: SET_USERS, users: users, totalCount: totalCount} as const)
}

export let getUsersThunkCreator = (currentPage: number, count: number):BaseThunkType<ActionsType> => async (dispatch) => {
    dispatch(actions.setLoading(true))
    const responce = await api.userAPI.getUsers(currentPage, count)
    dispatch(actions.setLoading(false))
    dispatch(actions.setUsers(responce.items, responce.totalCount))
    dispatch(actions.setCurrentPage(currentPage))
}

export let setFollowValueThunkCreator = (userId: number):BaseThunkType<ActionsType> => async (dispatch) => {
    dispatch(actions.setFollowLoading(userId,true))
    await api.userAPI.follow(userId)
    dispatch(actions.setFollowLoading(userId, false))
    dispatch(actions.setFollowValue(userId))
}
export default usersReducer

type initialStateType = typeof initialState
type ActionsType = InferedActionsType<typeof actions>