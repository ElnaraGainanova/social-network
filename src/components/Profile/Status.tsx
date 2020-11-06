import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {statusInput} from "../../common/form/formControls";
import {updateStatusThunkCreator} from "../../redux/profileReducer";
import {getStatus} from "../../redux/profile-selectors";

type StatusFormType = {
    status: string
}
type StatusFormOwnType = {
    status: string
}
const StatusForm: React.FC<InjectedFormProps<StatusFormType, StatusFormOwnType> & StatusFormOwnType> = (props) => {
    useEffect(() => {
        props.initialize({
            status: props.status
        });
    }, [])

    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'status'} component={statusInput}
                   placeholder={'Введите статус'}
                   onBlurEvent={props.handleSubmit}
            />
        </form>
    );
}

const StatusFormWithRedux = reduxForm<StatusFormType, StatusFormOwnType>({
    form: 'status'
})(StatusForm);
type StatusPropsType = {}
const Status:React.FC<StatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    const status = useSelector(getStatus)
    const dispatch = useDispatch()

    const setStatus = (data: StatusFormOwnType) => {
        setEditMode(false)
        dispatch(updateStatusThunkCreator(data.status))
    }

    return (
        <>
            {editMode ?
                <div>
                    <StatusFormWithRedux onSubmit={setStatus}
                        status={status}
                    />
                </div> :
                <div onClick={() => setEditMode(true)}>
                    {status ? status : 'Статус'}
                </div>
            }
        </>
    )
}

export default Status;