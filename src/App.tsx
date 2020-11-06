import React, {useEffect, useState} from 'react';
import './App.css';
import s from './App.module.css';
import MenuApp from "./components/Menu/Menu";
import Main from "./components/Main/Main";
import Dialogs from "./components/Dialogs/Dialogs";
import {Route} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import UsersPage from "./components/Users/UsersPage";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {authMeThunkCreator} from "./redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./components/Loader/Loader";
import {getInitialized} from './redux/app-selectors';
import { Layout, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

type Props = {
    authMeThunkCreator: () => void
    initialized: boolean
}
const App:React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const initialized = useSelector(getInitialized)
    useEffect(() => {
        dispatch(authMeThunkCreator())
    }, [])

    const [collapsed, onCollapse] = useState(false)

    if(!initialized) {
        return <Loader />
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                login
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                        <MenuApp />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Route exact={true} path="/" component={Main}/>
                        <Route path="/profile/:userId?" component={ProfileContainer}/>
                        <Route path="/dialogs" component={Dialogs}/>
                        <Route path="/users" component={UsersPage}/>
                        <Route path="/news" component={News}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/login" component={LoginContainer}/>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        /*<div className={s.appWrapper}>
            <HeaderContainer />
            <Menu />
            <div className={s.content}>
                <Route exact={true} path="/" component={Main}/>
                <Route path="/profile/:userId?" component={ProfileContainer}/>
                <Route path="/dialogs" component={Dialogs}/>
                <Route path="/users" component={UsersPage}/>
                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/settings" component={Settings}/>
                <Route path="/login" component={LoginContainer}/>
            </div>
        </div>*/
    )
}

export default App