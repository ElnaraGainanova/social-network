import React from 'react';
import {menu} from './../../common/vars.js';
import {NavLink} from 'react-router-dom';
import {Menu} from 'antd'
import {LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';

const { SubMenu } = Menu;

let MenuApp = () => {
    let menuItems = menu.map(i => <Menu.Item key={i.id}><NavLink to={i.href}>{i.title}</NavLink></Menu.Item>);

    return (
        <Menu mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}>

            {menuItems}
        </Menu>
    );
}

export default MenuApp;