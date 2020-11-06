import React from "react";
import {Redirect} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../redux/reduxStore";
import { ComponentType } from "react";

const withAuthorize = <WCP extends {}>(WrappedComponent:ComponentType<WCP>) => {
    class CheckAuth extends React.Component<Props & WCP> {
        render() {
            let { isAuth, ...restProps } = this.props
            return (
                isAuth ?
                    <WrappedComponent {...restProps as unknown as WCP} /> :
                    <Redirect to='/login' />
            )
        }
    }

    let mapStateToProps = (state:AppState) => {
        return {
            isAuth: state.auth.isAuth
        }
    }

    const connector = connect(mapStateToProps)
    type Props = ConnectedProps<typeof connector>
    return connector(CheckAuth as typeof React.Component);
}

export default withAuthorize
