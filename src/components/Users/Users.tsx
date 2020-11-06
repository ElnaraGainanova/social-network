import React, {useEffect} from 'react';
import User from "./User";
import Pagination from "../Pagination/Pagination";
import {UserType} from '../../common/types';
import {useDispatch, useSelector} from "react-redux";
import {
    getCountOnPage,
    getCurrentPage,
    getFollowLoading,
    getIsLoading,
    getPageCount,
    getUsers
} from "../../redux/users-selectors";
import {getUsersThunkCreator, setFollowValueThunkCreator} from "../../redux/usersReducer";
import Loader from '../Loader/Loader';

type PropsType = {}
let Users: React.FC<PropsType> = (props) => {
    const users = useSelector(getUsers)
    const currentPage = useSelector(getCurrentPage)
    const countOnPage = useSelector(getCountOnPage)
    const followLoading = useSelector(getFollowLoading)
    const pageCount = useSelector(getPageCount)
    const dispatch = useDispatch()
    const isLoading = useSelector(getIsLoading)
    const follow = (userId: number) => dispatch(setFollowValueThunkCreator(userId))

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, countOnPage))
    }, [])

    const onPageChanged = (page:number) => {
        if(page !== currentPage)
            dispatch(getUsersThunkCreator(page, countOnPage))
    }
    let items = users.map((i:UserType) => <User key={i.id} user={i} follow={follow} followLoading={followLoading} />)

    if(isLoading) return <Loader />
    return (
        <>
            <Pagination getPage={onPageChanged}
                pageCount={pageCount}
                currentPage={currentPage} />
            <div>
                {items}
            </div>
        </>
    );
}

export default Users;