import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Loader from "../Loader/Loader";
import {compose} from "redux";
import withAuthorize from "../../hoc/withAuthorize";
import {getIsLoading} from "../../redux/profile-selectors";
import ProfileInfo from "./ProfleInfo";
import {useHistory} from "react-router-dom";
import {getCurrentUserId} from "../../redux/auth-selectors";
import {setProfileThunkCreator} from '../../redux/profileReducer';

type Props = {}
const ProfileContainer:React.FC<Props> = (props) => {
    const isLoading = useSelector(getIsLoading)
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUserId = useSelector(getCurrentUserId)
    const pathnameArray = history.location.pathname.split('/')
    const userId = pathnameArray.length === 3 ? pathnameArray[2] : currentUserId
    const isOwner = currentUserId === userId

    useEffect(() => {
        dispatch(setProfileThunkCreator(userId))
    }, [userId])

    if(isLoading) {
        return <Loader />;
    }
    return <ProfileInfo isOwner={isOwner} />;
}

export default compose<React.ComponentType>(
    withAuthorize
)(ProfileContainer)